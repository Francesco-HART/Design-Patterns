import { Article } from "./article";
import { IArticleRepository } from "./article-repository.interface";

export class ArticleController {
  constructor(private readonly articleRepository: IArticleRepository) {}
  createArticle(id: number, title: string, content: string) {
    const article = new Article(id, title, content);
    this.articleRepository.save(article);
  }
}
