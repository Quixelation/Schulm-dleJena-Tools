<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { syncTodoist } from "@/shared/todoist";
  import { padding } from "@/utils";
  const dispatch = createEventDispatcher();
  export let routerData;
  console.log("routerData", routerData);

  function goBack() {
    dispatch("back");
  }
  var lastSynced;
  var todoistActive = null;
  chrome.storage.local.get(
    ["todos-todoist-lastSynced", "todoist-project-id"],
    (vals: extension.storage.local) => {
      lastSynced = vals["todos-todoist-lastSynced"];
      todoistActive = vals["todoist-project-id"] != null;
    },
  );
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
  Bitte warten...
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
{:else}
  <button on:click={activateTodoist} style="width: 100%" class="btn btn-primary"
    >Todoist aktivieren</button
  >
{/if}
