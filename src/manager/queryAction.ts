const actions = {
  "todoist-loggedin": function () {
    alert("Authentifizierung bei Todoist war erfolgreich!");
  },
};

export default function (): void {
  actions[new URL(location.href).searchParams.get("action")]?.();
}
