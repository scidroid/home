export function showConsoleMessage() {
  const quotes = [
    "I'm from Colombia, not Columbia.",
    "Read Mountains beyond mountains.",
    "Optimism is the only system that has worked every time.",
    "Data > anything",
    "f(x) = x^2"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const asciiName = `
      ██╗██╗   ██╗ █████╗ ███╗   ██╗
      ██║██║   ██║██╔══██╗████╗  ██║
      ██║██║   ██║███████║██╔██╗ ██║
 ██   ██║██║   ██║██╔══██║██║╚██╗██║
 ╚█████╔╝╚██████╔╝██║  ██║██║ ╚████║
  ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
  `;

  console.log("%c" + asciiName, "font-family: monospace;");
  console.log("%cjuan@almanza.cc", "font-size: 16px;");
  console.log("");
  console.log('%c"' + randomQuote + '"', "font-style: italic;");
}
