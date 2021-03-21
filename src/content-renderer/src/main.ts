//@ts-nocheck RollUp erkennt Typescript nicht... <(＿　＿)>
import App from "./App.svelte";

const sectionElem = document.createElement("section");
sectionElem.id = "AsideSectionElem_TodosManager";
sectionElem.classList.add("block_navigation", "block", "card", "mb-3");
document.querySelector("#block-region-side-pre").prepend(sectionElem);

var app = new App({
  target: document.querySelector("section#AsideSectionElem_TodosManager"),
  props: {},
});

export default app;
