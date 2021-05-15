import axios from "axios";
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
        const pushTasks: Promise<any>[] = [];
        Object.keys(values["todos"]).forEach(async (todoKey) => {
          const currentTodo = values["todos"][todoKey];
          const data: {
            content: string;
            /**
             * format: UTC
             */
            due_datetime?: string;
          } = {
            content: currentTodo.title,
            due_datetime: currentTodo.time
              ? new Date(currentTodo.time).toISOString()
              : null,
          };
          if (currentTodo.sync.todoist !== true) {
            pushTasks.push(
              axios
                .post(
                  "https://api.todoist.com/rest/v1/tasks",
                  {
                    project_id: parseInt(values["todoist-project-id"]),
                    ...data,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${values["todoist-oauth-token"]}`,
                    },
                  },
                )
                .then(console.log, console.log),
            );
          }
        });
        try {
          console.log(pushTasks);
          await Promise.all(pushTasks);
        } catch (err) {
          console.log(err);
          alert(err);
        }

        axios
          .get("https://api.todoist.com/rest/v1/tasks", {
            headers: {
              Authorization: `Bearer ${values["todoist-oauth-token"]}`,
            },
            params: {
              project_id: values["todoist-project-id"],
            },
          })
          .then((response) => {
            console.log(response);
            const output: { [key: string]: todoItem } = {};
            (response.data as Array<todoist.task>).forEach((todoistItem) => {
              output["todoist" + todoistItem.id] = {
                title: todoistItem.content,
                done: false,
                sync: {
                  todoist: true,
                },
                isMoodle: false,
                time: todoistItem.due?.datetime
                  ? new Date(todoistItem.due.datetime).toISOString()
                  : todoistItem.due?.date
                  ? new Date(todoistItem.due?.date).toISOString()
                  : false,
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
export { syncTodoist };
