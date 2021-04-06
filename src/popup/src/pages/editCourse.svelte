<script lang="ts">
  import CoursesAutoDetect from "./../coursesAutoDetect.svelte";
  import { fach } from "@shared/types";
  import { pop } from "svelte-spa-router";
  import { editCourse, getRegisteredCourses } from "../ts/courses";

  export let params: { id?: string } = {};
  let course: fach = null;
  let error = null;
  getRegisteredCourses().then((val) => {
    if (Object.keys(val).includes(params.id)) {
      course = val[params.id];
    } else {
      error = "Kurs nicht gefunden!";
    }
  });
  function saveHandler(data: { data: fach; id: string }) {
    editCourse(data.data, data.id, pop);
  }
</script>

{#if course}
  <CoursesAutoDetect
    data={course}
    id={params.id}
    on:save={(e) => {
      //@ts-ignore
      saveHandler(e.detail);
    }}
  />
{/if}
