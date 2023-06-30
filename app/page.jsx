import ArticleCard from "@components/ArticleCard";
import Sidebar from "@components/Sidebar";
import BottomArticle from "@components/BottomArticle";
import FirstPost from "@components/FirstPost";
import FrontPage from "@components/FrontPage";

const fetchPosts = () => {
  return fetch("http://bytetechblog.netlify.app/api/news").then((res) =>
    res.json()
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
        <FirstPost data={allNews} />
        <div className="grid md:grid-cols-4 gap-5 w-full max-w-7xl mt-5">
          <FrontPage data={allNews} />
        </div>
      </section>
      <div className="md:flex">
        <ArticleCard blog={allNews} layout="main" />
        <Sidebar blog={allNews} />
      </div>
      <section className="p-5 w-full flex justify-center">
        <SingleArticle data={allNews}></SingleArticle>
      </section>
    </div>
  );
}
