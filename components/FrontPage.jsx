"use client";

import { useRouter } from "next/navigation";
import React from "react";

const FrontPage = ({ data }) => {
  const router = useRouter();
  const handleArticle = (article) => {
    router.push(`/article/?id=${article}`);
  };
  return (
    <>
      {data.slice(0, 4).map((blog) => (
        <div
          class="relative w-full md:max-w-7xl hover:cursor-pointer"
          onClick={() => handleArticle(blog._id)}
        >
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

export default FrontPage;
