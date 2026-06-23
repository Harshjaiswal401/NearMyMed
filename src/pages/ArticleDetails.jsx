import { useParams } from "react-router-dom";
import { articles } from "../data/articles";

export default function ArticleDetails() {
  const { id } = useParams();

  const article = articles.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return (
      <div className="p-10 text-center">
        Article Not Found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">

      <img
        src={article.image}
        alt={article.title}
        className="w-full h-[400px] object-cover rounded-3xl"
      />

      <h1 className="text-5xl font-bold mt-8">
        {article.title}
      </h1>

      <p className="text-slate-500 mt-4">
        By {article.author}
      </p>

      <p className="text-slate-500 mb-8">
        {article.readTime}
      </p>

      <div className="prose max-w-none">
        <p>{article.content}</p>
      </div>

    </div>
  );
}