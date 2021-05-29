<script lang="ts">
  import Header from "./../components/header.svelte";
  import Card from "./../components/card.svelte";
  import Button from "./../components/button.svelte";
  import { onMount } from "svelte";
  let sitetopicCard;
  let forumPost1;
  let forumPost2;
  onMount(() => {
    try {
      var sitetopic = document.querySelector(".sitetopic");
      var sitetopicClone = sitetopic.cloneNode(true);
      sitetopicClone.querySelector(
        "img[src='https://moodle.jsp.jena.de/pluginfile.php/99/mod_label/intro/moodleHilft_Aeneas.jpg']",
      ).style.margin = "0";
      console.log(sitetopicCard);
      sitetopicCard.append(sitetopicClone);

      //* Form Post
      var posts = document.querySelectorAll("article");

      var forumPostClone = posts[0].children[0].children[0].cloneNode(true);
      forumPostClone.querySelector("header").classList.remove("row");
      console.log(sitetopicCard);
      forumPost1.append(forumPostClone);

      forumPostClone = posts[1].children[0].children[0].cloneNode(true);
      forumPostClone.querySelector("header").classList.remove("row");
      console.log(sitetopicCard);
      forumPost2.append(forumPostClone);
    } catch (e) {
      console.warn(e);
    }
  });

  var showUpdates = false;
  chrome.storage.local.get(
    "lastSeenWhatsNew",
    (values: extension.storage.local) => {
      showUpdates =
        values["lastSeenWhatsNew"] !== chrome.runtime.getManifest().version;
    },
  );

  function seenWhatsNew() {
    chrome.storage.local.set(
      { lastSeenWhatsNew: chrome.runtime.getManifest().version },
      () => {
        showUpdates = false;
      },
    );
  }
</script>

<div class="page">
  <div class="page_content">
    {#if showUpdates}
      <Card highlight shadow="small">
        <h2 style="margin-top: 0px; font-weight: 500">
          Was ist Neu in <span class="monospace"
            >{chrome.runtime.getManifest().version}</span
          >?
        </h2>
        <ul>
          <li>
            Dieses Panel, wo man Einstellungen vornehmen, Kurse bearbeiten und
            Infos über die Erweiterung einsehen kann.
          </li>

          <li>
            "Änderungen ansehen" benutzt nun die Moodle-Api um zuverlässigere
            Ergebnisse zu liefern.
          </li>
          <li>
            "Änderungen ansehen" unterstützt nun auch die Kachel-Ansicht bei
            Kursen.
          </li>
          <li>
            Der TodoManager unterstützt nun Prioritäten von Todos (anstatt des
            Todo-Typs nun).
          </li>
          <li>
            Der TodoManager kann sich nun mit <a href="https://todoist.com/"
              >Todoist</a
            > synchronisieren.
          </li>
        </ul>
        <div style="display: flex; justify-content: flex-end">
          <Button on:click={seenWhatsNew}>Ok, Verstanden</Button>
        </div>
      </Card>
    {/if}
    <Card shadow="smallest">
      <div class="smjtSitetopicCard" bind:this={sitetopicCard} />
    </Card>
    <Card shadow="smallest">
      <div class="forum-post-core" bind:this={forumPost1} />
    </Card>
    <Card shadow="smallest">
      <div class="forum-post-core" bind:this={forumPost2} />
    </Card>
  </div>
</div>

<style>
  :global(.smjtSitetopicCard h1, .smjtSitetopicCard span, .smjtSitetopicCard
      h3, .smjtSitetopicCard p) {
    text-align: left !important;
  }
  :global(.smjtSitetopicCard .contentwithoutlink) {
    margin-right: -32px;
  }
</style>
