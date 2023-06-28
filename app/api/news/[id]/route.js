import New from "@models/news";

import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const blog = await New.findById(params.id).populate("creator");

    if (!blog) return new Response("Blog not found", { status: 404 });

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all blogs", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, tag, content } = await request.json();

  try {
    await connectToDB();

    const existingBlog = await New.findById(params.id);

    if (!existingBlog) return new Response("Blog not found", { status: 404 });

    existingBlog.title = title;
    existingBlog.tag = tag;
    existingBlog.content = content;

    await existingBlog.save();

    return new Response(JSON.stringify(existingBlog), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the blog", { status: 200 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await New.findByIdAndRemove(params.id);

    return new Response("Blog deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete blog", { status: 500 });
  }
};
