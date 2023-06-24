import ArticleCard from "./ArticleCard";

//import
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  //get current user info
  const { data: session } = useSession();
  console.log(session);

  return (
    <section className="w-full p-5">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={session?.user.image}
          width={200}
          height={200}
          className="rounded-full transition-all"
          alt="user image"
          unoptimized={true}
        />
        <h1 className="text-5xl text-center">{session?.user.name}</h1>
        <p className="text-center text-xl mb-5 mt-2">{desc}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {data.map((blog) => (
          <ArticleCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
