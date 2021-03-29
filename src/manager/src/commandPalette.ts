import { storage } from "@shared/types";
import CommandPal from "./cmdpal";

export default function (params: { options: storage }) {
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
  var commandPal = new CommandPal({
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
    ],
  });
  commandPal.start();
}
