import { storage } from "@shared/types";
/**
 * Verhindert den forceDownload für Dokumente in Aufgaben-Seiten
 *
 * Diese Dokumente können so, in einem neuen Tab
 * geöffnet werden und trotzdem durch den Download-Manager
 * heruntergeladen werden
 */
export default function (params: { options: storage }): void {
  const { options } = params;
  //TODO: Add & Check for Feature Flag
  document
    .querySelectorAll(".fileuploadsubmission a[target='_blank']")
    .forEach((elem: HTMLAnchorElement) => {
      elem.href = elem.href.replace("forcedownload=1", "");
    });
}
