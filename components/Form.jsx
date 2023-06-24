import Link from "next/link";
import { PageWrapper } from "./PageWrapper";

const Form = ({ type, blog, setBlog, submitting, handleSubmit }) => {
  return (
    <PageWrapper>
      <section className="w-full max-w-full shadow-lg flex p-2 flex-col rounded-md">
        <h1 className="head_text text-left">
          <span className="text-2xl">{type} blog</span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full flex flex-col gap-7"
        >
          <div className="flex flex-col">
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Title
              </span>
            </label>
            <input
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              placeholder="Write your post here"
              required
              className="p-2"
            />
          </div>
          <label></label>
          <div className="flex flex-col">
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Your AI Prompt
              </span>
            </label>
            <textarea
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              placeholder="Write your post here"
              required
              className="h-96 w-full"
            />
          </div>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Field of Prompt{" "}
              <span className="font-normal">
                (#product, #webdevelopment, #idea, etc.)
              </span>
            </span>
            <input
              value={blog.tag}
              onChange={(e) => setBlog({ ...blog, tag: e.target.value })}
              type="text"
              placeholder="#Tag"
              required
              className=""
            />
          </label>
          <input
            onChange={(e) => setBlog({ ...blog, image: e.target.files[0] })}
            type="file"
          />

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>

            <button type="submit" disabled={submitting} className="btn_sign_up">
              {submitting ? `${type}ing...` : type}
            </button>
          </div>
        </form>
      </section>
    </PageWrapper>
  );
};

export default Form;
