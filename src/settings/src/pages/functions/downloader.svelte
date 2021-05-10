<script>
  import Button from "../../components/button.svelte";

  import FunctionCard from "../../components/functionCard.svelte";

  import Header from "../../components/header.svelte";

  function reset() {
    chrome.storage.local.set({ downloaded: [] }, () => {
      alert("Reset Fertig :)");
    });
  }
</script>

<div class="page">
  <Header subtitle="Funktionen">Downloader</Header>
  <p class="pMargin">
    Mit dem Downloader können PDF Dateien automatisch heruntergeladen werden.
    Dazu muss "Download erzwingen" eingeschaltet sein.
  </p>
  <FunctionCard
    title="Download erzwingen"
    description="Dateien werden automatisch heruntergeladen"
    optionCode="forcedownload"
  >
    <div slot="bottomSlot">Erfahre mehr über <a>Dashboard Knopf →</a></div>
  </FunctionCard>
  <FunctionCard
    title="Doppelte Downloads erlauben"
    description="Gleiche Dateien werden mehr als 1x automatisch heruntergeladen."
    optionCode="allowMultipleDownloads"
  />
  <div style="display: flex; align-items: center" class="pMargin">
    <p style="margin-right: 10px;">
      Einträge, welche Dateien bereits heruntergeladen wurden, löschen:
    </p>
    <Button on:click={reset}>Reset</Button>
  </div>
</div>

<style type="scss">
  .pMargin {
    margin: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
