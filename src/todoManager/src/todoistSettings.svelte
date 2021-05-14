<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let routerData;
  console.log("routerData", routerData);

  function goBack() {
    dispatch("back");
  }
</script>

<div
  style="display: flex; align-items: center; margin-bottom: 10px; color: #0f6fc5; cursor: pointer;"
  on:click={goBack}
>
  <i class="fa fa-chevron-left" style="font-size: 12px;" />
  <span
    style="
    margin-left:  5px;
    text-decoration: underline;
    font-size: 14px;
    margin-bottom: 1px;
"
  >
    Zurück
  </span>
</div>
<h5>Todoist</h5>
