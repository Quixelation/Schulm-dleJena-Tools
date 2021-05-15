export default function (
  scripts: {
    match?: string | boolean | ((options: storage) => boolean);
    script: (params: { options: storage }) => void;
  }[],
): void {
  const syncStorage: Promise<syncStorage> = new Promise((resolve) => {
    chrome.storage.sync.get(null, resolve);
  });
  const localStorage: Promise<localStorage> = new Promise((resolve) => {
    chrome.storage.local.get(null, resolve);
  });

  Promise.all([syncStorage, localStorage]).then((values) => {
    const options: storage = { ...values[0], ...values[1] };

    scripts.forEach((script) => {
      /*eslint-disable-next-line*/

      if (
        script.match === null ||
        (() => {
          switch (typeof script.match) {
            case "boolean":
              return script.match;
            case "string":
              return location.pathname.includes(script.match);
            case "function":
              return script.match(options);
            default:
              return false;
          }
        })()
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
