import axios, { AxiosPromise } from "axios";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
/**
 *
 * @returns lastSynced
 */
function syncTodoist(): Promise<number> {
  return new Promise((resolve, reject) => {
    console.log("Syncing Todoist...");
    chrome.storage.local.get(
      ["todoist-project-id", "todoist-oauth-token", "todos"],

      async (values: extension.storage.local) => {
        const commands: AxiosPromise[] = [];
        Object.keys(values["todos"]).forEach(async (todoKey) => {
          const currentTodo = values["todos"][todoKey];
          if (currentTodo.sync.todoist == null) {
            currentTodo.sync.todoist = [createCommand("item_add", currentTodo)];
          }

          if (
            Array.isArray(currentTodo.sync.todoist) &&
            currentTodo.sync.todoist
          ) {
            currentTodo.sync.todoist.forEach((command) => {
              switch (command.type) {
                case "item_add":
                  commands.push(
                    axios.post(
                      "https://api.todoist.com/rest/v1/tasks",
                      injectProjectId(
                        parseInt(values["todoist-project-id"]),
                        command,
                      ).args,
                      {
                        headers: {
                          Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                          "X-Request-Id": command.uuid,
                        },
                      },
                    ),
                  );
                  break;
                case "item_update":
                  commands.push(
                    axios.post(
                      "https://api.todoist.com/rest/v1/tasks/" +
                        todoKey.replace("smjt-todoist-", ""),
                      command.args,
                      {
                        headers: {
                          Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                          "X-Request-Id": command.uuid,
                        },
                      },
                    ),
                  );
                  break;
                case "item_delete":
                  commands.push(
                    axios.delete(
                      "https://api.todoist.com/rest/v1/tasks/" +
                        todoKey.replace("smjt-todoist-", ""),

                      {
                        headers: {
                          Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                          "X-Request-Id": command.uuid,
                        },
                      },
                    ),
                  );
                  break;
                //TODO: Falls hier ein Close/Delete kommt und todoist aus ist, soll hier sofort gelöscht werden
                case "item_close":
                  commands.push(
                    axios.post(
                      "https://api.todoist.com/rest/v1/tasks/" +
                        todoKey.replace("smjt-todoist-", "") +
                        "/close",
                      null,
                      {
                        headers: {
                          Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                          "X-Request-Id": command.uuid,
                        },
                      },
                    ),
                  );
                  break;
              }
            });
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
              output[todoistItem.id] = {
                title: todoistItem.content,
                done: false,
                sync: {
                  todoist: [],
                },
                isMoodle: false,
                time: todoistItem.due?.datetime
                  ? new Date(todoistItem.due.datetime).toISOString()
                  : todoistItem.due?.date
                  ? new Date(todoistItem.due?.date).toISOString()
                  : false,
                priority: todoistItem.priority,
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
          });
      },
    );
  });
}

function injectProjectId(
  id: number,
  command: todoist.command<todoist.commandArgs.item>,
): todoist.command<todoist.commandArgs.item_project_id> {
  return { ...command, args: { ...command.args, project_id: id } };
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

export { syncTodoist, createCommand };
