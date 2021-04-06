<script lang="ts">
  import { onMount } from "svelte";

  import iro from "@jaames/iro";

  import { addCourse, findCourses } from "./ts/courses";
  import Button from "./Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { fach, fachImageTypes } from "@shared/types";

  export let data: fach = null;
  var colorPicker;
  onMount(async () => {
    //@ts-ignore
    colorPicker = new iro.ColorPicker("#picker", {
      width: 175,
      // Set the initial color to pure red
      color: data.color,
      layoutDirection: "horizontal",
    });
  });
  export let longName: string = data?.long;

  export let id;
  let imageType = data?.imageType ? data.imageType : "original";
  console.log("data", data);
  const dispatch = createEventDispatcher();

  let saveCourse = () => {
    //#region textInput
    const shortName = (document.getElementById(
      "text-input"
    ) as HTMLInputElement)?.value;
    (document.getElementById("text-input") as HTMLInputElement).value = "";
    //#endregion
    //#region emoji

    const courseEmoji = (document.getElementById(
      "emoji-input"
    ) as HTMLInputElement)?.value;
    (document.getElementById("emoji-input") as HTMLInputElement)
      ? ((document.getElementById("emoji-input") as HTMLInputElement).value =
          "")
      : null;
    //#endregion

    const sendingData: fach = {
      long: longName,
      short: shortName,
      emoji: courseEmoji,
      color: colorPicker.color.hexString,
      imageType,
    };
    console.log("sendingData", sendingData);
    dispatch("save", { data: sendingData, id });
    imageType = "original";
  };
  function ignoreCourse() {
    dispatch("ignore");
  }
  export let showIgnore: boolean;
</script>

<div class="AutoDetectContainer">
  <h3>{longName}</h3>
  <div class="inputsGrid">
    <div>
      <label style="font-weight: 700" for="text-input">Kurzer Name:</label>
      <input
        style="margin-top: 2.5px; "
        class="input"
        id="text-input"
        type="text"
        value={data ? data.short || "" : ""}
      />
    </div>
    <br /><label style="font-weight: 700">Kursbild:</label>
    <select
      bind:value={imageType}
      id="imageTypeSelect"
      style="padding: 5px; padding-left: 2px;"
    >
      <option value="original">Original</option>
      <option value="emoji">Emoji</option>
      <option value="emoji_bg">Emoji mit farbigen Hintergrund</option>
      <option value="emoji_muster">Emoji mit Muster</option>
      <option value="muster">Muster</option>
      <option value="bg">Farbe</option>
    </select>

    <br />

    <div>
      <label for="text-input" style="font-weight: 700">Emoji:</label>
      <input
        style="margin-top: 2.5px; "
        class="input"
        id="emoji-input"
        type="text"
        value={data?.emoji ? data.emoji : ""}
      />
    </div>
    <br />
    <div>
      <label for="color-input" style="font-weight: 700">Farbe:</label>
    </div>
    <div style="margin: auto; width: fit-content" id="picker" />
  </div>
  <br />
  <div
    class="buttonsGrid"
    style="width: fit-content; position: relative; margin-left: auto;"
  >
    {#if showIgnore}
      <Button title="Ignorieren   " on:click={ignoreCourse}
        ><span class="material-icons"> skip_next </span></Button
      >
      <div>&nbsp;</div>
    {:else}
      <Button title="Löschen" on:click={ignoreCourse}
        ><span class="material-icons" style="margin-left: 5px;">
          delete</span
        ></Button
      >
      <div>&nbsp;</div>
    {/if}
    <Button title="Speichern" on:click={saveCourse}
      ><span class="material-icons" style="margin-left: 5px;">
        add_task</span
      ></Button
    >
  </div>
</div>

<style lang="scss">
  .AutoDetectContainer {
    padding: 5px;
    border: 1px solid grey;
    border-radius: 5px;
    .inputsGrid {
      display: flex;
      flex-direction: column;
      > div {
        display: flex;
        flex-direction: column;
      }
    }
    .buttonsGrid {
      display: grid;

      grid-template-columns: 1fr 8px 1fr;
    }
  }
</style>
