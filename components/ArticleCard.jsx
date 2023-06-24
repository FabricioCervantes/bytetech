import React from "react";
import { PageWrapper } from "./PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const ArticleCard = ({ blog }) => {
  const router = useRouter();
  const handleArticle = (article) => {
    router.push(`/article/?id=${article}`);
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
          whileTap={{
            scale: 0.8,
            borderRadius: "100%",
          }}
          onClick={() => handleArticle(blog._id)}
        >
          <div className="card_bg main_text md:w-[50vh] rounded-lg hover:cursor-pointer">
            <Image
              src={blog.imageUrl}
              className="rounded-lg object-contain"
              width={450}
              height={400}
              alt="image"
            />
            <motion.div variants={images} className="p-2 flex flex-col gap-2">
              <div className="flex gap-5">#{blog.tag}</div>
              <h5 className="text-xl font-bold tracking-tight">
                <p>{blog.title}</p>
              </h5>
              <div className="flex items-center gap-5">
                <Avatar
                  alt="profille picture"
                  img={blog.creator.image}
                  rounded
                />
                <p className="font-bold text-lg">{blog.creator.username}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </PageWrapper>
    </div>
  );
};

export default ArticleCard;
