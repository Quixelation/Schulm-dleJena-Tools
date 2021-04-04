interface htmlBuilderArgs<optionsGen> {
  class?: string[] | string;
  style?: string;
  options?: optionsGen;
  // Im just guessing here
  onclick?: (e: EventInit) => void;
  id?: string;
}
interface htmlSingleContainerBuilderArgs<T> extends htmlBuilderArgs<T> {
  child: HTMLElement;
}
interface htmlMultiContainerBuilderArgs<T> extends htmlBuilderArgs<T> {
  children?: HTMLElement[];
}

interface htmlTextBuilderArgs<Tl> extends htmlBuilderArgs<Tl> {
  text: string;
}

function applyOptions(
  args: htmlSingleContainerBuilderArgs<{
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    [key: string]: any;
  }>,
): HTMLElement {
  if (args.style != null) {
    args.child.setAttribute(
      "style",
      (args.child.getAttribute("style") != null
        ? args.child.getAttribute("style") + " "
        : "") + args.style,
    );
  }
  if (args.class != null) {
    if (typeof args.class === "string") {
      args.child.classList.add(args.class);
    } else {
      args.class.forEach((className) => {
        args.child.classList.add(className);
      });
    }
  }
  if (args.onclick != null) {
    args.child.addEventListener("click", args.onclick);
  }
  if (args.id) {
    args.child.id = args.id;
  }
  return args.child;
}
function horizFlex(
  args: htmlMultiContainerBuilderArgs<undefined>,
): HTMLElement {
  const horizFlexItem = document.createElement("div");
  horizFlexItem.style.display = "flex";
  horizFlexItem.style.flexDirection = "row";

  args.children.forEach((item) => {
    horizFlexItem.append(item);
  });
  return applyOptions({
    ...args,
    child: horizFlexItem,
  });
}
function vertFlex(args: htmlMultiContainerBuilderArgs<undefined>): HTMLElement {
  const horizFlexItem = document.createElement("div");
  horizFlexItem.style.display = "flex";
  horizFlexItem.style.flexDirection = "column";

  args.children.forEach((item) => {
    if (item !== null) horizFlexItem.append(item);
  });
  return applyOptions({
    ...args,
    child: horizFlexItem,
  });
}

function container(
  args: htmlMultiContainerBuilderArgs<undefined>,
): HTMLElement {
  const horizFlexItem = document.createElement("div");

  args.children.forEach((item) => {
    horizFlexItem.append(item);
  });
  return applyOptions({
    ...args,
    child: horizFlexItem,
  });
}

function icon(args: htmlBuilderArgs<{ icon: string }>): HTMLElement {
  const elem = document.createElement("i");

  elem.classList.add("icon", "fa", `fa-${args.options.icon}`, "fw");
  return applyOptions({
    ...args,
    child: elem,
  });
}

function link(
  args: htmlMultiContainerBuilderArgs<{ href: string }>,
): HTMLElement {
  const elem = document.createElement("a");
  elem.href = args.options.href;
  args.children.forEach((item) => {
    elem.append(item);
  });
  return applyOptions({
    ...args,
    child: elem,
  });
}
function span(args: htmlTextBuilderArgs<null>): HTMLElement {
  const elem = document.createElement("span");

  elem.innerHTML = args.text;

  return applyOptions({
    ...args,
    child: elem,
  });
}

/**
 *
 * @deprecated use Heading with type `h5` instead
 * @param args
 * @returns
 */
function h5(args: htmlTextBuilderArgs<null>): HTMLElement {
  const elem = document.createElement("h5");

  elem.innerHTML = args.text;

  return applyOptions({
    ...args,
    child: elem,
  });
}

function bold(args: htmlTextBuilderArgs<null>): HTMLElement {
  const elem = document.createElement("b");

  elem.innerHTML = args.text;

  return applyOptions({
    ...args,
    child: elem,
  });
}

function Heading(
  args: htmlTextBuilderArgs<{ type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }>,
): HTMLElement {
  if (args.options?.type == null) {
    if (args.options == null) {
      args.options = { type: "h1" };
    } else {
      args.options.type = "h1";
    }
  }

  const elem = document.createElement(args.options.type);

  elem.innerHTML = args.text;

  return applyOptions({
    ...args,
    child: elem,
  });
}

function cardButton(
  args: htmlMultiContainerBuilderArgs<{
    link: string;
    text: string;
    icon: string;
  }>,
): HTMLElement {
  return applyOptions({
    ...args,
    child: link({
      class: ["card", "block", "btn", "btn-secondary", "mb-3", "p-3"],
      style: "width: 100%; display: block; color: #0f6fc5; text-align: left",
      options: {
        href: args.options.link,
      },
      children: [
        icon({
          options: {
            icon: args.options.icon,
          },
        }),
        bold({
          text: args.options.text,
        }),
      ],
    }),
  });
}
function button(
  args: htmlSingleContainerBuilderArgs<{
    /**
     * @deprecated
     */
    onclick?: (MouseEvent: MouseEvent) => void;
    type?: "primary" | "secondary";
  }>,
): HTMLElement {
  args.options.type = args.options.type ?? "primary";
  const button = document.createElement("button");
  button.classList.add("btn", `btn-${args.options.type}`);
  button.onclick = args.options.onclick;
  button.appendChild(args.child);
  return applyOptions({
    ...args,
    child: button,
  });
}

function card(args: htmlSingleContainerBuilderArgs<null>): HTMLElement {
  const sectionElem = document.createElement("section");
  sectionElem.classList.add("block", "card", "mb-3");
  const body = document.createElement("div");
  body.classList.add("card-body", "p-3");
  body.append(args.child);
  sectionElem.append(body);

  return applyOptions({
    ...args,
    child: sectionElem,
  });
}

function freeVerticalSpace(
  args: htmlBuilderArgs<{ height: string }>,
): HTMLElement {
  return applyOptions({
    ...args,
    child: container({
      style: "height: " + args.options.height,
      children: [],
    }),
  });
}

export {
  container,
  horizFlex,
  vertFlex,
  bold,
  cardButton,
  link,
  icon,
  card,
  span,
  freeVerticalSpace,
  button,
  h5,
  Heading,
};
