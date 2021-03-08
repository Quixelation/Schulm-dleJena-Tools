<script lang="ts">
  import { addCourse, findCourses } from "./../ts/courses";
  import Button from "./../Button.svelte";
  import { createEventDispatcher } from "svelte";
  import AutoDetectInfoInterface from "./../coursesAutoDetect.svelte";
  let detectedCourses: {
    name: string;
    id: number;
  }[] = [];
  let currentCourse = 0;
  let page = "start";

  let nextCourse = () => {
    currentCourse++;
    if (currentCourse === detectedCourses.length) {
      page = "end";
    } else {
      page = "input";
    }
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    console.log(tab[0]);

    chrome.tabs.sendMessage(tab[0].id, { text: "report_back" }, (val) => {
      const detec = findCourses(val);

      detectedCourses = detec;

      console.log(detec);
    });
  });

  import BackBtn from "./../backBtn.svelte";
  import { fach } from "@shared/types";

  function saveHandler(data: fach, id: string) {
    console.log("Getting", data, id);
    addCourse(data, id).then(() => {
      nextCourse();
    });
  }
</script>

<progress
  style="width: 100%;"
  value={currentCourse}
  max={detectedCourses.length - 1}
  min="0"
/>
<AutoDetectInfoInterface
  id={detectedCourses ? detectedCourses[currentCourse]?.id : null}
  longName={detectedCourses ? detectedCourses[currentCourse]?.name : null}
  on:save={(e) => {
    //@ts-ignore
    saveHandler(e.detail.data, e.detail.id);
  }}
  showIgnore={true}
/>

<style lang="scss">
</style>
