//@ts-nocheck RollUp erkennt Typescript nicht... <(＿　＿)>
import App from "./App.svelte";

const newSection = document.createElement("section");
newSection.id = "changesManager";
document
  .querySelector("section.block_myoverview")
  .insertAdjacentElement("beforebegin", newSection);
var app = new App({
  target: document.querySelector("#changesManager"),
  props: {},
});

export default app;
