<script>
  import Icon from "./../../assets/icon.png";
  import { push, location } from "svelte-spa-router";
</script>

<div class="sidebar">
  <div on:click={() => push("/")} class="sidebarLogoContainer">
    <img src={Icon} alt="SchulmoodleJenaToosl Logo" style="width: 50%" />
    <h3 style="font-weight: 400; font-size: 18px">
      Schulm**dleJena
      <br />Tools
    </h3>
  </div>
  <span class="sidebar_item section_title "> Funktionen </span>
  {#each [{ name: "Allgemein", href: "/functions/allgemein" }, { name: "Downloader", href: "/functions/downloader" }, { name: "Kurse", href: "/functions/kurse" }, { name: "Dashboard", href: "/functions/dashboard" }, { name: "Login", href: "/functions/login" }] as FunktionenItem}
    <div
      on:click={() => push(FunktionenItem.href)}
      class:active={$location === FunktionenItem.href}
      class="sidebar_item section_item"
    >
      {FunktionenItem.name}
    </div>
  {/each}
  <span class="sidebar_item section_title "> Kurse </span>
  <div
    on:click={() => push("/editCourses/allCourses")}
    class:active={$location.startsWith("/editCourses/")}
    class="sidebar_item section_item"
  >
    Kurse bearbeiten
  </div>
  <span class="sidebar_item section_title "> Info </span>
  {#each [{ name: "Über", href: "/info/ueber" }, { name: "Lizensen", href: "/info/lizensen" }] as FunktionenItem}
    <div
      on:click={() => push(FunktionenItem.href)}
      class:active={$location === FunktionenItem.href}
      class="sidebar_item section_item"
    >
      {FunktionenItem.name}
    </div>
  {/each}
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    margin: 5px;
    margin-right: 50px;
    position: sticky;
    padding-bottom: 5px;
  }
  .sidebarLogoContainer {
    display: grid;
    grid-template-columns: auto auto;
    place-items: center;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .sidebar_item {
    display: block;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .section_title {
    text-transform: uppercase;
    margin-left: 15px;
    margin-top: 25px;
    font-weight: 600;
    color: grey;
  }
  .section_item {
    margin-left: 15px;
    padding: 10px;
    padding-left: 15px;
    border-radius: 5px;
    margin-top: 2.5px;
    transition: background-color 0.1s ease, color 0.1s ease,
      box-shadow 0.1s ease, transform 0.1s ease;
    cursor: default;
    margin-bottom: 2.5px;
    border: 1px solid transparent;
  }
  .section_item:not(.active) {
    cursor: pointer;
    border-color: #e6e6e6;
  }
  .section_item:not(.active):hover,
  .section_item:not(.active):focus {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .section_item:active {
    transform: translateY(1px);
    //background-color: #ff3e0080;
  }
  .section_item.active {
    background-color: #ff3e00cc;
    color: white;
    transition: background-color 0.25s ease;
  }
</style>
