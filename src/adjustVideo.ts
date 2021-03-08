chrome.storage.sync.get(["biggerVideo"], (val) => {
  var enabled: boolean = val["biggerVideo"] === true;
  console.log("Hello from adjustVid");
  if (enabled) {
    window.addEventListener("load", () => {
      document.querySelectorAll("video.vjs-tech").forEach((item) => {
        console.log(item);
        item.parentElement.style.paddingTop = `min(${
          //@ts-ignore
          (item.parentElement as HTMLElement)
            //@ts-ignore
            .computedStyleMap()
            .get("padding-top").value
        }%, calc(100vh - 50px))`;
        item.parentElement.style.paddingTop = `min(${
          //@ts-ignore
          (item.parentElement as HTMLElement)
            //@ts-ignore
            .computedStyleMap()
            .get("padding-top").value
        }%, -webkit-calc(100vh - 50px))`;
        item.parentElement.parentElement.style.maxWidth = "";
      });
    });

    document.querySelectorAll("video.vjs-tech").forEach((item) => {
      console.log(item);
      item.parentElement.style.paddingTop = `min(${
        //@ts-ignore
        (item.parentElement as any).computedStyleMap().get("padding-top").value
      }%, calc(100vh - 50px))`;
      item.parentElement.style.paddingTop = `min(${
        //@ts-ignore
        (item.parentElement as any).computedStyleMap().get("padding-top").value
      }%, -webkit-calc(100vh - 50px))`;
      item.parentElement.parentElement.style.maxWidth = "";
    });
  }
});
