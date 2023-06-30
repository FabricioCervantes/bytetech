import ArticleCard from "@components/ArticleCard";
import Sidebar from "@components/Sidebar";
import { PageWrapper } from "@components/PageWrapper";
import BottomArticle from "@components/BottomArticle";

const fetchPosts = () => {
  return fetch("http://localhost:3000/api/news").then((res) => res.json());
};

const FrontPost = ({ data }) => {
  return (
    <>
      {data.slice(4, 5).map((blog) => (
        <div class="relative w-full md:max-w-7xl">
          <img
            className="w-full md:max-w-7xl brightness-50 h-[650px] object-cover object-top"
            src={blog.imageUrl}
          />
          <div class="absolute bottom-0 left-0 right-0 px-4 py-2">
            <h3 class="text-5xl text-white text-center font-bold">
              {blog.title}
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

const FrontPage = ({ data }) => {
  return (
    <>
      {data.slice(0, 4).map((blog) => (
        <div class="relative w-full md:max-w-7xl">
          <img
            className="w-full md:max-w-7xl brightness-50 h-[200px] md:h-[300px] object-cover object-top"
            src={blog.imageUrl}
          />
          <div class="absolute bottom-0 left-0 right-0 px-4 py-2">
            <h3 class="text-xl text-white text-center font-bold">
              {blog.title}
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

const SingleArticle = ({ data }) => {
  return (
    <>
      {data.slice(-1).map((blog) => (
        <BottomArticle key={blog._id} blog={blog}></BottomArticle>
      ))}
    </>
  );
};

export default async function Home() {
  const allNews = await fetchPosts();

  return (
    <div className="md:flex flex-col">
      <section className="md:p-5 flex flex-col items-center bg-black justify-center">
        <FrontPost data={allNews} />
        <div className="grid md:grid-cols-4 gap-5 w-full max-w-7xl mt-5">
          <FrontPage data={allNews} />
        </div>
      </section>
      <div className="md:flex">
        <ArticleCard blog={allNews} />
        <Sidebar blog={allNews} />
      </div>
      <section className="p-5 w-full flex justify-center">
        <SingleArticle data={allNews}></SingleArticle>
      </section>
    </div>
  );
}
