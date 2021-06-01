interface course {
  id: number;
  fullname: string;
  shortname: string;
  idnumber: "";
  /**
   * Kurs-Beschreibung: HTML!
   */
  summary: string;
  summaryformat: number;
  startdate: number;
  enddate: number;
  visible: boolean;
  fullnamedisplay: string;
  /**
   * URL zu dem Kurs
   */
  viewurl: string;
  /**
   * Bild des Kurses als data-string
   */
  courseimage: string;
  /**
   * Fortschritt als `number` in Prozent
   */
  progress: number;
  hasprogress: boolean;
  isfavourite: boolean;
  hidden: boolean;
  showshortname: boolean;
  coursecategory: string;
}

declare namespace calData {
  export interface event {
    id: number;
    name: string;
    /**
     * Event-Bescchreibung. HTML!
     */
    description: string;
    /**
     * Auswirkungen unbekannt. War 1
     */
    descriptionformat: number;
    location: string;
    categoryid: unknown;
    groupid: unknown;
    userid: number;
    repeatid: number;
    eventcount: null;
    /**
     * war "mod_assign"
     */
    component: string;
    /**
     * war "assign"
     */
    modulename: string;
    instance: number;
    /**
     * war "due"
     */
    eventtype: string;
    timestart: number;
    timeduration: number;
    timesort: number;
    timeusermidnight: number;
    /**
     * TODO: Überprüfen, ob dieser Union-Type stimmt.
     */
    visible: 0 | 1;
    timemodified: number;
    icon: {
      /**
       * war "icon"
       */
      key: string;
      /**
       * war "assign"
       */
      component: string;
      /**
       * war "Aktivitätstermin"
       */
      alttext: string;
    };
    course: course;
    subscription: {
      displayeventsource: boolean;
    };
    canedit: boolean;
    candelete: boolean;
    /**
     * URL, um das Event zu löschen.
     */
    deleteurl: string;
    /**
     * URL, um das Event zu bearbeiten
     */
    editurl: string;
    /**
     * URL, um das Event anzusehen
     */
    viewurl: string;
    /**
     * Die Zeit, wann dieses Event stattfindet, bereits formatiert und als HTML.
     */
    formattedtime: string;
    isactionevent: boolean;
    iscourseevent: boolean;
    iscategoryevent: boolean;
    groupname: unknown;
    /**
     * war "course"
     */
    normalisedeventtype: string;
    /**
     * Der Formatiere, deutsche Text zu dem Event-Type (Bsp: "Kurstermin").
     */
    normalisedeventtypetext: string;
    /**
     * Die URL, um dieses Event **IN DEM KURS** zu sehen.
     */
    url: string;
    /**
     * `true` bei eintägigen Events
     */
    islastday: boolean;
    /**
     * Bsp: "Surrealismus F: Homeschooling für den 19.04. und 03.05. ist fällig."
     */
    popupname: string;
    mindaytimestamp: number;
    /**
     * Bsp: "Das Fälligkeitsdatum kann nicht früher liegen als der erlaubte Abgabebeginn."
     */
    mindayerror: string;
    maxdaytimestamp: 1621893600;
    /**
     * Bsp: "Der Erinnerungstermin zur Bewertung kann nicht früher liegen als das Fälligkeitsdatum."
     */
    maxdayerror: string;
    draggable: boolean;
  }

