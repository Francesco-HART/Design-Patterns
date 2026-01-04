import { MongoClient } from "mongodb";

export type ArticleProps = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  publishedAt: Date;
};

export class Article {
  private props: ArticleProps;

  constructor(props: ArticleProps) {
    this.props = props;
  }

  // ─────────────────────────────
  // State management
  // ─────────────────────────────
  update(delta: Partial<ArticleProps>) {
    this.props = {
      ...this.props,
      ...delta,
    };
  }

  // ─────────────────────────────
  // Rendering
  // ─────────────────────────────
  toHtml(): string {
    return `
      <article>
        <h1>${this.props.title}</h1>
        <p>${this.props.content}</p>
        <p>By ${this.props.author}</p>
      </article>
    `;
  }

  // ─────────────────────────────
  // Persistence
  // ─────────────────────────────
  async insert(): Promise<void> {
    const client = new MongoClient("mongodb://localhost:27017");

    try {
      await client.connect();

      const database = client.db("app");
      const articles = database.collection<ArticleProps>("articles");

      await articles.insertOne(this.props);
    } finally {
      await client.close();
    }
  }
}
