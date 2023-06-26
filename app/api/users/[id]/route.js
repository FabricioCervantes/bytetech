import News from "@models/news";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // console.log(params);

    const news = await News.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts created by user", {
      status: 500,
    });
  }
};
