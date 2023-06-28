import React from "react";
import { PageWrapper } from "./PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const images = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const ArticleCard = ({ blog, edit }) => {
  // console.log(blog.creator._id);
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

  return (
    <div>
      <PageWrapper>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05 }}
          // transition={{ duration: 0.25 }}
          // whileTap={{
          //   scale: 0.8,
          //   borderRadius: "100%",
          // }}
        >
          <div className="bg-white shadow-lg main_text md:w-[50vh] rounded-lg hover:cursor-pointer">
            <div onClick={() => handleArticle(blog._id)}>
              <Image
                src={blog.imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "300px", objectFit: "cover" }} // optional
                alt="image"
              />
              <motion.div variants={images} className="p-2 flex flex-col gap-2">
                <div className="flex gap-5">#{blog.tag}</div>
                <h5 className="text-xl font-bold tracking-tight">
                  <p>{blog.title}</p>
                </h5>
              </motion.div>
            </div>
            <div
              onClick={() => handleProfile(blog.creator._id)}
              className="flex items-center gap-5 p-2 hover:bg-gray-100"
            >
              <Avatar alt="profille picture" img={blog.creator.image} rounded />
              <div className="font-bold text-lg">{blog.creator.username}</div>
            </div>
            {edit && ( //if user is creator of blog, show edit and delete buttons}
              <div className="flex justify-end gap-5 p-2">
                <Link href={`/update-blog?id=${blog._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </PageWrapper>
    </div>
  );
};

export default ArticleCard;
