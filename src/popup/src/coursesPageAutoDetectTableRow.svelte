<script lang="ts">
  export let courseName;
  import { getAutoCourseName, getAutoAssets } from "./ts/courses";
  const genAutoName = getAutoCourseName(courseName);
  let checkboxChecked = false;
  let autoAsset = "";
  if (genAutoName) {
    checkboxChecked = true;
    autoAsset = getAutoAssets(genAutoName) || "";
  }
  let handleNameInput = (e) => {
    checkboxChecked = e.target.value.length > 0;
  };
</script>

<tr>
  <td>
    <div
      class={`statusLight ${checkboxChecked ? "courseChecked" : ""}`}
      style={`background-color: ${checkboxChecked ? "#2ECC40" : "#FF4136"}`}
    />
  </td>
  <td class="tdFlexContainer">
    <div>{courseName}</div>
    <div class="tdFlexContainerInnerFlexContainer">
      <input
        value={genAutoName}
        class="courseNameInput"
        on:input={handleNameInput}
        placeholder="Kurzer Name"
        type="text"
      />

      <input
        value={autoAsset}
        class="courseEmojiInput"
        placeholder="Emoji"
        type="text"
      />
    </div>
  </td>
</tr>

<style lang="scss">
  .statusLight {
    height: 16px;
    width: 16px;
    border-radius: 50%;
  }
  .tdFlexContainer {
    display: flex;
    flex-direction: column;
    .tdFlexContainerInnerFlexContainer {
      display: flex;
      input:nth-child(1) {
        width: 150px;
      }
      input:nth-child(2) {
        width: 50px;
      }
    }
  }
</style>
