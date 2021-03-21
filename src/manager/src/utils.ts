function getIdFromLink(link: string) {
  return link.slice(link.indexOf("id=") + 3);
}
function replaceSpecialChars(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
export { getIdFromLink, replaceSpecialChars };
