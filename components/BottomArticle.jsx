import React from "react";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BottomArticle = ({ blog }) => {
  const router = useRouter();
  const handleArticle = (article) => {
    router.push(`/article/?id=${article}`);
  };

  return (
    <div className="max-w-7xl">
      <div className="rounded-md">
        <div className="md:flex">
          <Image
            src={blog.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "500px", height: "300px", objectFit: "cover" }} // optional
            // alt="image"
            unoptimized={true}
          />
          <div className="p-5 text-center flex flex-col gap-5 justify-between">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <p className="hidden md:block text-justify">
              {blog.content.substring(0, 500)}...
            </p>
            <p className="md:hidden text-justify">
              {blog.content.substring(0, 198)}...
            </p>
            <div className="flex gap-5 items-center justify-between">
              <div className="flex items-center gap-5">
                <Avatar
                  alt="profille picture"
                  img={blog.creator.image}
                  rounded
                />
                <div className="font-bold text-lg">{blog.creator.username}</div>
              </div>
              <div>
                <button
                  className="action_btn w-20"
                  onClick={() => handleArticle(blog._id)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomArticle;
