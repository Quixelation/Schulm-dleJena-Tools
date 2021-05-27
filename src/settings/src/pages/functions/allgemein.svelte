<script>
  import Header from "./../../components/header.svelte";
  import FunctionCard from "./../../components/functionCard.svelte";
</script>

<div class="page">
  <Header subtitle="Funktionen">Allgemein</Header>
  <div class="page_content">
    <FunctionCard
      title="Dashboard Knöpfe"
      description="Füge 2 neue Knöpfe zur Moodle Seite hinzu, um schneller zum Dashboard zu gelangen."
      optionCode="removeNavigationBlock"
    >
      <div slot="bottomSlot">Erfahre mehr über <a>Dashboard Knopf →</a></div>
    </FunctionCard>
  </div>
</div>
