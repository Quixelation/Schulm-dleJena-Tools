export default function prependNavBarButtons() {
  document.querySelector(".site-name").innerHTML += `
  <span style="font-size: 0.75rem; display: block;margin-top: -4px; color: grey;">Tools aktiv!</span>
`;
  function createNavBarButton(text: string, link: string) {
    const buttonContainer = document.createElement("li");
    buttonContainer.classList.add("nav-item");

    const button = document.createElement("a");
    button.classList.add("btn", "btn-secondary");
    button.innerHTML = text;
    button.href = link;
    buttonContainer.append(button);

    return buttonContainer;
  }
  const NavBar = document.querySelector(".navbar-nav.d-none.d-md-flex");
  NavBar.prepend(
    createNavBarButton(
      '<i class="icon fa fa-tachometer fa-fw"></i>Dashboard',
      location.origin + "/my/"
    )
  );
}
