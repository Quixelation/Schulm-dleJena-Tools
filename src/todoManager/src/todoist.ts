import axios from "axios";

function createTask(data: {
  content: string;
  description?: string;
  priority?: 1 | 2 | 3 | 4;
  /**
   * format: UTC
   */
  due_datetime?: string;
}) {
  chrome.storage.local.get(["todoist-project-id"], (values) => {
    axios.post("https://api.todoist.com/rest/v1/tasks", {
      project_id: values["todoist-project-id"],
      ...data,
    });
  });
}
