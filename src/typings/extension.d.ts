interface todoItem {
  isMoodle: boolean;
  time: string | false;
  course?: todoItemCourse;
  title: string;
  done: boolean;
  sync: {
    todoist: boolean | null;
  };
  /**
   * Je höher, desto wichtiger.
   * Vetraue nicht dem Todoist Desktop-GUI, wo 1 das wichtigste ist... Das ist falsch!!!
   */
  priority: 1 | 2 | 3 | 4;
  deleted: boolean;
  moodleUrl?: string;
}

/**
 * Nur für den TodoManager --> todoItem
 */
interface todoItemCourse extends fach {
  id?: number;
  /**
   * Wurde dies durch das Skript hinzugefügt (true) oder durch den benutzer (false)
   */
  auto: boolean;
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
  interface courseProgress {
    all: number;
    completed: number;
  }
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
      alwaysShowCustomProgress: boolean;
    }

    export interface local {
      courseInfo: { [courseId: string]: CourseTopics };
      downloaded: number[];
      "todoist-oauth-token": string;
      "todoist-project-id": string;
      todos: { [key: string]: todoItem };
      "todos-todoist-lastSynced": number;
      "todoist-active": boolean;
      "todos-moodle": { [key: string]: todoItem };
      "todo-close-on-complete": boolean;
      courseProgress: { [courseId: string]: courseProgress | false };
      lastSeenWhatsNew: string | null;
    }
  }

  export interface storage
    extends extension.storage.local,
      extension.storage.sync {}
}
