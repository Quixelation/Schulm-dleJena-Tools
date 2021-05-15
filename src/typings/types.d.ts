declare type todoType = "video" | "exam" | "ha";
declare interface todoItem {
  time: string;
  color: string;
  label: string[];
  title: string;
  done: boolean;
  integration: "user" | "moodle" | "todoist";
}

declare interface Activity {
  name: string;
  details: string;
  type: string;
  id: number;
}
declare interface CourseTopics {
  [sectionId: string]: { name: string; activities: Activity[] };
}

declare interface syncStorage {
  usecoloredprogress: boolean;
  showemojicourses: boolean;
  autologinredirect: boolean;
  forcedownload: boolean;
  autodashboardredirect: boolean;
  autologin_untrusted: boolean;
  shortcoursenames: boolean;
  "no-hidden-topics": boolean;
  //TODO: Todoist types
  todos: { [key: string]: todoItem };
  fächer: fächer;
  "no-empty-topics": number[];
  reversed_courses: number[];
  removeNavigationBlock: boolean;
  biggerVideo: boolean;
  allowMultipleDownloads: boolean;
  dashboardEmojiFontSize: number;
  sortedCourses: string[];
  tilesToList: boolean;
}

declare interface localStorage {
  courseInfo: { [courseId: string]: CourseTopics };
  downloaded: number[];
  "todoist-oauth-token": string;
  "todoist-project-id": string;
}

declare interface storage extends localStorage, syncStorage {}

declare interface fach {
  /**
   * Der lange Name des Kurses
   */
  long: string;
  /**
   * Der kurze Name des Kurses
   */
  short: string;
  emoji: string;
  imageType: fachImageTypes;
  color: string;
}

declare interface fächer {
  [id: string]: fach;
}
declare type fachImageTypes =
  | "emoji"
  | "muster"
  | "original"
  | "emoji_muster"
  | "emoji_bg"
  | "bg";
