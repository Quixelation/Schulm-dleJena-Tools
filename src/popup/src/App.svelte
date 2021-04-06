<script lang="ts">
  import ActiveIndicator from "./activeIndicator.svelte";
  import Button from "./Button.svelte";
  import CoursesPage from "./pages/coursesPage.svelte";
  import FunctionsPage from "./pages/functionsPage.svelte";
  const mainPage = document.getElementById("mainPage");
  const coursePage = document.getElementById("coursePage");
  let activePage = "mainPage";
  import Router, { pop } from "svelte-spa-router";
  import Page_Home from "./pages/home.svelte";
  import Page_NotFound from "./pages/404.svelte";
  import Page_AutoDetecCourses from "./pages/autodetectCoursesPage.svelte";
  import Page_editCourse from "./pages/editCourse.svelte";
  import Page_Info from "./pages/Info.svelte";
  import Page_devStorage from "./pages/devStorage.svelte";
  import Page_localStorage from "./pages/localStorage.svelte";
  import Page_dashboardSettings from "./pages/dashboardSettings.svelte";
  import Page_courseSettings from "./pages/courseSettings.svelte";
  import Page_loginSettings from "./pages/loginSettings.svelte";
  import Page_downloadSettings from "./pages/downloadSettings.svelte";
  const routes = {
    // Exact path
    "/": Page_Home,
    "/functions": FunctionsPage,
    "/courses": CoursesPage,
    "/autoDetecCourses": Page_AutoDetecCourses,
    "/edit/:id": Page_editCourse,
    "/info": Page_Info,
    "/devStorage": Page_devStorage,
    "/localStorage": Page_localStorage,
    "/dashboardSettings": Page_dashboardSettings,
    "/courseSettings": Page_courseSettings,
    "/loginSettings": Page_loginSettings,
    "/downloadSettings": Page_downloadSettings,
    // // Using named parameters, with last being optional
    // "/author/:first/:last?": Author,

    // // Wildcard parameter
    // "/book/*": Book,

    // Catch-all
    // This is optional, but if present it must be the last
    "*": Page_NotFound,
  };
  import { location, querystring } from "svelte-spa-router";
  import BackBtn from "./backBtn.svelte";
</script>

<div id="fullPopupPage">
  <div id="router" style="max-height: 540px; overflow: auto; ">
    <Router {routes} />
  </div>
  <div
    class="PopUpTitleContainer"
    style="z-index: 99 !important"
    on:click={pop}
  >
    <div
      class="PopUpTitle"
      style="display: flex; 
  flex-direction: column;  justify-content: center; width: 100%; "
    >
      {#if $location === "/"}
        <h2
          class="title"
          style="margin-bottom: 0px; color: white; font-size: 1.25rem;"
        >
          Schulm**dleJena Tools
        </h2>
        <span style="margin-top: 0px; font-size: 9.5px;">
          by Robert Stündl & Clemens Grätz
        </span>
      {:else}
        <div
          class="backLink"
          style="display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: -10px;
    width: fit-content;font-size: 18px;
    font-weight: bold;"
        >
          <span class="material-icons"> navigate_before </span><span
            >Zurück</span
          >
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  #fullPopupPage {
    display: flex;
    flex-direction: column-reverse;
  }
  /* Material Icons Font (for MD theme) */
  @font-face {
    font-family: "Material Icons";
    font-style: normal;
    font-weight: 400;
    src: url(fonts/MaterialIcons-Regular.eot);
    src: local("Material Icons"), local("MaterialIcons-Regular"),
      url(fonts/MaterialIcons-Regular.woff2) format("woff2"),
      url(fonts/MaterialIcons-Regular.woff) format("woff"),
      url(fonts/MaterialIcons-Regular.ttf) format("truetype");
  }
  :global(.material-icons) {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "liga";
  }
  :global(h2) {
    color: #172128;
  }
  /* Framework7 Icons Font (for iOS theme) */
  @font-face {
    font-family: "Framework7 Icons";
    font-style: normal;
    font-weight: 400;
    src: url("fonts/Framework7Icons-Regular.eot");
    src: url("fonts/Framework7Icons-Regular.woff2") format("woff2"),
      url("fonts/Framework7Icons-Regular.woff") format("woff"),
      url("fonts/Framework7Icons-Regular.ttf") format("truetype");
  }
  :global(.f7-icons) {
    font-family: "Framework7 Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 28px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-feature-settings: "liga";
    -moz-font-feature-settings: "liga=1";
    -moz-font-feature-settings: "liga";
    font-feature-settings: "liga";
    text-align: center;
  }

  $bodyMargin: 10px;
  :global(body) {
    margin: 0px;
    padding: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  :global(*),
  :global(*)::before,
  :global(*)::after {
    box-sizing: border-box;
  }
  :root {
    --input-border: #ff3e00;
    --input-focus-h: 245;
    --input-focus-s: 100%;
    --input-focus-l: 42%;
  }
  :global(input) {
    // Capitalized to prevent Sass
    // thinking it's the Sass max()

    font-family: inherit;
    padding: 5px;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 4px;
    transition: 180ms box-shadow ease-in-out;
    &:focus {
      border-color: #ff3e00;
      box-shadow: 0 0 0 3px #ff3e0040;
      outline: 3px solid transparent;
    }
    &:not(textarea) {
      line-height: 1;
    }
    &[type="file"] {
      font-size: 0.9em;
      padding-top: 0.35rem;
    }
    &[readonly] {
      border-style: dotted;
      cursor: not-allowed;
      color: #777;
    }
    &[disabled] {
      --input-border: #ccc;

      background-color: #eee;
      cursor: not-allowed;
    }
  }

  :global(input + label) {
    margin-top: 2rem;
  }

  .PopUpTitleContainer {
    position: sticky;
    top: 0px;
    left: 0px;
    cursor: pointer;
    background-color: #ff3e00;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: $bodyMargin;
    .PopUpTitle {
      color: white !important;
      h2 {
        margin: 0px;
        font-size: 1.25rem;
      }
      h5 {
        margin: 0px;
        font-weight: 400;
      }
    }
  }

  #router {
    padding: $bodyMargin;
  }
</style>
