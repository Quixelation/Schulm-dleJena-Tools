<script>
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

      document.querySelector("#region-main").style.display = "none";
    } catch (e) {
      console.warn(e);
    }
  });
</script>

<div class="page">
  <div class="page_content">
    <Card highlight shadow="small">
      <h2 style="margin-top: 0px; font-weight: 500">
        Was ist Neu in <span class="monospace">2021.3.29</span>?
      </h2>
      <ul>
        <li>Befehlseingabe mit <code>Strg+Space</code></li>
      </ul>
      <div style="display: flex; justify-content: flex-end">
        <Button>Ok, Verstanden</Button>
      </div>
    </Card>
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