  export interface day {
    seconds: number;
    minutes: number;
    hours: number;
    /**
     * Der wievielte Tag des Monats das ist.
     * Beginnt bei 1.
     */
    mday: number;
    /**
     * Was für ein Wochentag das ist.
     * Beginnt bei 0 mit Sonntag!
     *
     * 0 = Sonntag
     * 1 = Montag
     * ...
     */
    wday: number;
    year: number;
    /**
     * Der wievielte Tag im Monat das ist.
     */
    yday: number;
    /**
     * Ist das heute?
     */
    istoday: boolean;
    /**
     * Ist das ein Tag am Wochenende?
     */
    isweekend: boolean;
    timestamp: number;
    neweventtimestamp: number;
    /**
     * URL, um diesen Tag anzusehen.
     */
    viewdaylink: string;
    events: calData.event[];
    /**
     * Gibt es an diesem Tag Events?
     */
    hasevents: boolean;
    calendareventtypes: [];
    previousperiod: number;
    nextperiod: number;
    /**
     * Unbekannt. Hat ein bisschen HTML enthalten. Warscheinlich für das Popup... idk
     */
    navigation: string;
    /**
     * Findet hier der letzte Tag eines Events statt?
     */
    haslastdayofevent: boolean;
    /**
     * Bsp: "Termine am Monday, 3. May"
     */
    popovertitle: string;
    /**
     * Bsp: "Keine Termine, Saturday, 1. May"
     */
    daytitle: string;
  }
  export interface week {
    /**
     * Array, der Indexe der Tage, welche am Anfang nicht mit zum Montag gehören.
     *
     * Beispiel:
     * ```js
     * [0,1,2]
     * ```
     * bedeutet, dass Mo, Di und Mi nicht mit zu diesem Monat gehören
     */
    prepadding: number[];
    /**
     * Array, der Indexe der Tage, welche am Ende nicht mehr mit zum Montag gehören.
     * War aber leer...
     */
    postpadding: unknown;
    days: calData.day[];
  }
  export interface data {
    /**
     * URL für die Kalender-Seite
     */
    url: string;
    /**
     * Unbekannt.... war 1
     */
    courseid: number;
    /**
     * Unbekannt.... war 0
     */
    categoryid: number;
    weeks: calData.week[];
    daynames: [
      {
        dayno: 1;
        shortname: "Mo";
        fullname: "Montag";
      },
      {
        dayno: 2;
        shortname: "Di";
        fullname: "Dienstag";
      },
      {
        dayno: 3;
        shortname: "Mi";
        fullname: "Mittwoch";
      },
      {
        dayno: 4;
        shortname: "Do";
        fullname: "Donnerstag";
      },
      {
        dayno: 5;
        shortname: "Fr";
        fullname: "Freitag";
      },
      {
        dayno: 6;
        shortname: "Sa";
        fullname: "Samstag";
      },
      {
        dayno: 0;
        shortname: "So";
        fullname: "Sonntag";
      },
    ];
    view: "month";
    date: {
      seconds: number;
      minutes: number;
      hours: number;
      mday: number;
      wday: number;
      mon: number;
      year: number;
      yday: number;
      /**
       * Bsp: "Monday"
       */
      weekday: string;
      /**
       * Bsp: "Monday"
       */
      month: string;
      timestamp: number;
    };
    /**
     * Bsp: "May 2021"
     */
    periodname: string;
    includenavigation: true;
    initialeventsloaded: true;
    previousperiod: {
      seconds: number;
      minutes: number;
      hours: number;
      mday: number;
      wday: number;
      mon: number;
      year: number;
      yday: number;
      /**
       * Bsp: "Thursday"
       */
      weekday: string;
      /**
       * Bsp: "April"
       */
      month: string;
      timestamp: number;
    };
    previousperiodlink: "https://moodle.jsp.jena.de/calendar/view.php?view=month&time=1617228000";
    previousperiodname: "April 2021";
    nextperiod: {
      seconds: number;
      minutes: number;
      hours: number;
      mday: number;
      wday: number;
      mon: number;
      year: number;
      yday: number;
      weekday: string;
      /**
       * Bsp: "June"
       */
      month: string;
      timestamp: number;
    };
    /**
     * Bsp: "June 2021"
     */
    nextperiodname: string;
    nextperiodlink: string;
    larrow: "&#x25C4;";
    rarrow: "&#x25BA;";
    defaulteventcontext: 2;
  }
  export type result = [{ error: false; data: calData.data }];
}
