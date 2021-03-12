<script lang="ts">
  import { changesNr, checkAll } from "./manager";
  let show: boolean = false;
  let data: changesNr;
  let activated: boolean | "loading" = false;
  function activate() {
    activated = "loading";
    checkAll().then((e) => {
      data = e;
      activated = true;
    });
  }

  const checkInterval = setInterval(() => {
    if (
      document.querySelectorAll(
        "div[data-region='paged-content-page'] > .card-deck .card[data-region='course-content']"
      ).length > 0
    ) {
      show = true;
      clearInterval(checkInterval);
    }
  }, 500);
</script>

{#if show}
  {#if activated === "loading"}
    <div
      class="card block mb-3 p-3"
      style="width: 100%; display: block;  text-align: left"
    >
      <h3>Alle Kurse überprüfen...</h3>
    </div>
  {:else if activated === false}
    <a
      href="#"
      style="width: 100%; display: block; color: #0f6fc5; text-align: left"
      class="card block btn btn-secondary mb-3 p-3"
      on:click={activate}
      ><i class="icon fa fa-rocket fw" /><b>Änderungen ansehen</b></a
    >
  {:else}
    <div
      class="card block mb-3 p-3"
      style="width: 100%; display: block;  text-align: left"
    >
      <h3>
        Es wurden <b style="color: #0074D9">{data.changes}</b> Änderungen gefunden.
      </h3>
      <h5>
        <b style="color: #2ECC40; font-weight: bold;">{data.added}</b> neue Inhalte
      </h5>
      <h5>
        <b style="color: #FF4136; font-weight: bold;">{data.removed}</b> Inhalte
        entfernt
      </h5>
    </div>
  {/if}
{/if}

<style lang="scss">
</style>
