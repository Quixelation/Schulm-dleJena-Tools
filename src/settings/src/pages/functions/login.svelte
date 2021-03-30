<script>
  import Header from "./../../components/header.svelte";
  import FunctionCard from "./../../components/functionCard.svelte";
</script>

<div class="page">
  <Header subtitle="Funktionen">Login</Header>
  <div class="page_content">
    <FunctionCard
      title="Auto Login-Redirect"
      description="Automatisch zur Login-Seite gehen."
    >
      <div slot="bottomSlot">
        Erfahre mehr über <a>Auto Login-Redirect →</a>
      </div>
    </FunctionCard>
    <FunctionCard
      title="Dashboard nach Login"
      description="Nach dem Login wird der Benutzer automatisch zum Dashboard geleitet."
    >
      <div slot="bottomSlot">
        Erfahre mehr über <a>Dashboard nach Login →</a>
      </div>
    </FunctionCard>
    <FunctionCard
      title="AutoFill-AutoLogin"
      description="Automatisches Einloggen nach Autofill durch Passwort-Manager"
    >
      <div slot="bottomSlot">Erfahre mehr über <a>AutoFill-AutoLogin →</a></div>
    </FunctionCard>
  </div>
</div>
