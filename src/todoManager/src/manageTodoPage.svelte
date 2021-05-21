<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let action;
  const dispatch = createEventDispatcher();
  interface routerData extends todoItem {
    key: string;
  }
  export let routerData: routerData;
  console.log("routerData", routerData);
  import { padding } from "@/utils";
  import { deleteTodoItem } from "./main";
  import { syncTodoist, createCommand } from "@/shared/todoist";
  import { defaultTaskPrio } from "@/shared/defaults";
  import { each } from "svelte/internal";
  import { convertDateToHtmlInputFormat } from "@/utils";
  let title = routerData?.title ?? "";
  let datetime = routerData?.time
    ? convertDateToHtmlInputFormat(routerData?.time)
    : "";

  let taskPriority = routerData?.priority ?? 1;
  let errorMsg = "";
  let saveHandler = () => {
    console.log({ title, datetime });
    if (title.trim() === "" || datetime === "") {
      errorMsg = `${title.trim() === "" ? "Titel" : ""}${
        title.trim() === "" && datetime === "" ? " und " : " "
      }${datetime === "" ? "Datum" : ""} fehlt!`;
    } else {
      chrome.storage.local.get(
        ["todos", "todoist-active"],
        (val: extension.storage.local) => {
          var { todos } = val;
          if (action === "create") {
            const id = Math.random()
              .toString(36)
              .replace("0.", Date.now().toString());
            todos[id] = {
              time: new Date(datetime).toISOString(),
              sync: {
                todoist: null,
              },
              priority: taskPriority,
              title: title,
              done: false,
              deleted: false,
            } as todoItem;
          } else {
            todos[routerData.key] = {
              time: new Date(datetime).toISOString(),
              title: title,
              sync: {
                todoist: routerData.sync.todoist === null ? null : false,
              },
              done: routerData.done,
              priority: taskPriority,
            } as todoItem;
          }
          console.log("todos", todos);
          chrome.storage.local.set({ todos }, () => {
            console.log("set that shit");
            syncTodoist();
            dispatch("saved");
          });
        },
      );
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

    dispatch("back");
  }

  function deleteHandler() {
    if (confirm("Wirklich löschen?")) {
      deleteTodoItem(routerData.key).then(() => {
        syncTodoist();
        dispatch("saved");
      });
    }
  }
  // Check if datetime-local ist supported or if I should use date (Firefox)
  let isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

  let prioData: taskPriorities = defaultTaskPrio;
  chrome.storage.sync.get("todo-prio", (values: extension.storage.sync) => {
    //Should not fail... But if it does, there is a check
    values["todo-prio"] && (prioData = values["todo-prio"]);
  });
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
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px;">
    {#each [1, 2, 3, 4] as prioBtnData}
      <button
        class="btn {taskPriority === prioBtnData
          ? 'btn-primary'
          : 'btn-secondary'}"
        style={taskPriority === prioBtnData
          ? `${
              prioData[String(prioBtnData)].color.length === 9 &&
              prioData[String(prioBtnData)].color.slice(-2) === "00"
                ? "background-color: #222222;"
                : `background-color: ${prioData[String(prioBtnData)].color};`
            } border-color: ${prioData[String(prioBtnData)].color}`
          : ``}
        on:click={() => {
          //@ts-ignore: Type 'number' is not assignable to type '1 | 2 | 3 | 4'.ts(2322)
          taskPriority = prioBtnData;
        }}
      >
        <i
          class="fa fa-{prioData[String(prioBtnData)].icon}"
          aria-hidden="true"
          style={taskPriority === prioBtnData
            ? `color: white`
            : `color: ${
                prioData[String(prioBtnData)].color.length === 9 &&
                prioData[String(prioBtnData)].color.slice(-2) === "00"
                  ? "black"
                  : prioData[String(prioBtnData)].color
              }`}
        />
      </button>
    {/each}
  </div>
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
