"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@components/ArticleCard";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@components/Sidebar";
import { PageWrapper } from "@components/PageWrapper";
import Image from "next/image";
import { Avatar } from "flowbite-react";

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

const Test = ({ data }) => {
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

const Home = () => {
  //define a state variable for all news
  const [allNews, setAllNews] = useState([]);

  //divide allnews into 2 arrays
  const firstHalf = allNews.slice(0, Math.ceil(allNews.length));
  const secondHalf = allNews.slice(Math.ceil(allNews.length / 2));

  //take last 4 of the first half
  const firstHalfLastFour = firstHalf.slice(-4);

  //take first item of the second half
  const secondHalfFirstItem = secondHalf.slice(0, 1);

  //take only first 4 of the second half
  const secondHalfFirstFour = secondHalf.slice(0, 4);

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

  console.log(secondHalf[0]);

  return (
    <div className="md:flex flex-col">
      <section className="md:p-5 flex flex-col items-center bg-black justify-center">
        <div class="relative w-full md:max-w-7xl">
          <img
            className="w-full md:max-w-7xl brightness-50 h-[650px] object-cover object-top"
            src="https://www.kindacode.com/wp-content/uploads/2022/06/big-boss.jpeg"
          />
          <div class="absolute bottom-0 left-0 right-0 px-4 py-2">
            <h3 class="text-5xl text-white text-center font-bold">
              Some fucking text here
            </h3>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-5 w-full max-w-7xl mt-5">
          <Test data={secondHalfFirstFour} />
        </div>
      </section>
      <div className="md:flex">
        <section className="md:w-2/3">
          <div className="grid md:grid-cols-2 gap-5 p-5">
            <ArticleCardList data={secondHalfFirstFour} />
          </div>
        </section>
        <section className="md:w-1/3">
          <div className="grid gap-5 p-5">
            <PageWrapper>
              <h1 className="text-center text-4xl font-bold">
                Top blogs this week
              </h1>
            </PageWrapper>
            <SidebarList data={firstHalfLastFour} />
          </div>
        </section>
      </div>
      <section className="p-5 w-full flex justify-center">
        <div className="max-w-7xl">
          <div className="rounded-md">
            <div className="md:flex">
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2237&q=80"
                alt=""
                className="h-[300px]"
              />
              <div className="p-5 text-center flex flex-col gap-5 justify-between">
                <h1 className="text-4xl font-bold">The world is a vampire</h1>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  eveniet, quibusdam aliquam dolor officiis nihil alias
                  incidunt. Non velit corporis ex maxime. Facere tenetur quod ad
                  nostrum tempora illum natus, nulla iste tempore quam, ut
                  beatae assumenda vel aspernatur repellat! Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Ipsa, asperiores!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                  illum voluptates earum reiciendis nobis, voluptatibus harum!
                  Exercitationem doloribus omnis explicabo.
                </p>
                <div className="flex gap-5 items-center justify-end">
                  <Avatar
                    alt="profille picture"
                    img="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2237&q=80"
                    rounded
                  />
                  <div className="font-bold text-lg">Fabricio Cervantes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
