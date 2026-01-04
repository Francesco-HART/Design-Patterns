import { Article } from "../app-layer/article";
import { IArticleRepository } from "../app-layer/article-repository.interface";

export class ArticleRepository implements IArticleRepository {
  save(article: Article): void {
    // Logic to save the article to a database
  }
}
