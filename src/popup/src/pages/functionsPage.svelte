<script lang="ts">
  import FunctionToggle from "../functionToggleCheckbox.svelte";
  import BackBtn from "./../backBtn.svelte";
  import { connect } from "./../ts/communication";
</script>

<h1 class="pageHeader">Allgemein</h1>
<div style="width: 100%; display: flex; flex-direction: column">
  <FunctionToggle
    title="Dashboard Knopf"
    desc="Zeigt einen Dashboard Knopf über dem Navigationsblock (links) an."
    optionCode="removeNavigationBlock"
    on:changed={connect}
  /><br />
</div>

<style lang="scss">
  .pageHeader {
    margin-top: 0px;
  }
  hr {
    width: 100%;
  }
  br {
    margin-bottom: 5px;
  }
</style>
