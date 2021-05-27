<script lang="ts">
  export let value: boolean = false;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function change(e) {
    dispatch("change", e.target.checked);
  }
</script>

<input bind:checked={value} on:change={change} type="checkbox" class="toggle" />

<style>
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  input[type="checkbox"]:focus {
    outline: 0;
  }

  .toggle {
    box-shadow: 0 1px 3px rgb(0, 0, 0, 0.12) inset,
      0 1px 2px rgb(0, 0, 0, 0.24) inset !important;
    height: 32px;
    width: 52px;
    border-radius: 16px;
    display: inline-block;
    position: relative;
    margin: 0;

    background: hsl(0, 0%, 75%);
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }
  .toggle:after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }
  .toggle:checked {
    background-color: #ff3e00;
  }
  .toggle:checked:after {
    transform: translatex(20px);
  }
</style>
