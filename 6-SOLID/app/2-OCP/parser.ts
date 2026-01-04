type ParserNode = {
  type: "title" | "paragraph";
  text: string;
};

const nodes: ParserNode[] = [
  { type: "title", text: "Hello World" },
  { type: "paragraph", text: "This is a simple paragraph." },
];

type MailFormat = "text" | "html";

class Sender {
  sendByMail(to: string, format: MailFormat, content: string): void {
    let text = "";

    if (format === "text") {
      for (const node of nodes) {
        text += `${node.text}\n\n`;
      }
    } else if (format === "html") {
      for (const node of nodes) {
        if (node.type === "title") {
          text += `<h1>${node.text}</h1>\n`;
        } else if (node.type === "paragraph") {
          text += `<p>${node.text}</p>\n`;
        }
      }
    }

    console.log(`Sending mail to: ${to}`);
    console.log("Content:");
    console.log(text);
    console.log("Mail sent!");
  }
}

// Exemple d'utilisation
const sender = new Sender();
sender.sendByMail("test@mail.com", "text", "");
