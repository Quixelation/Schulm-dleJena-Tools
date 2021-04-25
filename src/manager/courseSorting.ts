export default function (): void {
  const sortingDropdownButton = document.getElementById("sortingdropdown");

  sortingDropdownButton.nextElementSibling.appendChild(
    createDropdownListItem(
      "Fortschritt",
      "smjt-progress",
      "Kurse nach Fortschritt sortieren",
    ),
  );
}

function createDropdownListItem(
  /**
   * Der Anzeige-Name
   */
  name: string,
  /**
   * Der "CodeName" der Sortierung.
   *
   * wird als data-sort für den CoursesContainer verwendet
   */
  value: string,
  /**
   * aria-label
   */
  label: string,
  /**
   * @deprecated
   */
  selected = false,
) {
  const anchorItem = document.createElement("a");
  anchorItem.classList.add("dropdown-item");
  anchorItem.setAttribute("aria-current", String(selected));
  anchorItem.setAttribute("aria-label", label);
  anchorItem.setAttribute("aria-value", value);
  anchorItem.innerText = name;
  anchorItem.href = "#";

  const listItem = document.createElement("li");
  listItem.appendChild(anchorItem);

  return listItem;
}
