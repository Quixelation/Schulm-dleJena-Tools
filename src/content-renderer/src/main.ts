//@ts-nocheck RollUp erkennt Typescript nicht... <(＿　＿)>
import App from "./App.svelte";

const sectionElem = document.createElement("section");
sectionElem.id = "AsideSectionElem_TodosManager";
sectionElem.classList.add("block_navigation", "block", "card", "mb-3");
document.querySelector("#block-region-side-pre").prepend(sectionElem);
var app;
if (!location.pathname.includes("/mod/quiz/")) {
  app = new App({
    target: document.querySelector("section#AsideSectionElem_TodosManager"),
    props: {},
  });
}
export default app;

function deleteTodoItem(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["todos"], (val) => {
      var { todos } = val;
      delete todos[key];
      chrome.storage.sync.set({ todos }, () => {
        resolve();
      });
    });
  });
}

function changeDoneState(key, state) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["todos"], (val) => {
      var { todos } = val;
      todos[key].done = state;
      chrome.storage.sync.set({ todos }, () => {
        resolve();
      });
    });
  });
}

export { deleteTodoItem, changeDoneState };
