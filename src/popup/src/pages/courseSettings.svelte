<script lang="ts">
  import { connect } from "./../ts/communication";
  import FunctionToggle from "../functionToggleCheckbox.svelte";
</script>

<h1 class="pageHeader">Kurs-Einstellungen</h1>
<div style="width: 100%; display: flex; flex-direction: column">
  <FunctionToggle
    title="Nicht verfügbare Themen verstecken"
    desc="Entfernt alle Kurse welche von Moodle als `hidden` gekennzeichnet wurden."
    optionCode="no-hidden-topics"
    on:changed={connect}
  />
  <hr />
  <FunctionToggle
    title="Videos größer darstellen"
    desc="BETA: Vergrößert die eingebetteten Videos."
    optionCode="biggerVideo"
    on:changed={connect}
  />
  <hr />
  <FunctionToggle
    title="'Fließen-Design' in 'Listen-Design' umwandeln"
    desc="Wandelt das 'Fließen-Design' (das mit den Rechtecken/Boxen), in ein 'Listen-Design' um. [Netzaufwend!]"
    optionCode="tilesToList"
    on:changed={connect}
  />
</div>

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
