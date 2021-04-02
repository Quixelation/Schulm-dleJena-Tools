<script>
  import Header from "./../../components/header.svelte";
  let versionName =
    chrome?.runtime?.getManifest?.()?.version_name ?? "{{VersionName}}";
  let version = chrome?.runtime?.getManifest?.()?.version ?? "{{Version}}";
</script>

<div class="page">
  <Header subtitle="Info">Lizensen</Header>
  <div class="page_content">
    Dieses Projekt wurde durch <a
      style="text-decoration: underline"
      href="https://smjt.vercel.app/licenses.html"
      target="_blank">coole Open-Source-Software</a
    >
    ermöglicht.<br /><br />
    <span
      >Falls die obige Liste ein bisschen zu lang war, ist hier <a
        style="text-decoration: underline"
        href="https://github.com/Quixelation/Schulm-dleJena-Tools/blob/master/package.json"
        target="_blank">ein Link zu unseren Dependencies</a
      >.</span
    >
  </div>
</div>

<style>
</style>
