<script lang="ts">
  import { push, pop, replace } from "svelte-spa-router";
</script>

<div class="backLink" on:click={pop}>
  <span class="material-icons"> navigate_before </span><span>Zurück</span>
</div>
<br />

<style lang="scss">
  .backLink {
    display: flex;
    align-items: center;
    margin-left: -10px;
    color: #ff3e00;
    cursor: pointer;
    width: fit-content;
    font-weight: bold;
  }
</style>
