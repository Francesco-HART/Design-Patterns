import { Article } from "./article";

export class ArticleView {
  constructor(private article: Article) {}
  // ─────────────────────────────
  // Rendering
  // ─────────────────────────────
  toHtml(): string {
    return `
      <article>
        <h1>${this.article.props.title}</h1>
        <p>${this.article.props.content}</p>
        <p>By ${this.article.props.author}</p>
      </article>
    `;
  }
}
