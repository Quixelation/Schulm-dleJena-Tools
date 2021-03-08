<script lang="ts">
  import { connect } from "./../ts/communication";
  import FunctionToggle from "../functionToggleCheckbox.svelte";
  import Button from "./../Button.svelte";
  let resetted = false;
</script>

<h1 class="pageHeader">Downloader</h1>
<p>
  Mit dem Downloader können PDF Dateien automatisch heruntergeladen werden. Dazu
  muss "Download erzwingen" eingeschaltet sein.
</p>
<hr />
<br />
<div style="width: 100%; display: flex; flex-direction: column">
  <FunctionToggle
    title="Download erzwingen"
    desc="Dateien werden automatisch heruntergeladen"
    optionCode="forcedownload"
    on:changed={connect}
  />
  <hr />
  <FunctionToggle
    title="Doppelte Downloads erlauben"
    desc="Gleiche Dateien werden mehr als 1x automatisch heruntergeladen."
    optionCode="allowMultipleDownloads"
    on:changed={connect}
  />
</div>
<br />
<hr />
<h2>Reset</h2>
<p>Einträge, welche Dateien bereits heruntergeladen wurden, löschen.</p>
<Button
  title="RESET"
  on:click={() => {
    chrome.storage.sync.set({ downloaded: [] }, () => {
      resetted = true;
    });
  }}
/>
{#if resetted}
  <p style="color: #3D9970; font-weight: bold;font-size: 0.9rem">
    Reset erfolgreich!
  </p>
{/if}

<style>
  .pageHeader {
    margin-top: 0px;
  }
</style>
