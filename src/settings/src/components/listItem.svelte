<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div
  class="linkListItem"
  on:click={() => {
    dispatch("click");
  }}
>
  <div class="text"><slot /></div>

  <svg
    width="11px"
    height="11px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <title />
    <g id="880b5b52-5578-436c-a64a-10a281e56ea6" data-name="Arrow Left">
      <path
        d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
      />
    </g>
  </svg>
</div>

<style lang="scss">
  .linkListItem {
    cursor: pointer;
    padding: {
      left: 5px + 10px;
      right: 5px + 10px;
      top: 15px;
      bottom: 15px;
    }
    //height: 45px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: -webkit-fill-available;

    .text {
      margin-right: 10px;
      font-size: 14px;
      position: relative;
      text-decoration: none;
      color: #172128;

      // &:after {
      //   content: "";
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 0.1em;
      //   min-height: 1px;
      //   background-color: currentColor;
      //   transform: scaleX(0);
      //   transform-origin: left;
      //   transition: transform 0.25s ease;
      // }
    }
    &:hover {
      background-color: #f7f9fa;
    }
    .icon {
      color: #172128;
    }
    border-top: solid 0.75px rgb(172, 172, 172);
    &:last-of-type {
      border-bottom: solid 0.75px rgb(172, 172, 172);
    }
  }
</style>
