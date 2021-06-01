function padding(
  text: string,
  desiredLength: number,
  paddingChar: string,
): string {
  const currentLength = text.length;
  const needToAdapt = desiredLength - currentLength;
  let newText = "";
  if (needToAdapt > 0) {
    let padding = "";
    for (let x = 0; x < needToAdapt; x++) {
      padding += paddingChar;
    }
    newText = padding + text;
  } else {
    newText = text;
  }
  return newText;
}

function increase_brightness(hex: string, percent: number): string {
  // strip the leading # if it's there
  let realhex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (realhex.length == 3) {
    realhex = hex.replace(/(.)/g, "$1$1");
  }

  const r = parseInt(realhex.substr(0, 2), 16),
    g = parseInt(realhex.substr(2, 2), 16),
    b = parseInt(realhex.substr(4, 2), 16);

  return (
    "#" +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  );
}
const FächerList = {
  Astronomie: "🌌",
  Biologie: "🌸",
  Chemie: "🧪",
  Deutsch: "📖",
  Englisch: "💂‍♂️",
  Ethik: "",
  Französisch: "🥖",
  Geographie: "🌎",
  Geschichte: "📜",
  Informatik: "👨‍💻",
  Kunst: "🎨",
  Latein: "",
  Mathe: "📊",
  Musik: "🎶",
  Physik: "⚛",
  Sozialkunde: "",
  Sport: "🏃‍♂️",
};

function convertDateToHtmlInputFormat(date: string | number | Date): string {
  return new Date(new Date(date).toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split(".")[0];
}

export {
  padding,
  increase_brightness,
  FächerList,
  convertDateToHtmlInputFormat,
};
