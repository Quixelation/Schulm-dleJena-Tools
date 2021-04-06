<script lang="ts">
  export let title;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function clickIt() {
    dispatch("click");
  }
</script>

<div class="button" on:click={clickIt}>
  <span>{title}</span><slot />
</div>

<style lang="scss">
  .button {
    cursor: pointer;
    padding: 5px;
    border: 2.5px solid #ff3e00;
    border-radius: 5px;
    color: #ff3e00;
    font-weight: bold;
    text-align: center;
    transition: box-shadow 0.25s ease;
    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) inset,
        0 1px 2px rgba(0, 0, 0, 0.24) inset;
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
