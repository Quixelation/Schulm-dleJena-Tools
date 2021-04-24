import {
  storage,
  syncStorage as syncStorageType,
  localStorage as localStorageType,
} from "@/types";

export default function (
  scripts: {
    match?: string | boolean;
    script: (params: { options: storage }) => void;
  }[],
): void {
  const syncStorage: Promise<syncStorageType> = new Promise((resolve) => {
    chrome.storage.sync.get(null, resolve);
  });
  const localStorage: Promise<localStorageType> = new Promise((resolve) => {
    chrome.storage.local.get(null, resolve);
  });

  Promise.all([syncStorage, localStorage]).then((values) => {
    const options: storage = { ...values[0], ...values[1] };

    scripts.forEach((script) => {
      if (
        script.match === null ||
        (typeof script.match === "string"
          ? location.pathname.includes(script.match)
          : script.match)
      ) {
        Promise.resolve()
          .then(() => {
            script.script({ options });
          })
          .catch((e) => {
            console.warn(e);
          });
      }
    });
  });
}
