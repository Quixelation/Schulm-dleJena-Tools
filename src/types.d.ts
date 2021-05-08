type todoType = "video" | "exam" | "ha";
interface todoItem {
  time: string;
  type: "ha" | "exam" | "video";
  title: string;
  done: boolean;
}

interface Activity {
  name: string;
  details: string;
  type: string;
  id: number;
}
interface CourseTopics {
  [sectionId: string]: { name: string; activities: Activity[] };
}

interface syncStorage {
  usecoloredprogress: boolean;
  showemojicourses: boolean;
  autologinredirect: boolean;
  forcedownload: boolean;
  autodashboardredirect: boolean;
  autologin_untrusted: boolean;
  shortcoursenames: boolean;
  "no-hidden-topics": boolean;
  todos: { [key: string]: todoItem };
  fächer: fächer;
  "no-empty-topics": number[];
  reversed_courses: number[];
  removeNavigationBlock: boolean;
  biggerVideo: boolean;
  allowMultipleDownloads: boolean;
  dashboardEmojiFontSize: number;
  sortedCourses: string[];
}

interface localStorage {
  courseInfo: { [courseId: string]: CourseTopics };
  downloaded: number[];
  courseProgress: { [courseId: string]: courseProgress };
}

interface courseProgress {
  all: number;
  completed: number;
}

interface storage extends localStorage, syncStorage {}

interface fach {
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

interface fächer {
  [id: string]: fach;
}
type fachImageTypes =
  | "emoji"
  | "muster"
  | "original"
  | "emoji_muster"
  | "emoji_bg"
  | "bg";
export {
  todoItem,
  todoType,
  fach,
  syncStorage,
  localStorage,
  storage,
  fächer,
  fachImageTypes,
  CourseTopics,
  Activity,
  courseProgress,
};
