import { MongoClient } from "mongodb";

export type Props = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  publishedAt: Date;
};

export class Article {
  public props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  // ─────────────────────────────
  // State management
  // ─────────────────────────────
  update(delta: Partial<Props>) {
    this.props = {
      ...this.props,
      ...delta,
    };
  }
}
