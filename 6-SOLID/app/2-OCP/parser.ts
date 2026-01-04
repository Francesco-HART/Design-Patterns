type ParserNode = {
  type: "title" | "paragraph";
  text: string;
};

const nodes: ParserNode[] = [
  { type: "title", text: "Hello World" },
  { type: "paragraph", text: "This is a simple paragraph." },
];

type MailFormat = "text" | "html";

interface IParser {
  parse(): string;
}

class TextParser implements IParser {
  constructor(private readonly nodes: ParserNode[]) {}
  parse(): string {
    return this.nodes.reduce((acc, node) => {
      return acc + node.text + "\n\n";
    }, "");
  }
}

class HtmlParser implements IParser {
  constructor(private readonly nodes: ParserNode[]) {}
  parse(): string {
    return this.nodes.reduce((acc, node) => {
      if (node.type === "title") {
        return acc + `<h1>${node.text}</h1>\n`;
      } else if (node.type === "paragraph") {
        return acc + `<p>${node.text}</p>\n`;
      }
      return acc;
    }, "");
  }
}

class Sender {
  sendByMail(to: string, parser: IParser): void {
    let text = "";
    text = parser.parse();

    console.log(`Sending mail to: ${to}`);
    console.log("Content:");
    console.log(text);
    console.log("Mail sent!");
  }
}

// Exemple d'utilisation
const sender = new Sender();
sender.sendByMail("test@mail.com", new TextParser(nodes));
sender.sendByMail("test@mail.com", new HtmlParser(nodes));
