<script lang="ts">
  export let name: string;
  import Router, { pop } from "svelte-spa-router";
  import Page_Home from "./pages/home.svelte";
  import Page_Functions_Allgemein from "./pages/functions/allgemein.svelte";
  import Page_Functions_Login from "./pages/functions/login.svelte";
  import Page_404 from "./pages/404.svelte";
  const routes = {
    "/": Page_Home,
    "/functions/allgemein": Page_Functions_Allgemein,
    "/functions/login": Page_Functions_Login,
    "*": Page_404,
  };
  import Sidebar from "./components/sidebar.svelte";
</script>

<main class="maincontainer">
  <Sidebar />
  <div><Router {routes} /></div>
</main>

<style>
  :global(.maincontainer *, ) {
    box-sizing: border-box;
  }

  main.maincontainer {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    width: 1048px;
    padding-left: var(--geist-page-margin);
    padding-right: var(--geist-page-margin);

    margin: 0 auto;

    border-radius: 0.25rem;
    display: grid;
    grid-template-columns: 275px auto;
    height: 100%;
    background-color: #f8f9fa;
    color: #333;

    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  :global(.maincontainer .page) {
    min-height: 100%;
  }
  :global(.maincontainer hr) {
    background: #eaeaea;
    margin: 24px 0;
    border: none;
    height: 1px;
  }

  :global(.maincontainer code) {
    padding: 0.2em 0.4em;
    margin: 0;
    background-color: #1b1f230d;
    border-radius: 6px;
  }
  :global(.maincontainer .monospace) {
    font-family: monospace;
  }
  :global(.maincontainer .page_content) {
    padding: 15px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  :global(.maincontainer html, body) {
    position: relative;
    width: 100%;
    height: 100%;
  }

  :global(.maincontainer a) {
    color: rgb(0, 100, 200);
    text-decoration: none;
  }

  :global(.maincontainer a:hover) {
    text-decoration: underline;
  }

  :global(.maincontainer a:visited) {
    color: rgb(0, 80, 160);
  }

  :global(.maincontainer label) {
    display: block;
  }

  :global(.maincontainer input, button, select, textarea) {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  :global(.maincontainer input:disabled) {
    color: #ccc;
  }

  :global(.maincontainer button) {
    color: #333;
    background-color: #f4f4f4;
    outline: none;
  }

  :global(.maincontainer button:disabled) {
    color: #999;
  }

  :global(.maincontainer button:not(:disabled):active) {
    background-color: #ddd;
  }

  :global(.maincontainer button:focus) {
    border-color: #666;
  }

  :global(.maincontainer h1) {
    font-size: 2em;
    font-weight: bolder;
  }
  :global(.maincontainer h2) {
    font-size: 1.5em;
    font-weight: bolder;
  }
  :global(.maincontainer h3) {
    font-size: 1.17em;
    font-weight: bolder;
  }
  :global(.maincontainer h4) {
    font-size: 1em;
    font-weight: bolder;
  }
  :global(.maincontainer h5) {
    font-size: 0.83em;
    font-weight: bolder;
  }
  :global(.maincontainer h6) {
    font-size: 0.67em;
    font-weight: bolder;
  }
</style>
