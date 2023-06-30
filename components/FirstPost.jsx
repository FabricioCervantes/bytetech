"use client";
import React from "react";
import { useRouter } from "next/navigation";
const FirstPost = ({ data }) => {
  const router = useRouter();
  const handleArticle = (article) => {
    router.push(`/article/?id=${article}`);
  };
  return (
    <>
      {data.slice(4, 5).map((blog) => (
        <div
          class="relative w-full md:max-w-7xl hover:cursor-pointer"
          onClick={() => handleArticle(blog._id)}
        >
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

export default FirstPost;
