declare namespace Moodle {
  export interface course {
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

  export interface config {
    cfg: {
      /**
       * example-value: `admin`
       */
      admin: string;
      contextid: number;
      iconsystemmodule: string;
      jsrev: string;
      langrev: number;
      sessiontimeout: string;
      sesskey: string;
      slasharguments: number;
      svgicons: boolean;
      templaterev: string;
      theme: string;
      themerev: string;
      usertimezone: string;
      wwwroot: string;
    };
  }
}
