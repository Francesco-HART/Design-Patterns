import { ArticleRepository } from "../data-layer/article.repository"; // <--- Dependency from data layer on APP LAYER
import { Article } from "./article";

export class ArticleController {
  constructor(private readonly articleRepository: ArticleRepository) {}
  createArticle(id: number, title: string, content: string) {
    const article = new Article(id, title, content);
    this.articleRepository.save(article);
  }
}
