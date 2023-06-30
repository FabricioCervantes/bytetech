"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@components/ArticleCard";
import Sidebar from "@components/Sidebar";
import { PageWrapper } from "@components/PageWrapper";
import BottomArticle from "@components/BottomArticle";

const ArticleCardList = ({ data }) => {
  return (
    <>
      {data.map((blog) => (
        <ArticleCard key={blog._id} blog={blog}></ArticleCard>
      ))}
    </>
  );
};

const SidebarList = ({ data }) => {
  return (
    <>
      {data.map((blog) => (
        <Sidebar key={blog._id} blog={blog}></Sidebar>
      ))}
    </>
  );
};

const FrontTest = ({ data }) => {
  return (
    <>
      {data.map((blog) => (
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
      {data.map((blog) => (
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
  console.log(data);
  return (
    <>
      {data.map((blog) => (
        <BottomArticle key={blog._id} blog={blog}></BottomArticle>
      ))}
    </>
  );
};

const Home = () => {
  //define a state variable for all news
  const [allNews, setAllNews] = useState([]);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const main = allNews.slice(4, 5);
  const topArticles = allNews.slice(0, 4);
  const cardArticles = allNews.slice(5, 9);
  const sidebarArticles = allNews.slice(9, 13);
  const bottomArticle = allNews.slice(-1);

  //define an async function to fetch the news data from our API
  const fetchNews = async () => {
    //fetch the data from the API
    const response = await fetch("/api/news");

    //convert the response into json
    const data = await response.json();

    //store the data in our state variable
    setAllNews(data);
  };

  const filterBlogs = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allNews.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterBlogs(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  //use the useEffect hook to run our fetchNews function when the page loads
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="md:flex flex-col">
      <section className="md:p-5 flex flex-col items-center bg-black justify-center">
        <FrontTest data={main} />
        <div className="grid md:grid-cols-4 gap-5 w-full max-w-7xl mt-5">
          <FrontPage data={topArticles} />
        </div>
      </section>
      <div className="md:flex">
        <section className="md:w-2/3">
          <form className="px-5 pt-5 flex justify-center">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              className="text-md w-96 rounded-md border-white hidden md:block"
              placeholder="Search..."
            />
          </form>
          <div className="grid md:grid-cols-2 gap-5 p-5">
            {/* All Prompts */}
            {searchText ? (
              <ArticleCardList data={searchedResults} />
            ) : (
              <ArticleCardList data={cardArticles} />
            )}
          </div>
        </section>
        <section className="md:w-1/3">
          <div className="grid gap-5 p-5">
            <PageWrapper>
              <h1 className="text-center text-4xl font-bold">
                Top blogs this week
              </h1>
            </PageWrapper>
            <SidebarList data={sidebarArticles} />
          </div>
        </section>
      </div>
      <section className="p-5 w-full flex justify-center">
        <SingleArticle data={bottomArticle}></SingleArticle>
      </section>
    </div>
  );
};

export default Home;
