<script>
  import Header from "./../../components/header.svelte";
  import FunctionCard from "./../../components/functionCard.svelte";
</script>

<div class="page">
  <Header subtitle="Funktionen">Dashboard</Header>
  <div class="page_content">
    <FunctionCard
      title="Farbiger Fortschritt"
      description="Füge 2 neue Knöpfe zur Moodle Seite hinzu, um schneller zum Dashboard zu gelangen."
      optionCode="usecoloredprogress"
    >
      <div slot="bottomSlot">Erfahre mehr über <a>Dashboard Knopf →</a></div>
    </FunctionCard>
    <FunctionCard
      title="Emoji-Größe"
      description="Steuert die Größe des Emojis auf der Dashboard-Kurs-Link. (Angabe in %; Werte über 100 erlaubt)"
      optionCode="dashboardEmojiFontSize"
      inputType="number"
    />
    <FunctionCard
      title="Immer den 'realen'/'angepassten' Kurs-Fortschritt anzeigen"
      description="Passt die Progressbar der Kurse auf dem Dashboard an, sodass nur Aktivitäten, welche abgehakt werden können, in betracht gezogen werden."
      optionCode="alwaysShowCustomProgress"
    >
      <div slot="bottomSlot">Erfahre mehr über <a>Dashboard Knopf →</a></div>
    </FunctionCard>
  </div>
</div>
