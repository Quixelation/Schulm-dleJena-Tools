function getIdFromLink(link: string) {
  return link.slice(link.indexOf("id=") + 3);
}

export { getIdFromLink };
