<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { syncTodoist } from "@/shared/todoist";
  import { padding } from "@/utils";
  import { defaultTaskPrio } from "@/shared/defaults";
  const dispatch = createEventDispatcher();
  export let routerData;
  console.log("routerData", routerData);

  function goBack() {
    dispatch("back");
  }
  var lastSynced;
  var todoistActive = null;
  var todoistDeleteOnComplete = null;
  chrome.storage.local.get(
    [
      "todos-todoist-lastSynced",
      "todoist-project-id",
      "todo-close-on-complete",
    ],
    (vals: extension.storage.local) => {
      lastSynced = vals["todos-todoist-lastSynced"];
      todoistActive = vals["todoist-project-id"] != null;
      todoistDeleteOnComplete = vals["todo-close-on-complete"];
    },
  );
  var todoPrio: taskPriorities = null;
  chrome.storage.sync.get(["todo-prio"], (values: extension.storage.sync) => {
    todoPrio = values["todo-prio"];
  });
  $: console.log("lastSynced", lastSynced);
  var syncing = false;
  function syncClick() {
    syncing = true;
    function error() {
      syncing = false;
      alert("Es gab einen Fehler...");
    }
    syncTodoist()
      .then((newLastSynced) => {
        syncing = false;
        lastSynced = newLastSynced;
      }, error)
      .catch(error);
  }
  function activateTodoist() {
    location.href =
      "https://todoist.com/oauth/authorize?client_id=dffd8cf0da854df890922f69d6ff43a1&scope=data:read_write,data:delete&state=" +
      chrome.runtime.id;
  }
  function changeTDOC(e) {
    chrome.storage.local.set({
      "todo-close-on-complete": e.target.checked,
    });
  }

  var savingPrio = false;
  function savePrio(reset?: true) {
    savingPrio = true;
    var doIt = true;
    if (
      reset &&
      confirm("Wirklich alle Einstellungen der Todo-Prioritäten zurücksetzen?")
    ) {
      todoPrio = defaultTaskPrio;
    }
    if (doIt) {
      chrome.storage.sync.set({ "todo-prio": todoPrio }, () => {
        savingPrio = false;
      });
    } else {
      savingPrio = false;
    }
  }
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
<h5>Todoist</h5>
{#if todoistActive === null}
  Bitte warten (Lädt Todoist)...
{:else if todoistActive}
  <button
    style="width: 100%"
    class="btn btn-primary"
    disabled={syncing}
    on:click={syncClick}
    >{syncing ? "Bitte warten..." : "synchronisieren"}</button
  >
  <br />
  <span>
    Zuletzt synchronisiert:<br />
    {lastSynced == null
      ? "Noch nie"
      : `${new Date(lastSynced).getDate()}.${
          new Date(lastSynced).getMonth() + 1
        }.${new Date(lastSynced).getFullYear()} ${padding(
          String(new Date(lastSynced).getHours()),
          2,
          "0",
        )}:${padding(
          String(new Date(lastSynced).getMinutes()),
          2,
          "0",
        )}:${padding(String(new Date(lastSynced).getSeconds()), 2, "0")}`}
  </span>
  <hr noshade />
  <label>
    <input
      disabled={todoistDeleteOnComplete === null}
      checked={todoistDeleteOnComplete}
      on:change={changeTDOC}
      type="checkbox"
    />
    Aufgaben beim Abhaken komplett schließen (a.k.a. verschwinden lassen)
  </label>
{:else}
  <button on:click={activateTodoist} style="width: 100%" class="btn btn-primary"
    >Todoist aktivieren</button
  >
{/if}
<hr noshade />
{#if todoPrio !== null}
  <h5>Todo-Prioritäten</h5>
  <em>(Je höher, desto wichtiger)</em>
  <p>
    Mögliche Icons findest du <a
      href="https://fontawesome.com/v4.7.0/icons/"
      target="_blank">[HIER]</a
    >.
  </p>
  {#each Object.keys(todoPrio) as prioNr}
    <b>{prioNr}. Priorität</b><br />
    <div
      style="display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto; gap:5px; align-items: center"
    >
      <span>Icon:</span>
      <div style="display: flex; gap: 7.5px; align-items: center">
        <input
          type="text"
          style="width: 100%"
          bind:value={todoPrio[prioNr].icon}
        />
        <i
          class="fa fa-{todoPrio[prioNr].icon}"
          style="color: {todoPrio[prioNr].color}"
        />
      </div>
      <span>Farbe:</span>
      <input
        type="color"
        style="width: 100%"
        bind:value={todoPrio[prioNr].color}
      />
    </div>
    <br />
  {/each}
  <button
    on:click={() => {
      savePrio();
    }}
    style="width: 100%; margin-bottom: 10px"
    class="btn btn-primary"
    disabled={savingPrio}
    >{savingPrio ? "Bitte warten..." : "Prioritäten speichern"}</button
  >
  <button
    on:click={() => {
      savePrio(true);
    }}
    style="width: 100%"
    class="btn btn-secondary"
    disabled={savingPrio}
    >{savingPrio ? "Bitte warten..." : "Prioritäten zurücksetzen"}</button
  >
{:else}
  Bitte warten (Lädt Todo-Prioritäten)...
{/if}
