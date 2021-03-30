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
  {#each [{ name: "Allgemein", href: "/functions/allgemein" }, { name: "Downloader", href: "/functions/downloader", name: "Kurse", href: "/functions/kurse" }, { name: "Dashboard", href: "/functions/dashboard" }, { name: "Login", href: "/functions/login" }] as FunktionenItem}
    <div
      on:click={() => push(FunktionenItem.href)}
      class:active={$location === FunktionenItem.href}
      class="sidebar_item section_item"
    >
      {FunktionenItem.name}
    </div>
  {/each}
</div>

<style>
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
    font-weight: 600;
    color: grey;
  }
  .section_item {
    margin-left: 15px;
    padding: 10px;
    padding-left: 15px;
    border-radius: 5px;
    margin-top: 2.5px;
    transition: background-color 0.1s ease, color 0.1s ease, transform 0.1s ease;
    cursor: pointer;
  }
  .section_item:hover,
  .section_item:focus {
    background-color: #ff3e0080;
  }
  .section_item:active {
    transform: translateY(1px);
  }
  .section_item.active {
    background-color: #ff3e00cc;
    color: white;
    transition: background-color 0.25s ease;
  }
</style>
