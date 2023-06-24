"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ArticlePage from "@components/Article";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@components/PageWrapper";
const Article = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/news/${articleId}/article`);
      const data = await response.json();

      setPost({
        title: data[0].title,
        content: data[0].content,
        image: data[0].imageUrl,
      });
    };

    if (articleId) getPromptDetails();
  }, [articleId]);
  return (
    <PageWrapper>
      <ArticlePage post={post}></ArticlePage>
    </PageWrapper>
  );
};

export default Article;
