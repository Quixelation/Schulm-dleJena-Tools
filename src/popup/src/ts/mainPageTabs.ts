type pageValues = "main" | "info" | "courses";
let page: pageValues = "main";
function setPage(value: pageValues) {
  page = value;
}
export { page, setPage };
