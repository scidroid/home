const messageStyles = [
  "font-size:34px;margin-right:0px;line-height:32px;",
  "font-size:20px;font-weight:900;margin-bottom:12px;line-height:24px;",
  "font-size:14px;"
];

function printText(text: string, styleIndex: number, color = "inherit") {
  console.log(`%c${text}`, `color:${color};${messageStyles[styleIndex]}`);
}

function printTitle(title: string, color = "inherit") {
  printText(title, 0, color);
}

function printSubtitle(subtitle: string, color = "inherit") {
  printText(subtitle, 1, color);
}

function printTextBody(textBody: string, color = "inherit") {
  printText(textBody, 2, color);
}

export function showConsoleMessage() {
  printTitle("Juan Almanza");
  printSubtitle("You found the secret place of my website");
}
