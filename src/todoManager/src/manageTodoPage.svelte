<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let action;
  const dispatch = createEventDispatcher();
  export let routerData;
  console.log("routerData", routerData);
  import { padding } from "@/utils";
  import { deleteTodoItem } from "./main";
  import { syncTodoist } from "@/shared/todoist";
  let title = routerData?.title ?? "";
  let datetime = routerData?.time ?? "";
  let type = routerData?.type ?? "ha";
  let errorMsg = "";
  let saveHandler = () => {
    console.log({ title, datetime });
    if (title.trim() === "" || datetime === "") {
      errorMsg = `${title.trim() === "" ? "Titel" : ""}${
        title.trim() === "" && datetime === "" ? " und " : " "
      }${datetime === "" ? "Datum" : ""} fehlt!`;
    } else {
      chrome.storage.local.get(["todos"], (val) => {
        var { todos } = val;
        if (action === "create") {
          todos[
            Math.random().toString(36).replace("0.", Date.now().toString())
          ] = {
            time: datetime,
            sync: {
              //TODO
              todoist: false,
            },

            title: title,
            done: false,
          } as todoItem;
        } else {
          todos[routerData.key] = {
            time: datetime,
            title: title,
            sync: {
              //TODO
              todoist: false,
            },
            done: routerData.done,
          };
        }
        console.log("todos", todos);
        chrome.storage.local.set({ todos }, () => {
          console.log("set that shit");
          syncTodoist();
          dispatch("saved");
        });
      });
    }
  };

  function goBack() {
    (
      document.getElementById(
        "moodleHelper__TitleSaveNewTodo",
      ) as HTMLInputElement
    ).value = "";
    (
      document.getElementById(
        "moodleHelper__dateTimeSaveNewTodo",
      ) as HTMLInputElement
    ).value = "";
    (
      document.getElementById(
        "moodleHelper__selectSaveNewTodo",
      ) as HTMLSelectElement
    ).value = "ha";
    dispatch("back");
  }

  function deleteHandler() {
    if (confirm("Wirklich löschen?")) {
      deleteTodoItem(routerData.key).then(() => {
        dispatch("saved");
      });
    }
  }
  // Check if datetime-local ist supported or if I should use date (Firefox)
  let isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
</script>

<div
  style="display: flex; align-items: center; margin-bottom: 10px; color: #0f6fc5; cursor: pointer;"
  on:click={goBack}
>
  <i class="fa fa-chevron-left" style="font-size: 12px;" />
  <span
    style="
    margin-left:  5px;
    text-decoration: underline;
    font-size: 14px;
    margin-bottom: 1px;
"
  >
    Zurück
  </span>
</div>
<h5>
  Todo {action === "create"
    ? "erstellen"
    : action === "edit"
    ? "bearbeiten"
    : "[error]"}
</h5>
<div style="display: flex; flex-direction: column">
  <!-- <div>{routerData?.course}</div>
  <br /> -->
  <div>Titel:</div>
  <input id="moodleHelper__TitleSaveNewTodo" type="text" bind:value={title} />
  <br style="margin: 10px 0 10px 0;" />
  <div>Datum/Uhrzeit:</div>
  {#if isFirefox}
    <input
      bind:value={datetime}
      id="moodleHelper__dateTimeSaveNewTodo"
      type="date"
    />
  {:else}
    <input
      bind:value={datetime}
      id="moodleHelper__dateTimeSaveNewTodo"
      type="datetime-local"
    />
  {/if}
  <br style="margin: 10px 0 10px 0;" />

  {#if errorMsg !== ""}
    <span style="color: #FF851B">{errorMsg}</span>
    <br style="margin: 10px 0 10px 0;" />
  {/if}
  <button class="btn btn-primary" on:click={saveHandler}> Speichern </button>
  {#if action === "edit"}
    <br style="margin: 10px 0 10px 0;" />
    <button class="btn btn-secondary" on:click={deleteHandler}>
      Löschen
    </button>
  {/if}
</div>
