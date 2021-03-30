import App from "./App.svelte";
try {
  document.querySelector("div.sitetopic").remove();

  //*New Section
  const newSection = document.createElement("section");
  newSection.className = "block card mb-3";
  newSection.id = "smjtSettingsSections";

  document
    .querySelector("#region-main")
    .insertAdjacentElement("beforebegin", newSection);
} catch (e) {
  console.error(e);
}
const app = new App({
  target: document.querySelector("#smjtSettingsSections"),
  props: {
    name: "world",
  },
});

export default app;
