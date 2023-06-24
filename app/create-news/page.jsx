"use client";

import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const NewBlogPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: undefined,
    tag: "",
  });

  const createBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.set("title", blog.title);
    form.set("content", blog.content);
    form.set("tag", blog.tag);
    form.set("userId", session?.user.id);
    form.set("image", blog.image);

    try {
      const response = await fetch("/api/news/new", {
        method: "POST",
        body: form,
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
    <section className="h-screen flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <Form
          type="Create"
          blog={blog}
          setBlog={setBlog}
          submitting={submitting}
          handleSubmit={createBlog}
        />
      </div>
    </section>
  );
};

export default NewBlogPage;
