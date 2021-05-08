<script lang="ts">
  import { connect } from "./../ts/communication";
  import FunctionToggle from "../functionToggleCheckbox.svelte";
  import FunctionInput from "../functionInput.svelte";
</script>

<h1 class="pageHeader">Dashboard</h1>
<div style="width: 100%; display: flex; flex-direction: column" />

<FunctionToggle
  title="Farbiger Fortschritt"
  desc="Kursname wird je nach Fortschritt gefärbt. (von rot zu grün)"
  optionCode="usecoloredprogress"
  on:changed={connect}
/>
<hr />
<FunctionInput
  title="Emoji-Größe"
  desc="Steuert die Größe des Emojis auf der Dashboard-Kurs-Link. (Angabe in %; Werte über 100 erlaubt)"
  optionCode="dashboardEmojiFontSize"
  type="number"
  on:changed={connect}
/><br />

<style>
  .pageHeader {
    margin-top: 0px;
  }
  hr {
    width: 100%;
    margin-top: 12.5px;
    margin-bottom: 12.5px;
  }
</style>
