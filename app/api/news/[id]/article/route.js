import News from "@models/news";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const article = await News.find({ _id: params.id });

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Newss created by user", {
      status: 500,
    });
  }
};
