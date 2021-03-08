<script lang="ts">
  import { connect } from "./../ts/communication";
  import FunctionToggle from "../functionToggleCheckbox.svelte";
</script>

<h1 class="pageHeader">Dashboard</h1>
<div style="width: 100%; display: flex; flex-direction: column" />

<FunctionToggle
  title="Farbiger Fortschritt"
  desc="Kursname wird je nach Fortschritt gefärbt. (von rot zu grün)"
  optionCode="usecoloredprogress"
  on:changed={connect}
/><br />

<style>
  .pageHeader {
    margin-top: 0px;
  }
</style>
