declare interface todoItem {
  time: string | false;
  course?: string;
  title: string;
  done: boolean;
  sync: {
    todoist: boolean | "update";
  };
  isMoodle: boolean;
  /**
   * Je höher, desto wichtiger.
   * Vetraue nicht dem Todoist Desktop-GUI, wo 1 das wichtigste ist... Das ist falsch!!!
   */
  priority: 1 | 2 | 3 | 4;
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
/**
 * @deprecated
 */
declare type syncStorage = extension.storage.sync;
/**
 * @deprecated
 */
declare type localStorage = extension.storage.local;
/**
 * @deprecated
 */
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

declare interface taskPriorities {
  "1": { color: string; icon: string };
  "2": { color: string; icon: string };
  "3": { color: string; icon: string };
  "4": { color: string; icon: string };
}

declare namespace extension {
  export namespace storage {
    export interface sync {
      usecoloredprogress: boolean;
      showemojicourses: boolean;
      autologinredirect: boolean;
      forcedownload: boolean;
      autodashboardredirect: boolean;
      autologin_untrusted: boolean;
      shortcoursenames: boolean;
      "no-hidden-topics": boolean;
      "todo-prio": taskPriorities;
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

    export interface local {
      courseInfo: { [courseId: string]: CourseTopics };
      downloaded: number[];
      "todoist-oauth-token": string;
      "todoist-project-id": string;
      todos: { [key: string]: todoItem };
      "todos-todoist-lastSynced": number;
      "todos-moodle": { [key: string]: todoItem };
    }
  }

  export interface storage
    extends extension.storage.local,
      extension.storage.sync {}
}
