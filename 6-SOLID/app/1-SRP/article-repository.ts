import { MongoClient } from "mongodb";
import { Article, Props } from "./article";

// ─────────────────────────────
// Persistence
// ─────────────────────────────
export class ArticleRepository {
  async insert(article: Article): Promise<void> {
    const client = new MongoClient("mongodb://localhost:27017");

    try {
      await client.connect();

      const database = client.db("app");
      const articles = database.collection<Props>("articles");

      await articles.insertOne(article.props);
    } finally {
      await client.close();
    }
  }
}
