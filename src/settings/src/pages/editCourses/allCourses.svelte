<script lang="ts">
  import { push } from "svelte-spa-router";

  import Header from "../../components/header.svelte";

  import Card from "./../../components/card.svelte";

  import ListItem from "./../../components/listItem.svelte";

  var courses: fächer = null;

  chrome.storage.sync.get("fächer", (values: extension.storage.sync) => {
    courses = values["fächer"];
  });

  function navigateToCourse(courseKey: string) {
    push("/editCourses/" + courseKey);
  }
</script>

<Header>Kurse bearbeiten</Header>
<div class="page_content">
  {#if courses === null}
    <p>Lädt: Bitte warten...</p>
  {:else}
    <Card noPadding>
      {#each Object.keys(courses) as courseKey (courseKey)}
        <ListItem
          on:click={() => {
            navigateToCourse(courseKey);
          }}
          ><span style="width: 32px; display: inline-block"
            >{courses[courseKey].emoji
              ? courses[courseKey].emoji + ""
              : ""}</span
          >{courses[courseKey].long}</ListItem
        >
      {/each}
    </Card>
  {/if}
</div>
