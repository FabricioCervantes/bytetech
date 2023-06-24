import News from "@models/news";
import { connectToDB } from "@utils/database";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (request) => {
  const data = await request.formData();
  const image = data.get("image");

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(
    process.cwd(),
    "public/assets/images/blog-images",
    image.name
  );

  const dbPath = path.join("/assets/images/blog-images", image.name);

  writeFile(filePath, buffer);

  try {
    await connectToDB();
    const newNews = new News({
      creator: data.get("userId"),
      title: data.get("title"),
      tag: data.get("tag"),
      content: data.get("content"),
      imageUrl: dbPath,
    });
    await newNews.save();
    return new Response(JSON.stringify(newNews), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new blog", { status: 500 });
  }
};
