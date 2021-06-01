import { manageProgressbar } from "./DashboardCourses";

export default function (params: { options: extension.storage }): void {
  const { options } = params;
  checkProgress(
    document.body.innerHTML,
    new URL(location.href).searchParams.get("id"),
  );
}

function checkProgress(
  html: string,
  courseId: string,
): Promise<extension.courseProgress | false> {
  return new Promise((resolve) => {
    const docContainer = document.createElement("body");
    docContainer.innerHTML = html;
    //TODO: Manage TIles-View (better)
    let result: extension.courseProgress | false;
    if (docContainer.querySelector(".course-content ul.topics") !== null) {
      const completionCheckboxes = docContainer.querySelectorAll(
        ".togglecompletion  input[name='completionstate']",
      );
      let completedAssignments = 0;
      completionCheckboxes.forEach((item: HTMLInputElement) => {
        if (item.value === "0") {
          completedAssignments++;
        }
      });
      result = {
        all: completionCheckboxes.length,
        completed: completedAssignments,
      };
    } else {
      result = false;
    }

    console.log(result);

    chrome.storage.local.get(["courseProgress"], (values: localStorage) => {
      const { courseProgress } = values;
      courseProgress[courseId] = result;
      chrome.storage.local.set(
        {
          courseProgress: courseProgress,
        },
        () => {
          resolve(result);
        },
      );
    });
  });
}

function calculateProgressPercentage(
  courseProgress: extension.courseProgress,
): number {
  const result = (100 * courseProgress.completed) / courseProgress.all;
  return isNaN(result) ? 0 : result;
}

function homepageCourseProgessChecker(html: string, courseId: string): void {
  checkProgress(html, courseId).then((progressData) => {
    console.log("progressData", progressData);
    //TODO: Listen-Ansicht unterstützen
    if (progressData !== false) {
      manageProgressbar(courseId, calculateProgressPercentage(progressData));
    }
  });
}

export {
  checkProgress,
  calculateProgressPercentage,
  homepageCourseProgessChecker,
};
