<script>
  import Header from "./../../components/header.svelte";
  let versionName =
    chrome?.runtime?.getManifest?.()?.version_name ?? "{{VersionName}}";
  let version = chrome?.runtime?.getManifest?.()?.version ?? "{{Version}}";
</script>

<div class="page">
  <Header subtitle="Info > Über">Schulm**dleJena Tools</Header>
  <div class="page_content">
    <span class="version">
      Version: <span class="monospace">
        {versionName}
      </span>
      (<span class="monospace">{version}</span>)
    </span>
    <h2 class="sectionTitle">Team:</h2>
    <div class="teamGrid">
      <div class="teamGridItem">
        <h2>Robert Stündl</h2>
        <h3>Programmierer</h3>
        <ul>
          <li>
            <a href="https://robertstuendl.com" target="_blank"
              >robertstuendl.com</a
            >
          </li>
          <li>
            <a href="mailto:robert.st.stuendl@gmail.com"
              >robert.st.stuendl@gmail.com</a
            >
          </li>
          <li>
            <a href="https://www.instagram.com/therobschge/" target="_blank"
              >@therobschge</a
            >
          </li>
        </ul>
      </div>
      <div class="teamGridItem">
        <h2>Clemens Grätz</h2>
        <h3>Tester / Design / Helfer</h3>
        <ul>
          <li>
            <a href="mailto:spaceboysnens@outlook.de"
              >spaceboysnens@outlook.de</a
            >
          </li>
          <li>
            <a
              href="https://www.instagram.com/meistersnenseji_/"
              target="_blank">@meistersnenseji_</a
            >
          </li>
        </ul>
      </div>
    </div>
    <h2 class="sectionTitle">Vielen Dank</h2>
    <span
      >Vielen Dank <em>Clemens</em>, für die <em>starke Unterstützung</em> bei diesem
      Projekt! Vielen Dank, für deine Hilfe beim Design, bei der Kommunikation, beim
      Testen. Ohne dich wäre das Heute sicherlich immernoch eine Erweiterung zum
      Automatischen Einloggen!</span
    ><br /><br />
    <span>
      Vielen Dank an die <em>Person, die das hier gerade liest</em>. Vielen
      Dank, dass du die Erweiterung <em>heruntergeladen</em> hast! Bei Vorschlägen
      und Fragen kannst du dich sehr gerne bei mir melden.
    </span>
    <h2 class="sectionTitle">Code</h2>
    <span>
      Der ganze Code ist unter der GPL-3.0 Lizenz auf <a
        href="https://smjt.vercel.app/github"
        target="_blank">GitHub</a
      >.
    </span>
  </div>
</div>

<style>
  .version {
    color: grey;
    font-weight: bold;
    font-size: large;
  }
  .version .monospace {
    color: rgba(255, 62, 0, 0.8);
  }
  h2.sectionTitle {
    margin-bottom: 7px;
    margin-top: 20px;
  }
  .teamGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  .teamGridItem {
    display: flex;
    flex-direction: column;
    padding: 17px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5px;
  }
  .teamGridItem > h2 {
    margin: 0;
  }
  .teamGridItem > h3 {
    margin: 0;
    text-transform: uppercase;
    color: grey;
  }
  .teamGridItem > ul {
    list-style-type: none;
    width: fit-content;
    margin: 0;
    padding: 0;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .teamGridItem > ul > li {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .teamGridItem > ul > li:not(:last-of-type) {
    border-bottom: 1px solid rgb(206, 206, 206);
  }
</style>
