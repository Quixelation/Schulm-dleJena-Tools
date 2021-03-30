<script>
  import Header from "./../components/header.svelte";
  import Card from "./../components/card.svelte";
  import Button from "./../components/button.svelte";
</script>

<div class="page">
  <Header>Schulm**dleJena Tools</Header>
  <div class="page_content">
    <Card highlight shadow="small">
      <h2 style="margin-top: 0px; font-weight: 500">
        Was ist Neu in <span class="monospace">2021.3.29</span>?
      </h2>
      <ul>
        <li>Befehlseingabe mit <code>Strg+Space</code></li>
      </ul>
      <div style="display: flex; justify-content: flex-end">
        <Button>Ok, Verstanden</Button>
      </div>
    </Card>
    <Card>
      <h2 style="margin-top: 0px; font-weight: 500">Das Offizielle Wiki:</h2>
    </Card>
  </div>
</div>
