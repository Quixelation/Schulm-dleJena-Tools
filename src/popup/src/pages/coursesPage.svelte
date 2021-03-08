<script lang="ts">
  import FunctionToggle from "../functionToggleCheckbox.svelte";
  import { goToUrl } from "../ts/communication";
  import { getRegisteredCourses } from "../ts/courses";
  import Button from "./../Button.svelte";
  import { push } from "svelte-spa-router";
  import LinkListItem from "./../linkListItem.svelte";

  let registeredCourses;
  let getCourses = () => {
    getRegisteredCourses().then((val) => {
      console.log("Got Val", val);
      registeredCourses = val;
    });
  };
  getCourses();
  let allowAutoDetec: number | true = 0;
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    console.log(tab[0]);
    if (
      tab[0].title === "Dashboard" &&
      tab[0].url.includes("https://moodle.jsp.jena.de/my/")
    ) {
      allowAutoDetec = true;
    } else {
      if (tab[0].url.includes("moodle.jsp.jena.de/")) {
        allowAutoDetec = 1;
      } else {
        allowAutoDetec = 2;
      }
    }
  });
  let gotoDash = () => {
    goToUrl("https://moodle.jsp.jena.de/my/", true);
  };
</script>

<div id="coursePage" class="Page">
  <!-- <h2 id="findCoursesHeader" class="header">Kurse erkennen</h2>
  <p>
    Kurse automatisch erkennen lassen.<br />Sie müssen sich auf der Dashboard
    Seite befinden und die Kurs müssen sichtbar sein.
  </p>
  {#if allowAutoDetec === true}
    <Button
      title="Auto"
      on:click={() => {
        push("/autoDetecCourses");
      }}
    />
  {:else if allowAutoDetec === 1}
    <p style="color: #FF4136">
      <b>Sie müssen sich auf der Dashboard Seite befinden.</b><br />
      <span
        on:click={gotoDash}
        style="cursor: pointer; text-decoration: underline"
        >Zum Dashboard gehen</span
      >
    </p>
  {:else if allowAutoDetec === 2}
    <p style="color: #FF4136">
      <b>Sie müssen sich auf der SchulmoodleJena Website befinden.</b><br />
    </p>
  {/if}
  <hr /> -->

  <h1>Kurse</h1>
  <em style="text-align: center;"
    >Änderungen nach Aktualisierung der Seite sichtbar.</em
  ><br /><br />
  {#if registeredCourses}
    {#each Object.keys(registeredCourses) as id}
      <!-- <CoursesPageCoursesListItem
        on:reload={() => {
          getCourses();
        }}
        longName={fach}
        shortName={registeredCourses[fach].short}
        emoji={registeredCourses[fach].emoji}
      /> <br />-->
      <LinkListItem
        on:click={() => {
          push("/edit/" + encodeURIComponent(id));
        }}>{registeredCourses[id].long}</LinkListItem
      >
    {:else}
      <em>Keine eingetragenen Kurse gefunden.</em>
    {/each}
  {/if}
</div>

<style lang="scss">
  #coursePage {
    #findCoursesHeader {
      margin-bottom: 0px;
      & ~ p {
        margin-top: 0px;
      }
    }
    #detectedCourses {
      table.detectedCoursesList {
      }
    }
  }
</style>
