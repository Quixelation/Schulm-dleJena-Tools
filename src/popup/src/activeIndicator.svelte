<script>
  let isActive = false;
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      console.log(tab[0]);
      isActive = tab[0].url.includes("moodle.jsp.jena.de");
    });
  } catch (e) {
    isActive = "moodle";
  }
</script>

<div>
  {#if isActive !== "moodle"}
    Tool ist für diese Webseite
    {#if isActive}
      <span style="color: #2ECC40">aktiv</span>
    {:else}
      <span style="color: #FF4136">inaktiv</span>
    {/if}!
  {/if}
</div>

<style>
  div {
    font-size: 13px;
    text-align: center;
    padding: 8px;
  }
  span {
    font-weight: 700;
  }
</style>
