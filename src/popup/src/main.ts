import App from "./App.svelte";
// const sectionElem = document.createElement("section");
// sectionElem.id = "moodleToolsSettings";
// sectionElem.classList.add("card");
// document.querySelector("#block-region-side-pre").prepend(sectionElem);
const app = new App({
  target: document.body,
  // props: {
  // 	name: 'world'
  // }
});

export default app;
