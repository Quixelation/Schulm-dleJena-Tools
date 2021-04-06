<script lang="ts">
  import ActiveIndicator from "./../activeIndicator.svelte";
  import { page as _page, setPage } from "./../ts/mainPageTabs";
  let page = _page;
  import { push, pop, replace } from "svelte-spa-router";
  import CoursesPage from "./coursesPage.svelte";
  import { goToUrl } from "src/ts/communication";
</script>

<div class="flexContainer">
  <div class="TabsMenu">
    <div
      class="TabsMenuItem"
      class:active={page === "main"}
      on:click={() => {
        setPage("main");
        page = "main";
      }}
    >
      <i class="material-icons ">settings</i>
    </div>
    <div
      class="TabsMenuItem"
      class:active={page === "courses"}
      on:click={() => {
        setPage("courses");
        page = "courses";
      }}
    >
      <i class="material-icons ">school</i>
    </div>
    <div
      class="TabsMenuItem"
      class:active={page === "info"}
      on:click={() => {
        setPage("info");
        page = "info";
      }}
    >
      <i class="material-icons ">info</i>
    </div>
  </div>
  <div
    class="linkList"
    style="max-height: 471px; overflow: auto; margin: -10px; padding: 10px; margin-top: 0px; padding-top: 0px;"
  >
    {#if page === "main"}
      <h1>Funktionen</h1>
      <div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/functions");
          }}
        >
          <div class="text">Allgemein</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/downloadSettings");
          }}
        >
          <div class="text">Downloader</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/courseSettings");
          }}
        >
          <div class="text">Kurse</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/dashboardSettings");
          }}
        >
          <div class="text">Dashboard</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/loginSettings");
          }}
        >
          <div class="text">Login</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <ActiveIndicator />
    {:else if page == "courses"}
      <div style="margin: -10px; padding: 10px;">
        <CoursesPage />
      </div>
    {:else if page === "info"}
      <h1>Weiteres</h1>
      <div>
        <!-- <div
          class="linkListItem"
          on:click={() => {
            push("/courses");
          }}
        >
          <div class="text">Gespeicherte Kurse</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div> -->
        <div
          class="linkListItem"
          on:click={() => {
            push("/info");
          }}
        >
          <div class="text">Info</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            chrome.tabs.create({
              url: "https://smjt.vercel.app/licenses.html",
            });
          }}
        >
          <div class="text">Lizensen</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/devStorage");
          }}
        >
          <div class="text">Entwickler: Sync Speicher</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          class="linkListItem"
          on:click={() => {
            push("/localStorage");
          }}
        >
          <div class="text">Entwickler: Lokaler Speicher</div>
          <div class="icon">
            <svg
              width="11px"
              height="11px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>prime</title>
              <g
                id="880b5b52-5578-436c-a64a-10a281e56ea6"
                data-name="Arrow Left"
              >
                <path
                  d="M7.77,23.58l-2.24-2a0.5,0.5,0,0,1,0-.71L13.43,12,5.5,3.13a0.5,0.5,0,0,1,0-.71l2.24-2a0.5,0.5,0,0,1,.71,0L18.8,12,8.48,23.54A0.5,0.5,0,0,1,7.77,23.58Z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    {:else}
      404 - PAGE NOT FOUND
    {/if}
  </div>
</div>

<style lang="scss">
  .flexContainer {
    display: grid;
    grid-template-rows: 39px 1fr;
    .linkList {
      display: flex;
      flex-direction: column;
      .linkListItem {
        cursor: pointer;
        padding: {
          left: 5px + 10px;
          right: 5px + 10px;
        }
        height: 45px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        width: -webkit-fill-available;
        margin-left: -10px;
        margin-right: -10px;
        .text {
          margin-right: 10px;
          font-size: 14px;
          position: relative;
          text-decoration: none;
          color: #172128;

          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0.1em;
            min-height: 1px;
            background-color: currentColor;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.25s ease;
          }
        }
        &:hover {
          .text:after {
            transform: scaleX(1);
          }
        }
        .icon {
          color: #172128;
        }
        border-top: solid 0.75px rgb(172, 172, 172);
        &:last-of-type {
          border-bottom: solid 0.75px rgb(172, 172, 172);
        }
      }
    }
    .TabsMenu {
      position: sticky;
      top: -10px;
      z-index: 9;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 2.5px 0px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      padding: {
        left: 5px + 10px;
        right: 5px + 10px;
      }
      margin-top: -10px;
      margin-left: -10px;
      margin-right: -10px;
      .TabsMenuItem {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        cursor: pointer;
        width: 100%;
        text-align: center;
        transition: 0.25s ease box-shadow, 0.25s ease transform;
        &:hover {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        &:active {
          transform: translateY(1px) translateZ(0);
        }
        &.active {
          background-color: #fd7c53;
          color: white;

          // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) inset,
          //   0 1px 2px rgba(0, 0, 0, 0.24) inset;
        }
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #efefef;
        border-radius: 7.5px;
        margin: 5px;
        box-sizing: border-box;
      }
    }
  }
</style>
