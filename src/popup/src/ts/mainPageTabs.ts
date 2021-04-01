type pageValues = "main" | "info" | "courses";
let page: pageValues = "main";
function setPage(value: pageValues): void {
  page = value;
}
export { page, setPage };
