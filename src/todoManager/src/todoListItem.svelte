<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { changeDoneState } from "./main";
  const dispatch = createEventDispatcher();
  function todoClick(item: string) {
    dispatch("todoClick");
  }
  export let todoItem;

  export let key;
  let typeIcons = {
    ha: { icon: "file", color: "grey" },
    video: { icon: "video-camera", color: "#FF851B" },
    exam: { icon: "exclamation", color: "#FF4136" },
  };
  let done = todoItem.done;
  let coursesDictionary;
  chrome.storage.sync.get("fächer", (val) => {
    var { fächer } = val;
    coursesDictionary = fächer;
  });
  // Check if Time should be displayed or not (Firefox)
  let isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
</script>

<div
  style="display: flex; align-items: center;width: 100%; justify-content: space-between"
>
  <div
    on:click={() => {
      todoClick(key);
    }}
    style="display: flex; align-items: center; cursor: pointer; width: 100%"
  >
    <i
      class="fa fa-{typeIcons[todoItem.type].icon} colorTransition"
      style="{done
        ? 'color: #80808080'
        : `color: ${
            typeIcons[todoItem.type].color
          }`}; margin-right: 8px; margin-left: 4px; width: 15px; text-align: center; "
    />

    <div style="display: flex; flex-direction: column">
      {#if !isFirefox}
        <span
          class="colorTransition"
          style="font-size: 11px; margin-bottom: -3px; {done
            ? 'color: #80808080;'
            : 'color: #000000;'} display: flex; align-items: center; "
          ><span
            >{new Date(todoItem.time).getHours()}:{new Date(todoItem.time)
              .getMinutes()
              .toString().length === 1
              ? "0" + new Date(todoItem.time).getMinutes()
              : new Date(todoItem.time).getMinutes()}
          </span>
        </span>
      {/if}
      <span
        style="font-size: {isFirefox ? '15px' : '13px'}; 
       {done
          ? 'color: #80808080;'
          : 'color: #000000'}"
        class="colorTransition">{todoItem.title}</span
      >
    </div>
  </div>
  <input
    type="checkbox"
    checked={todoItem.done}
    on:input={(e) => {
      //@ts-ignore
      done = e.target.checked;
      //@ts-ignore
      console.log(e.target.checked);
      //@ts-ignore
      changeDoneState(key, e.target.checked);
    }}
  />
</div>

<style lang="scss">
  .colorTransition {
    transition: 0.175s ease color !important;
  }
  .courseBtn {
    &:hover {
      background-color: #0f6fc540;
    }
  }
</style>
