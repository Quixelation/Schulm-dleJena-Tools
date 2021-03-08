<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let optionCode;
  export let title;
  export let desc;
  let value;
  chrome.storage.sync.get(optionCode, function (returnvalue) {
    console.log("Retunrvalue", optionCode, returnvalue);
    value = returnvalue[optionCode];
  });
  let inputHandler = (e) => {
    chrome.storage.sync.set(
      { [optionCode]: (e.target as HTMLInputElement).checked },
      () => {
        dispatch("changed");
      }
    );
  };
</script>

<div>
  <div class="mainContainer" on:click={inputHandler} style="">
    <div class="FunctionDetails">
      <div class="functionTitle">{title}</div>
      <div class="functionDesc">{desc}</div>
    </div>
    <label class="switch">
      <input type="checkbox" checked={value} />
      <span class="slider round" />
    </label>
  </div>
</div>

<style lang="scss">
  .mainContainer {
    display: grid;
    grid-template-columns: 1fr 60px;
  }
  .FunctionDetails {
    display: flex;
    flex-direction: column;
    .functionTitle {
      font-weight: bold;
      font-size: 14px;
    }
    .functionDesc {
      font-size: 12px;
    }
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #ff3e00;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ff3e00;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
