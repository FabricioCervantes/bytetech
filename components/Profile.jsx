import ArticleCard from "./ArticleCard";

//import
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { PageWrapper } from "./PageWrapper";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  //get current user info
  const { data: session } = useSession();

  //check if user logged is also the creator of the blog
  const isCreator = (blog) => {
    let creatorId = "";
    blog.slice(-1).map((item) => (creatorId = item.creator._id));
    if (session?.user.id === creatorId) {
      return true;
    } else {
      return false;
    }
  };

  //validate if user is logged in
  if (!session) {
    return (
      <PageWrapper>
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
      </PageWrapper>
    );
  } else {
    return (
      <section className="w-full p-5">
        <PageWrapper>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={name.image}
              width={200}
              height={200}
              className="rounded-full transition-all"
              alt="user image"
              sizes="100vw"
              unoptimized={true}
            />
            <h1 className="text-5xl text-center">{name.username}</h1>
            <p className="text-center text-xl mb-5 mt-2">{desc}</p>
          </div>
        </PageWrapper>

        <ArticleCard blog={data} layout="profile" edit={isCreator(data)} />
      </section>
    );
  }
};

export default Profile;
