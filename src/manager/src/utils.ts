function getIdFromLink(link: string): string {
  return link.slice(link.indexOf("id=") + 3);
}
function replaceSpecialChars(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
export { getIdFromLink, replaceSpecialChars };
