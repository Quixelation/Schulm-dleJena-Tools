<script>
  import Header from "./../../components/header.svelte";
  import FunctionCard from "./../../components/functionCard.svelte";
</script>

<div class="page">
  <Header subtitle="Funktionen">Kurse</Header>
  <div class="page_content">
    <FunctionCard
      title="Nicht verfügbare Themen verstecken"
      description="Entfernt alle Kurse welche von Moodle als `hidden` gekennzeichnet wurden."
      optionCode="no-hidden-topics"
    >
      <div slot="bottomSlot">
        Erfahre mehr über <a>Auto Login-Redirect →</a>
      </div>
    </FunctionCard>
    <FunctionCard
      title="Videos größer darstellen"
      description="Vergrößert die eingebetteten Videos."
      optionCode="biggerVideo"
    >
      <div slot="bottomSlot">
        Erfahre mehr über <a>Dashboard nach Login →</a>
      </div>
    </FunctionCard>
    <FunctionCard
      title="'Fließen-Design' in 'Listen-Design' umwandeln"
      description="Wandelt das 'Fließen-Design' (das mit den Rechtecken/Boxen), in ein 'Listen-Design' um. [Netzaufwendiger!]"
      optionCode="tilesToList"
    >
      <div slot="bottomSlot">Erfahre mehr über <a>AutoFill-AutoLogin →</a></div>
    </FunctionCard>
  </div>
</div>
