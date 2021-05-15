declare namespace todoist {
  export interface task {
    assignee: number;
    assigner: number;
    comment_count: number;
    completed: boolean;
    content: string;
    description: string;
    due: {
      /**
       * YYYY-MM-DD
       */
      date: string;
      /**
       * ISO Format
       */
      datetime: string;
      recurring: boolean;
      /**
       * human readable
       */
      string: string;
      timezone: string;
    };
    id: number;
    label_ids: number[];
    order: number;
    priority: 1 | 2 | 3 | 4;
    project_id: number;
    section_id: number;
    parent_id: number;
    url: string;
  }
}
