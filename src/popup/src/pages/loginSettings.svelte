<script lang="ts">
  import { connect } from "./../ts/communication";
  import FunctionToggle from "../functionToggleCheckbox.svelte";
</script>

<h1 class="pageHeader">Login</h1>
<div style="width: 100%; display: flex; flex-direction: column" />

<FunctionToggle
  title="Auto Login-Redirect"
  desc="Automatisch zur Login-Seite gehen."
  optionCode="autologinredirect"
  on:changed={connect}
/>
<hr />
<FunctionToggle
  title="Dashboard nach Login"
  desc="Nach dem Login wird der Benutzer automatisch zum Dashboard geleitet."
  optionCode="autodashboardredirect"
  on:changed={connect}
/>
<hr />
<FunctionToggle
  title="AutoFill-AutoLogin"
  desc="Automatisches Einloggen nach Autofill durch Passwort-Manager"
  optionCode="autologin_untrusted"
  on:changed={connect}
/>

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
