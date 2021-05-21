<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { syncTodoist } from "@/shared/todoist";
  import { padding } from "@/utils";
  import { defaultTaskPrio } from "@/shared/defaults";
  import TodoListItem from "./todoListItem.svelte";
  const dispatch = createEventDispatcher();
  export let routerData;
  console.log("routerData", routerData);

  function goBack() {
    dispatch("back");
  }
  var lastSynced;
  var todoistActive = null;
  var todoistRegistered = null;
  var todoistDeleteOnComplete = null;
  chrome.storage.local.get(
    [
      "todos-todoist-lastSynced",
      "todoist-project-id",
      "todo-close-on-complete",
      "todoist-active",
      "todoist-oauth-token",
    ],
    (vals: extension.storage.local) => {
      lastSynced = vals["todos-todoist-lastSynced"];
      todoistRegistered = vals["todoist-oauth-token"] != null;
      todoistDeleteOnComplete = vals["todo-close-on-complete"];
      todoistActive = vals["todoist-active"];
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

  function toggleTodoist() {
    syncing = true;
    chrome.storage.local.get(
      ["todoist-active"],
      (vals: extension.storage.local) => {
        const newValue = !vals["todoist-active"] ?? false;
        chrome.storage.local.set({ "todoist-active": newValue }, () => {
          todoistActive = newValue;
          syncing = false;
        });
      },
    );
  }
  import Swal from "sweetalert2";
  function removeTodoist() {
    Swal.fire({
      title: "Wirklich entfernen?",
      text: "Wenn du die Todoist Integration wirklich entfernen möchtest, werden wir nun deinen Login-Token löschen und dich zu Todoist weiterleiten, wo du Schul**dleJena-Tools entfernen kannst.",
      icon: "warning",
      confirmButtonText: "Entfernen",
      confirmButtonColor: "#FF4136",
      showCancelButton: true,
      cancelButtonText: "Abbrechen",
      reverseButtons: true,
      preConfirm: () => {
        try {
          chrome.storage.local.set(
            {
              "todoist-oauth-token": null,
              "todoist-active": false,
              "todoist-project-id": null,
            },
            () => {
              location.href = "//todoist.com/prefs/integrations";
            },
          );
        } catch (err) {
          Swal.showValidationMessage(`Es gab einen Fehler: ${err}`);
        }
      },
    });
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
{#if todoistRegistered === null}
  Bitte warten (Lädt Todoist)...
{:else if todoistRegistered}
  {#if todoistActive}
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
    <br />
    <br />
  {/if}
  <button
    style="width: 100%; border: 2px solid {!todoistActive
      ? '#2ECC40'
      : '#FF4136'}; margin-bottom: 7.5px;"
    class="btn btn-secondary"
    disabled={syncing}
    on:click={toggleTodoist}
    >{syncing
      ? "Bitte warten..."
      : `Todoist ${todoistActive ? "deaktivieren" : "aktivieren"}`}</button
  ><br />
  <button
    style="width: 100%; background-color: #FF4136; border-color: #FF4136"
    class="btn btn-primary"
    disabled={syncing}
    on:click={removeTodoist}
    >{syncing ? "Bitte warten..." : "Todoist entfernen"}</button
  >
  <hr noshade />
  <label>
    <input
      disabled={todoistDeleteOnComplete === null}
      checked={todoistDeleteOnComplete}
      on:change={changeTDOC}
      type="checkbox"
    />
    Aufgaben beim Abhaken komplett schließen (a.k.a. verschwinden lassen)<br
    />[AUS: Aufgaben bei Todoist werden nicht abgehakt, da diese sonst
    verschwinden würden.]
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
      <span style="text-align: right">Icon:</span>
      <div style="display: flex; gap: 7.5px; align-items: center">
        <input
          type="text"
          style="width: 100%;"
          bind:value={todoPrio[prioNr].icon}
        />
        <i
          class="fa fa-{todoPrio[prioNr].icon}"
          style="color: {todoPrio[prioNr].color}"
        />
      </div>

      <label
        style="display: flex; justify-content: space-between; align-items: center"
        ><input
          style="margin-right: 5px;"
          type="checkbox"
          checked={todoPrio[prioNr].color.length < 9}
          on:change={(e) => {
            e.target.checked
              ? (todoPrio[prioNr].color = todoPrio[prioNr].color.slice(0, 7))
              : (todoPrio[prioNr].color = todoPrio[prioNr].color + "00");
          }}
        />
        <span>Farbe:</span></label
      >

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
