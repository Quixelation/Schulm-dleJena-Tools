import axios from "axios";
import Swal from "sweetalert2";

const actions = {
  "todoist-loggedin": async function () {
    await Swal.fire({
      titleText: "Todoist Integration",

      allowEnterKey: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      text: "In welcher Liste sollen wir die Daten speichern? Wenn du noch keine hast können wir auch eine erstellen.",

      input: "select",
      inputOptions: new Promise((resolve, reject) => {
        chrome.storage.local.get(["todoist-oauth-token"], (storageValues) => {
          axios
            .get("https://api.todoist.com/rest/v1/projects", {
              headers: {
                Authorization: `Bearer ${storageValues["todoist-oauth-token"]}`,
              },
            })
            .then((response) => {
              const output = {
                new: "[Neue Liste erstellen]",
              };
              (response.data as Array<any>).forEach((projectItem) => {
                output[projectItem.id] = projectItem.name;
              });
              resolve(output);
            });
        });
      }),
      inputPlaceholder: "Wähle eine Liste oder [Neue Liste erstellen] aus.",

      inputValidator: (value) => {
        if (!value) {
          return "Bitte wähle eine Option!";
        }
      },
      preConfirm: (data) =>
        new Promise((resolve, reject) => {
          console.log(data);
          if (data === "new") {
            chrome.storage.local.get(
              ["todoist-oauth-token"],
              (storageValues) => {
                axios
                  .post(
                    "https://api.todoist.com/rest/v1/projects",
                    {
                      name: "SchulmoodleJena",
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${storageValues["todoist-oauth-token"]}`,
                      },
                    },
                  )
                  .then(
                    (response) => {
                      chrome.storage.local.set(
                        { "todoist-project-id": response.data.id },
                        () => {
                          resolve({ new: true });
                        },
                      );
                    },
                    (err) => {
                      alert(
                        "Es gab einen Fehler! Möglicherweise gibt es schon ein Projekt mit dem Namen 'SchulmoodleJena'?",
                      );
                      alert(err);
                    },
                  );
              },
            );
          } else {
            //TODO: Import the Data
            chrome.storage.local.set({ "todoist-project-id": data }, () => {
              resolve({ new: false });
            });
          }
        }),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          allowEnterKey: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          title: `Todoist Integration einsatzbereit`,
          text: ((): string => {
            /*eslint-disable-next-line*/
            //@ts-ignore
            if (result.value.new === true) {
              return "Wir haben die Liste 'SchulmoodleJena' erstellt. Diese Liste kann umbenannt und verschoben werden.";
            } else {
              return "Wir benutzen deine existierende Liste. Diese kann immernoch umbenannt und verschoben werden.";
            }
          })(),
        }).then(() => {
          const url = new URL(location.href);
          url.searchParams.delete("action");
          location.href = url.href;
        });
      }
    });
  },
};

export default function (): void {
  actions[new URL(location.href).searchParams.get("action")]?.();
}
