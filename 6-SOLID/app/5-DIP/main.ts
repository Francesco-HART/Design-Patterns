import { Article } from "./app-layer/article";
import { ArticleController } from "./app-layer/article.controller";
import { ArticleRepository } from "./data-layer/article.repository";

function main() {
  console.log("Dependency Inversion Principle Example");
  const controller = new ArticleController(new ArticleRepository());

  controller.createArticle(1, "DIP in TypeScript", "Content of the article");
}

main();
