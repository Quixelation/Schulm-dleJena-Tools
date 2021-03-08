<script lang="ts">
  import { addCourse, findCourses } from "./ts/courses";
  import Button from "./Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { fach, fachImageTypes } from "@shared/types";

  export let data: fach = null;

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
    //#region radio
    const selectedImageType: fachImageTypes = (() => {
      const value = document
        .querySelector("input[name=imageType]:checked")
        .parentElement.textContent.toLowerCase()
        .trim();
      if (
        (["emoji", "muster", "original"] as fachImageTypes[]).includes(
          value as fachImageTypes
        )
      ) {
        return value as fachImageTypes;
      } else {
        alert(
          "Fehler: Falscher imageType! Wir bitten Sie darum, den Entwickler bescheid zu geben."
        );
      }
    })();

    (document.getElementById(
      "muster_original_radio"
    ) as HTMLInputElement).checked = true;
    //#endregion
    //#region color
    const color = (document.getElementById("color-input") as HTMLInputElement)
      ?.value;
    //#endregion
    const sendingData: fach = {
      long: longName,
      short: shortName,
      emoji: courseEmoji,
      color,
      imageType: selectedImageType,
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
    <br /><label style="font-weight: 700" for="text-input">Kursbild:</label>
    <form>
      <label
        on:change={(e) => {
          //@ts-ignore
          imageType = e.target.parentElement.textContent.toLowerCase().trim();
        }}
        style="display: flex; align-items: center"
        ><input
          type="radio"
          name="imageType"
          checked={data?.imageType === "original" || data == null}
          id="muster_original_radio"
        />
        <span>Original</span></label
      >
      <label
        on:change={(e) => {
          //@ts-ignore
          imageType = e.target.parentElement.textContent.toLowerCase().trim();
        }}
        style="display: flex; align-items: center"
        ><input
          checked={data?.imageType === "emoji"}
          type="radio"
          name="imageType"
        />
        <span>Emoji</span></label
      >
      <label
        on:change={(e) => {
          //@ts-ignore
          imageType = e.target.parentElement.textContent.toLowerCase().trim();
        }}
        style="display: flex; align-items: center"
        ><input
          checked={data?.imageType === "muster"}
          type="radio"
          name="imageType"
        /> <span>Muster</span></label
      >
    </form>
    <br />
    {#if imageType === "emoji"}
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
    {/if}
    {#if imageType === "muster"}
      <div>
        <label for="color-input" style="font-weight: 700">Farbe:</label>
        <input
          style="margin-top: 2.5px; width: 100%; height: 36px"
          class="input"
          id="color-input"
          type="color"
          value={data?.color ? data.color : "#ff3e00"}
        />
      </div>
    {/if}
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
