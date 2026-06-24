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
    <div className="min-h-screen bg-emerald-50">

    <div className="
      max-w-4xl
      mx-auto
      bg-white
      rounded-3xl
      shadow-lg
      p-10
      mt-10
      mb-10
    ">
      
    </div>

      <img
  src={article.image}
  alt={article.title}
  className="w-full h-56 object-cover"
/>

<div className="p-5 flex flex-col flex-1"></div>

      <h1
  className="
    text-5xl
    font-extrabold
    text-emerald-900
    leading-tight
    mb-6
    text-center
  "
>
  {article.title}
</h1>


     <div
  className="
    flex
    justify-center
    gap-4
    text-slate-500
    mb-8
  "
>
  <span>{article.author}</span>
  <span>•</span>
</div>

      <div className="max-w-4xl mx-auto px-8">
  <div className="text-lg leading-8 whitespace-pre-line text-slate-700">
    {article.content}
  </div>
</div>
      </div>

  
  );
}