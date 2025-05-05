import { AtomIcon, Edit, Share2 } from "lucide-react";

export default function howitworks() {
  return (
    <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <h2 className="font-bold text-3xl">How it Works?</h2>
      <h2 className="text-md text-gray-500">
        Give mock interview in just 3 simplar easy step
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <a
          className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Edit className="h-8 w-8" />

          <h2 className="mt-4 text-xl font-bold text-black">Fill Your form </h2>

          <p className="mt-1 text-sm text-gray-600">
            Provide basic details like the job role, skills, and experience
            level. Our AI will handle the rest, crafting an interview tailored
            specifically to your needs.
          </p>
        </a>

        <a
          className="block rounded-xl border bg-white
         border-gray-200 p-8 shadow-xl transition
         hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <AtomIcon className="h-8 w-8" />

          <h2 className="mt-4 text-xl font-bold text-black">
            Generates Interview Questions
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            AI will craft the questions or topics for you to focus on during the
            interview. It will customizes your interview questions to suit the
            role, industry, or skills you're targeting.
          </p>
        </a>

        <a
          className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          href="#"
        >
          <Share2 className="h-8 w-8" />

          <h2 className="mt-4 text-xl font-bold text-black">
            Share & Start Accepting Responses
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Get started with your mock interview! Review your setup, begin the
            session, and receive AI-generated feedback to improve your
            performance and confidence.
          </p>
        </a>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/sign-in"
          className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </section>
  );
}
