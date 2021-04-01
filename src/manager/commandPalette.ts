import { storage } from "@/types";
import CommandPal from "./cmdpal";

export default function (params: { options: storage }): void {
  const { options } = params;
  const FächerCmds = [];
  Object.keys(options.fächer).forEach((fachId) => {
    FächerCmds.push({
      name:
        (options.fächer[fachId].short
          ? options.fächer[fachId].short
          : options.fächer[fachId].long) +
        " " +
        options.fächer[fachId].emoji,
      handler: () => (location.href = `/course/view.php?id=${fachId}`),
    });
  });
  const commandPal = new CommandPal({
    hotkey: "ctrl+space",
    commands: [
      {
        name: "Kurs öffnen",
        children: FächerCmds,
      },
      {
        name: "Dashboard öffnen",
        handler: () => (location.href = "/my"),
      },
      {
        name: "Startseite öffnen",
        handler: () => (location.href = "/"),
      },
      {
        name: "Lern-Modus",
        handler: () => {
          document.body.classList.toggle("schulm-dlejena-tools-forgetica");
        },
      },
      {
        name: "Feedback",
        handler: () =>
          (location.href = `mailto:robert.st.stuendl@gmail.com?subject=${encodeURIComponent(
            "fb-smjt: <BETREFF>"
          )}&body=${encodeURIComponent(
            `(Es sind keine Formalitäten notwendig)\n\n\n\nWichtige Infos: (Bitte nicht entfernen)\nVersion: ${
              chrome.runtime.getManifest().version
            }\nVersionName: ${
              chrome.runtime.getManifest().version_name
            }\nuser-agent: ${navigator.userAgent}\n\n`
          )}`),
      },
      {
        name: "Wiki öffnen",
        handler: () => window.open("http://smjt.vercel.app/wiki", "_newtab"),
      },
    ],
  });
  commandPal.start();
}
