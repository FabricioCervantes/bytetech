import React from "react";
//import
import Image from "next/image";
import { motion } from "framer-motion";
import { PageWrapper } from "./PageWrapper";
import { useRouter } from "next/navigation";
import { Avatar } from "flowbite-react";

const Sidebar = ({ blog }) => {
  const router = useRouter();
  const handleArticle = (article) => {
    router.push(`/article/?id=${article}`);
  };
  return (
    <div>
      <PageWrapper>
        <motion.div
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
          <div className="bg-gray-100 main_text rounded-lg flex hover:cursor-pointer">
            <Image
              src={blog.imageUrl}
              className="rounded-lg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100px", height: "auto", objectFit: "cover" }} // optional
              alt="image"
            />
            <motion.div className="p-2 flex flex-col gap-2">
              <h5 className="text-lg font-bold tracking-tight">
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

export default Sidebar;
