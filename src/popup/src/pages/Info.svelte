<script lnag="ts">
  import { goToUrl } from "src/ts/communication";

  let version = chrome.runtime.getManifest().version;
  import githubMark from "./../../assets/GitHub-Mark-32px.png";
  import githubLogo from "./../../assets/GitHub_Logo.png";
</script>

<h1 style="margin-bottom: 0px; margin-top: 16px;">Schulm**dleJena Tools</h1>
<h3 style="margin-top: 0px; margin-bottom: 32px; color: #888888">
  Version {version}
</h3>
<hr />
<b style="font-size: 14px">Robert Steffen Stündl</b>&nbsp;&lt;<a
  href="mailto:robert.st.stuendl@gmail.com">robert.st.stuendl@gmail.com</a
>&gt;
<br />
<span>Programmierer</span><br />
<br />
<b style="font-size: 14px">Clemens Grätz</b><br />
<span>starke Unterstützung</span>
<hr />

<div
  style="display: flex; flex-direction: column;  align-items: center; justify-content: center; text-decoration: none; margin-top: 32px; cursor: pointer"
  on:click={() => {
    chrome.tabs.create({
      url: "https://github.com/Quixelation/SchulmoodleJena-Tools",
    });
  }}
>
  <span
    style="
    font-size: 14px;
    margin-bottom: 2.5px;
    text-decoration: none;
    color: black;
    font-weight: 600;
"
    >Code ansehen:</span
  >
  <div>
    <img src={githubMark} alt="GitHub Mark" /><img
      src={githubLogo}
      style="height: 32px;"
      alt="GitHub Logo"
    />
  </div>
</div>

<br />

<style lang="scss">
  hr {
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
