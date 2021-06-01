export default function (params: { options: storage }): void {
  const { options } = params;
  const url = location;
  let id: number | true;
  if (url.pathname.slice(0, "/pluginfile.php/".length) == "/pluginfile.php/") {
    id = parseInt(
      url.pathname.slice(
        "/pluginfile.php/".length,
        "/pluginfile.php/".length +
          url.pathname.slice("/pluginfile.php/".length).indexOf("/"),
      ),
    );
  } else {
    id = true;
  }
  if (
    options["forcedownload"] === true &&
    (id === true
      ? true
      : options["downloaded"].includes(id)
      ? options["allowMultipleDownloads"]
      : true)
  ) {
    chrome.storage.local.get("downloaded", ({ downloaded }) => {
      downloaded.push(id);
      chrome.storage.local.set({ downloaded });
    });
    const forceDownload = "forcedownload=1";
    location.search = forceDownload;
  }
}
