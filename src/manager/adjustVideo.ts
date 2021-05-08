import { storage } from "@shared/types";

export default function (params: { options: storage }): void {
  const { options } = params;
  const enabled: boolean = options["biggerVideo"] === true;
  console.log("Hello from adjustVid");
  if (enabled) {
    window.addEventListener("load", () => {
      console.log("loaded");
      makeVidBigger();
    });
  }
}
function makeVidBigger(): void {
  document.querySelectorAll("video.vjs-tech").forEach((item) => {
    console.log(item);
    item.parentElement.style.paddingTop = `min(${
      (item.parentElement as HTMLElement)
        /* eslint-disable-next-line */
        //@ts-ignore
        .computedStyleMap()
        .get("padding-top").value
    }%, calc(100vh - 50px))`;
    item.parentElement.style.paddingTop = `min(${
      (item.parentElement as HTMLElement)
        /* eslint-disable-next-line */
        //@ts-ignore
        .computedStyleMap()
        .get("padding-top").value
    }%, -webkit-calc(100vh - 50px))`;
    item.parentElement.parentElement.style.maxWidth = "";
  });
}
