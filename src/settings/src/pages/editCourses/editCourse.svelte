<script lang="ts">
  import { pop, push } from "svelte-spa-router";

  import Header from "../../components/header.svelte";

  import Card from "./../../components/card.svelte";
  import Swal from "sweetalert2";
  export let params = {};
  console.log(params);
  var courseData: fach = null;
  var changed = false;
  var saving = false;
  chrome.storage.sync.get("fächer", (values: extension.storage.sync) => {
    courseData = values["fächer"][params["id"]];
  });

  function back() {
    if (changed) {
      Swal.fire({
        title: "Ungespeicherte Änderungen",
        icon: "warning",
        text: "Änderungen werden verloren gehen!",
        showCancelButton: true,
        cancelButtonText: "Zurück",
        confirmButtonText: "Ohne Speichern fortfahren",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          pop();
        }
      });
    } else {
      pop();
    }
  }

  function saveCourse() {
    saving = true;
    try {
      chrome.storage.sync.get("fächer", (values) => {
        values["fächer"][params["id"]] = courseData;
        chrome.storage.sync.set({ fächer: values["fächer"] }, pop);
      });
    } catch (err) {
      alert(err);
      saving = false;
    }
  }
</script>

<Header subtitle={courseData?.long ?? " "}>Kurs bearbeiten</Header>
<div class="page_content">
  {#if courseData === null}
    <p>Lädt: Bitte warten...</p>
  {:else}
    <Card>
      <label
        ><b>Kurzer Name:</b><br />
        <input
          on:input={() => {
            changed = true;
          }}
          bind:value={courseData.short}
          style="width: 100%; border-color: #ff3e00 !important"
          type="text"
        />
      </label>
      <label
        ><b>Kursbild:</b><br />
        <select
          on:input={() => {
            changed = true;
          }}
          bind:value={courseData.imageType}
          style="width: 100%; border-color: #ff3e00 !important"
        >
          <option value="original">Original</option>
          <option value="emoji">Emoji</option>
          <option value="emoji_bg">Emoji mit farbigen Hintergrund</option>
          <option value="emoji_muster">Emoji mit Muster</option>
          <option value="muster">Muster</option>
          <option value="bg">Farbe</option>
        </select>
      </label>
      <label
        ><b>Emoji:</b><br />
        <input
          on:input={() => {
            changed = true;
          }}
          bind:value={courseData.emoji}
          style="width: 100%; border-color: #ff3e00 !important"
          type="text"
        />
      </label>
      <label
        ><b>Farbe:</b><br />
        <input
          on:input={() => {
            changed = true;
          }}
          bind:value={courseData.color}
          style="width: 100%; display: block; height: 34px; border-color: #ff3e00 !important"
          type="color"
        />
      </label>
      <div style="display: grid; gap: 5px; grid-template-columns: 1fr 1fr;">
        <div
          style="width: 100%;"
          disabled={saving}
          class="btn btn-secondary"
          on:click={back}
        >
          {saving ? "Bitte warten..." : "Abbrechen"}
        </div>
        <div
          style="width: 100%;"
          disabled={saving}
          class="btn btn-primary"
          on:click={saveCourse}
        >
          {saving ? "Bitte warten..." : "Speichern"}
        </div>
      </div>
    </Card>
  {/if}
</div>
