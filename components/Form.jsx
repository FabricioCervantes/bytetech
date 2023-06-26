import Link from "next/link";
import { PageWrapper } from "./PageWrapper";
import Image from "next/image";

const Form = ({ type, blog, setBlog, submitting, handleSubmit }) => {
  return (
    <PageWrapper>
      <div className="md:flex items-center justify-between gap-10">
        <section className="w-full max-w-full bg-gray-50 shadow-lg flex p-5 rounded-md flex-col">
          <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-2">
            <div className="flex flex-col">
              <label>
                <span className="font-satoshi text-4xl font-semibold text-gray-700">
                  Title
                </span>
              </label>
              <input
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                placeholder="Write the title of your blog"
                required
                className="p-2 mt-5 rounded-md bg-transparent"
              />
            </div>
            <label></label>
            <div className="flex flex-col">
              <label>
                <span className="font-satoshi font-semibold text-4xl text-gray-700">
                  Article
                </span>
              </label>
              <textarea
                value={blog.content}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                placeholder="What do you have to say?"
                required
                className="h-80 w-full mt-5 p-3 rounded-xl border-0 bg-transparent"
              />
            </div>
            <label className="flex flex-col">
              <span className="font-satoshi mt-2 font-semibold text-2xl text-gray-700">
                Add a tag to your post!{" "}
                <span className="font-normal text-lg">
                  (#product, #webdevelopment, etc...)
                </span>
              </span>
              <input
                value={blog.tag}
                onChange={(e) => setBlog({ ...blog, tag: e.target.value })}
                type="text"
                placeholder="#Tag"
                required
                className="mt-5 rounded-md border-0 bg-transparent"
              />
            </label>
            <input
              onChange={(e) => setBlog({ ...blog, image: e.target.files[0] })}
              type="file"
              className="mt-2"
            />

            <div className="flex justify-end items-center gap-4">
              <Link href="/" className="text-gray-500 text-sm">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="bg-red-500"
              >
                {submitting ? `${type}ing...` : type}
              </button>
            </div>
          </form>
        </section>
        <Image
          src="/assets/images/new-post.svg"
          width={500}
          height={500}
          className="hidden md:block"
        ></Image>
      </div>
    </PageWrapper>
  );
};

export default Form;
