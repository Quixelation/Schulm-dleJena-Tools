<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function click() {
    dispatch("click");
  }
</script>

<button on:click={click}>
  <slot />
</button>

<style>
  button {
    background-color: #ff3e00;
    color: white;
    font-weight: 500;
    padding: 8px 24px;
    border-radius: 4px;
    line-height: 20px;
    font-size: 14px;
    transition: background-color 0.1s ease, transform 0.1s ease;
    cursor: pointer;
    height: fit-content;
  }
  button:active {
    background-color: #d83702;
    transform: translateY(1px);
  }
</style>
