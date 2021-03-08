/**
 * @deprecated
 */
export default function () {
  const dashbaordBreadCrumb = document.createElement("li");
  dashbaordBreadCrumb.innerHTML =
    "<a href='" + location.origin + "/my/' ><b>Dashboard</b></a>";
  dashbaordBreadCrumb.classList.add("breadcrumb-item");
  document
    .querySelector("nav > ol.breadcrumb")
    .children[0].insertAdjacentElement("afterend", dashbaordBreadCrumb);
}
