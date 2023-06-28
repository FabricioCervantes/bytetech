"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const updateBlog = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState({ title: "", tag: "", content: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/news/${postId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        tag: data.tag,
        content: data.content,
      });

      console.log(data);
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/news/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          tag: post.tag,
          content: post.content,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        blog={post}
        setBlog={setPost}
        submitting={submitting}
        handleSubmit={updateBlog}
      />
    </div>
  );
};

export default updateBlog;
