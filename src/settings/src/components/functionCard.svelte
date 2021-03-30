<script lang="ts">
  export let title: string;
  export let description: string;
  import Card from "./../components/card.svelte";
  import ToggleInput from "./../components/toggleInput.svelte";
</script>

<Card>
  <div style="display: flex; justify-content: space-between">
    <h2 style="margin: 0px; margin-bottom: 5px; font-weight: 500">
      {title}
    </h2>
    <div>
      <ToggleInput />
    </div>
  </div>
  <div style="color: #737373">{description}</div>
  <div class="footer">
    <slot name="bottomSlot" />
  </div>
</Card>

<style>
  .footer {
    margin: -1rem;
    margin-top: 1rem;
    position: relative;
    min-height: 54px;
    align-items: center;
    background-color: #fafafa;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    color: #444;
    display: flex;
    font-size: 0.875rem;
    padding: 12px 24px;
    box-sizing: border-box;
    line-height: 1.6;
  }
</style>
