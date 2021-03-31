function padding(
  text: string | number,
  desiredLength: number,
  paddingChar: string
): string {
  if (typeof text === "number") {
    text = String(text);
  }
  const currentLength = text.length;
  const needToAdapt = desiredLength - currentLength;
  if (needToAdapt > 0) {
    let padding = "";
    for (var x = 0; x < needToAdapt; x++) {
      padding += paddingChar;
    }
    text = padding + text;
  }
  return text;
}

function increase_brightness(hex: string, percent: number) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return (
    "#" +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  );
}
const FächerList = {
  Deutsch: "📖",
  Sozialkunde: "",
  Mathe: "📊",
  Latein: "",
  Französisch: "🥖",
  Kunst: "🎨",
  Sport: "🏃‍♂️",
  Physik: "⚛",
  Chemie: "🧪",
  Astronomie: "🌌",
  Biologie: "🌸",
  Musik: "🎶",
  Geographie: "🌎",
  Ethik: "",
  Informatik: "👨‍💻",
  Englisch: "💂‍♂️",
  Geschichte: "📜",
};
export { padding, increase_brightness, FächerList };
