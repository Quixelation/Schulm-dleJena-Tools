<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { changeDoneState } from "./main";
  const dispatch = createEventDispatcher();
  function todoClick(item: string) {
    dispatch("todoClick");
  }
  export let todoItem: todoItem;

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
  class="{done ? 'hoverBlackActivator' : 'card'} todoItem p-1"
  style="display: flex; align-items: center;width: 100%; flex-direction: row !important; border-left: 5px solid {todoItem.color}; background-color: white;"
>
  <input
    type="checkbox"
    style="margin-right: 10px; margin-left: 5px;"
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
  <div
    style="display: flex; flex-direction: column"
    on:click={() => {
      todoClick(key);
    }}
  >
    {#if !isFirefox}
      <span
        class="colorTransition hoverBlack"
        style="font-size: 11px; margin-bottom: -3px; {done
          ? 'color: #80808080;'
          : 'color: #000000;'} display: flex; align-items: center; "
        ><span
          ><b
            >{new Date(todoItem.time).getHours()}:{new Date(todoItem.time)
              .getMinutes()
              .toString().length === 1
              ? "0" + new Date(todoItem.time).getMinutes()
              : new Date(todoItem.time).getMinutes()} - Biologie</b
          >
        </span>
      </span>
    {/if}
    <span
      style="font-size: {isFirefox ? '15px' : '13px'}; 
       {done
        ? 'color: #80808080;'
        : 'color: #000000'}"
      class="colorTransition hoverBlack">{todoItem.title}</span
    >
  </div>
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
  .hoverBlackActivator:hover .hoverBlack {
    color: black !important;
    box-shadow: none !important;
  }
</style>
