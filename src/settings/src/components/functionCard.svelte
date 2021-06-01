<script lang="ts">
  export let title: string;
  export let description: string;
  export let optionCode: string;
  export let inputType: "boolean" | "number" = "boolean";
  import Card from "./../components/card.svelte";
  import ToggleInput from "./../components/toggleInput.svelte";
  let value;
  switch (inputType) {
    case "boolean":
      value = false;
      break;
    case "number":
      value = 0;
      break;
  }
  chrome.storage.sync.get([optionCode], (values) => {
    value = values[optionCode];
  });
  function change(e) {
    console.log(e);
    var value;
    if (inputType === "number") {
      value = e.target.value;
    } else {
      value = e.detail;
    }
    chrome.storage.sync.set({ [optionCode]: value });
  }
</script>

<Card
  shadow={value === true || (typeof value !== "boolean" && value)
    ? "smallest"
    : null}
>
  <div
    style="display: flex; justify-content: space-between; align-items: center;"
  >
    <h2 style="margin: 0px; margin-bottom: 5px; font-weight: 500">
      {title}
    </h2>
    <div>
      {#if inputType === "boolean"}
        <ToggleInput bind:value on:change={change} />
      {:else if inputType === "number"}
        <input
          type="number"
          class="numberInput"
          style="text-align: right"
          {value}
          on:input={change}
        />
      {/if}
    </div>
  </div>
  <div style="color: #737373">{description}</div>
  <!-- TODO: Remove display: none  -->
  <div class="footer" style="display: none;">
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
