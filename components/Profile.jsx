import ArticleCard from "./ArticleCard";

//import
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  //get current user info
  const { data: session } = useSession();
  console.log(session);

  //validate if user is logged in
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="backdrop-blur-3xl flex flex-col items-center justify-center p-5 gap-5 rounded-md">
          <Image
            src="/assets/images/login.svg"
            width={300}
            height={300}
          ></Image>
          <h1 className="text-3xl font-bold md:text-5xl text-center">
            You must be logged in to view this page
          </h1>
        </div>
      </div>
    );
  } else {
    return (
      <section className="w-full p-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={session?.user.image}
            width={200}
            height={200}
            className="rounded-full transition-all"
            alt="user image"
            sizes="100vw"
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
  }
};

export default Profile;
