export default function prependNavBarButtons(): void {
  document.querySelector(".site-name").innerHTML += `
  <span style="font-size: 0.75rem; display: block;margin-top: -4px; color: grey;">Tools aktiv!</span>
`;
  function createNavBarButton(
    text: string,
    link: string,
    margin?: true,
    blank?: true,
  ) {
    const buttonContainer = document.createElement("li");
    buttonContainer.classList.add("nav-item");

    const button = document.createElement("a");
    button.classList.add("btn", "btn-secondary");
    button.innerHTML = text;
    button.href = link;
    if (blank) button.target = "_blank";
    buttonContainer.append(button);
    if (margin) buttonContainer.style.marginLeft = "8px";
    return buttonContainer;
  }
  const NavBar = document.querySelector(".navbar-nav.d-none.d-md-flex");
  NavBar.prepend(
    createNavBarButton(
      `<img style="height: 20px;" src="${chrome.runtime.getURL(
        "icons/icon.png",
      )}" /> Wiki`,
      "https://smjt.robertstuendl.com/wiki",
      true,
      true,
    ),
  );
  NavBar.prepend(
    createNavBarButton(
      '<i class="icon fa fa-tachometer fa-fw"></i>Dashboard',
      location.origin + "/my/",
    ),
  );
}
