import axios, { AxiosPromise } from "axios";
import { v1 as uuidv1 } from "uuid";
/**
 *
 * @returns lastSynced
 */
function syncTodoist(): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log("Syncing Todoist...");

    chrome.storage.local.get(
      [
        "todoist-project-id",
        "todoist-oauth-token",
        "todos",
        "todoist-active",
        "todo-close-on-complete",
      ],

      async (values: extension.storage.local) => {
        if (!values["todoist-active"]) {
          console.log("todoist nicht aktiv");
          reject("todoist nicht aktiv");
        } else if (values["todoist-oauth-token"] == null) {
          console.log("Kein Todoist Auth Token");
          chrome.storage.local.set(
            {
              "todoist-active": false,
            },
            () => {
              reject("Kein Todoist Auth Token");
            },
          );
        } else if (values["todoist-project-id"] == null) {
          console.log("Keine Todoist Project ID");
          chrome.storage.local.set(
            {
              "todoist-active": false,
            },
            () => {
              reject("Keine Todoist Project ID");
            },
          );
        } else {
          const commands: AxiosPromise[] = [];
          Object.keys(values["todos"]).forEach(async (todoKey) => {
            const currentTodo = values["todos"][todoKey];

            if (currentTodo.sync.todoist === null && !currentTodo.isMoodle) {
              commands.push(
                axios.post(
                  "https://api.todoist.com/rest/v1/tasks",
                  {
                    content: currentTodo.title,
                    due_datetime: currentTodo.time
                      ? new Date(currentTodo.time).toISOString()
                      : undefined,
                    priority: currentTodo.priority,
                    project_id: parseInt(values["todoist-project-id"]),
                  } as todoist.commandArgs.item_project_id,
                  {
                    headers: {
                      Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                    },
                  },
                ),
              );
            } else if (currentTodo.sync.todoist === false) {
              commands.push(
                axios.post(
                  "https://api.todoist.com/rest/v1/tasks/" +
                    todoKey.replace("smjt-todoist-", ""),
                  {
                    content: currentTodo.title,
                    due_datetime: currentTodo.time
                      ? new Date(currentTodo.time).toISOString()
                      : undefined,
                    priority: currentTodo.priority,
                  } as todoist.commandArgs.item,
                  {
                    headers: {
                      Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                    },
                  },
                ),
              );
            }
            if (
              currentTodo.deleted ||
              checkTodoItemForClose(
                currentTodo,
                values["todo-close-on-complete"],
              )
            ) {
              commands.push(
                axios.delete(
                  "https://api.todoist.com/rest/v1/tasks/" +
                    todoKey.replace("smjt-todoist-", ""),

                  {
                    headers: {
                      Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                    },
                  },
                ),
              );
            } else if (currentTodo.done && values["todo-close-on-complete"]) {
              commands.push(
                axios.post(
                  "https://api.todoist.com/rest/v1/tasks/" +
                    todoKey.replace("smjt-todoist-", "") +
                    "/close",
                  null,
                  {
                    headers: {
                      Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                    },
                  },
                ),
              );
            }
          });

          try {
            console.log(commands);
            //TODO: Add more 100 (limit)
            const axiosResponse = await Promise.all(commands);
            console.log(axiosResponse);
          } catch (err) {
            console.log(err);
            alert(err);
          }

          axios
            .get(`https://api.todoist.com/rest/v1/tasks`, {
              params: {
                project_id: parseInt(values["todoist-project-id"]),
              },
              headers: {
                Authorization: `Bearer ${values["todoist-oauth-token"]}`,
              },
            })
            .then((response) => {
              console.log(response);
              const output: { [key: string]: todoItem } = {};
              (response.data as Array<todoist.task>).forEach((todoistItem) => {
                console.log(values["todos"][todoistItem.id]);
                output[todoistItem.id] = {
                  title: todoistItem.content,
                  sync: {
                    todoist: true,
                  },
                  isMoodle: false,
                  done: values["todos"][todoistItem.id]?.done ?? false,
                  time: todoistItem.due?.datetime
                    ? new Date(todoistItem.due.datetime).toISOString()
                    : todoistItem.due?.date
                    ? new Date(todoistItem.due?.date).toISOString()
                    : false,
                  priority: todoistItem.priority,
                  moodleUrl: null,
                  deleted: false,
                };
              });
              console.log(output);
              const lastSynced = Date.now();
              chrome.storage.local.set(
                {
                  todos: output,
                  "todos-todoist-lastSynced": lastSynced,
                },
                () => {
                  resolve(lastSynced);
                },
              );
            }, reject)
            .catch(reject);
        }
      },
    );
  });
}

function createCommand(
  action: "item_add" | "item_update" | "item_delete" | "item_close",
  todoItem: todoItem,
): todoist.command<todoist.commandArgs.item> {
  return {
    type: action,
    uuid: uuidv1(),
    args: {
      content: todoItem.title,
      due_datetime: todoItem.time
        ? new Date(todoItem.time).toISOString().slice(0, -5) + "Z"
        : undefined,
      priority: todoItem.priority,
    },
  };
}
function getDateAt0(date: string | number | Date) {
  const newDate = new Date(date);

  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.valueOf();
}
function checkTodoItemForClose(
  todoItem: todoItem,
  todoCloseOnComplete: boolean,
): boolean {
  return (
    todoItem.done &&
    (todoCloseOnComplete ||
      (todoItem.time &&
        getDateAt0(new Date(todoItem.time).valueOf()) < getDateAt0(Date.now())))
  );
}
export { syncTodoist, createCommand, checkTodoItemForClose };
