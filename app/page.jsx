"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@components/ArticleCard";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@components/Sidebar";
import { PageWrapper } from "@components/PageWrapper";

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

const Home = () => {
  //define a state variable for all news
  const [allNews, setAllNews] = useState([]);

  //divide allnews into 2 arrays
  const firstHalf = allNews.slice(0, Math.ceil(allNews.length));
  const secondHalf = allNews.slice(Math.ceil(allNews.length / 2));

  //define an async function to fetch the news data from our API
  const fetchNews = async () => {
    //fetch the data from the API
    const response = await fetch("/api/news");

    //convert the response into json
    const data = await response.json();

    //store the data in our state variable
    setAllNews(data);
  };

  //use the useEffect hook to run our fetchNews function when the page loads
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="md:flex">
      <section className="md:w-2/3">
        <div className="grid md:grid-cols-2 gap-5 p-5">
          <ArticleCardList data={firstHalf} />
        </div>
      </section>
      <section className="md:w-1/3">
        <div className="grid gap-5 p-5">
          <PageWrapper>
            <h1 className="text-center text-4xl font-bold">
              Top blogs this week
            </h1>
          </PageWrapper>
          <SidebarList data={secondHalf} />
        </div>
      </section>
    </div>
  );
};

export default Home;
