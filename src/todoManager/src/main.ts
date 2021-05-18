import { createCommand, syncTodoist } from "@/shared/todoist";

import App from "./App.svelte";

const sectionElem = document.createElement("section");
sectionElem.id = "AsideSectionElem_TodosManager";
sectionElem.classList.add("block_navigation", "block", "card", "mb-3");
document.querySelector("#block-region-side-pre").prepend(sectionElem);
let app;
if (!location.pathname.includes("/mod/quiz/")) {
  app = new App({
    target: document.querySelector("section#AsideSectionElem_TodosManager"),
    props: {},
  });
}
export default app;

function deleteTodoItem(key): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["todos"], (val: extension.storage.local) => {
      const { todos } = val;
      console.log("Deleting", key, todos);
      todos[key].deleted = true;
      todos[key].sync.todoist.push(createCommand("item_delete", todos[key]));
      chrome.storage.local.set({ todos }, () => {
        resolve();
      });
    });
  });
}

function getDateAt0(date: string | number | Date) {
  const newDate = new Date(date);

  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate.valueOf();
}

/**
 * ***Nur für sync-Anwendungen!***
 * @param force
 * @returns wurde es geschlossen
 */
function closeTodoItem(key: string, force?: boolean): Promise<boolean> {
  console.log("CloseTodoItem called");
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(
      ["todo-close-on-complete", "todos"],
      (val: extension.storage.local) => {
        /**
         * @readonly
         */
        const item: todoItem = val["todos"][key];
        console.log({
          done: item.done,
          timeAbgelaufen:
            item.time &&
            getDateAt0(new Date(item.time).valueOf()) < getDateAt0(Date.now()),
          force,
          cmd: createCommand("item_close", item),
        });
        if (
          (item.done &&
            (val["todo-close-on-complete"] ||
              (item.time &&
                getDateAt0(new Date(item.time).valueOf()) <
                  getDateAt0(Date.now())))) ||
          force
        ) {
          console.log("Check :D");
          val["todos"][key].sync.todoist.push(
            createCommand("item_close", item),
          );
          chrome.storage.local.set({ todos: val["todos"] }, () => {
            resolve(true);
          });
        } else {
          resolve(false);
        }
      },
    );
  });
}

function changeDoneState(key: string, state: boolean): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["todos"], (val: extension.storage.local) => {
      const { todos } = val;
      todos[key].done = state;

      chrome.storage.local.set({ todos }, () => {
        closeTodoItem(key).then((changed) => {
          changed && syncTodoist();
        });
        resolve(null);
      });
    });
  });
}

export { deleteTodoItem, changeDoneState, closeTodoItem };
