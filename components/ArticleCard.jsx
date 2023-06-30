"use client";

import React from "react";
import { PageWrapper } from "./PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const ArticleCard = ({ blog, edit, layout }) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterBlogs = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return blog.filter(
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
  const router = useRouter();
  const handleArticle = (article) => {
    router.push(`/article/?id=${article}`);
  };
  const handleProfile = (profile) => {
    router.push(`/users/?id=${profile}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/news/${blog._id}`, {
          method: "DELETE",
        });

        // const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        // setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ArticleCardList = ({ data }) => {
    return (
      <>
        {data.map((post) => (
          <motion.div
            variants={variants}
            // initial="hidden"
            // animate="show"
            whileHover={{ scale: 1.05 }}
            // transition={{ duration: 0.25 }}
            // whileTap={{
            //   scale: 0.8,
            //   borderRadius: "100%",
            // }}
          >
            <div className="bg-white shadow-lg main_text md:w-[50vh] rounded-lg hover:cursor-pointer">
              <div onClick={() => handleArticle(post._id)}>
                <Image
                  src={post.imageUrl}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }} // optional
                  alt="image"
                />
                <div className="p-2 flex flex-col gap-2">
                  <div className="flex gap-5">{post.tag}</div>
                  <h5 className="text-xl font-bold tracking-tight">
                    <p>{post.title}</p>
                  </h5>
                </div>
              </div>
              <div
                onClick={() => handleProfile(post.creator._id)}
                className="flex items-center gap-5 p-2 hover:bg-gray-100"
              >
                <Avatar
                  alt="profille picture"
                  img={post.creator.image}
                  rounded
                />
                <div className="font-bold text-lg">{post.creator.username}</div>
              </div>
              {edit && ( //if user is creator of blog, show edit and delete buttons}
                <div className="flex justify-end gap-5 p-2">
                  <Link href={`/update-blog?id=${post._id}`}>
                    <button className="action_btn">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </>
    );
  };

  return (
    <>
      {layout === "profile" && (
        <section>
          <div className="grid md:grid-cols-3 gap-5 p-5">
            {searchText ? (
              <ArticleCardList data={searchedResults} />
            ) : (
              <ArticleCardList data={blog} />
            )}
          </div>
        </section>
      )}
      {layout === "main" && (
        <section className="md:w-2/3">
          <form className="px-5 pt-5 flex justify-center">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              className="text-md w-96 rounded-md border-white"
              placeholder="Search..."
            />
          </form>
          <div className="grid md:grid-cols-2 gap-5 p-5">
            {searchText ? (
              <ArticleCardList data={searchedResults} />
            ) : (
              <ArticleCardList data={blog.slice(5, 9)} />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ArticleCard;
