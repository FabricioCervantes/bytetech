import Image from "next/image";

import { PageWrapper } from "@components/PageWrapper";

const ArticlePage = ({ post }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center  w-full">
        <div className="max-w-4xl flex flex-col gap-5 p-3 md:p-5">
          <h1 className="text-3xl md:text-4xl font-bold">{post.title} </h1>
          <Image
            src={post.image}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "600px", objectFit: "cover" }} // optional
            // alt="image"
            unoptimized={true}
          ></Image>
          <div className="flex justify-center">
            <p className="max-w-3xl whitespace-pre-line text-justify text-lg">
              {post.content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
