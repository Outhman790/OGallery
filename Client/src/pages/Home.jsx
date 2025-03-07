import Navbar from "../Components/Navbar";
import img_1 from "../images/img_1.webp";
import img_2 from "../images/img_2.webp";
import img_3 from "../images/img_3.webp";
import img_4 from "../images/img_4.webp";
import { FaTags } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { FaComments } from "react-icons/fa6";
const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="bg-purple-100 mx-auto">
        <section className="md:container flex flex-col-reverse md:mx-auto md:grid md:grid-flow-col md:grid-cols-4 p-10">
          <div className="md:p-5 col-span-2">
            <h2 className="font-heading text-4xl lg:text-6xl font-bold mb-4 mt-10 text-center md:text-left">
              Share Your Visual Stories with the World
            </h2>
            <p className="mb-4 text-center md:text-left">
              Join millions of creators sharing their photos, artwork, and
              memorable moments on Ogallery. Connect, inspire, and get inspired.
            </p>
            <button className="bg-purple-700 text-white rounded py-2 px-6 md:mr-5 block md:inline-block mx-auto">
              Get Started
            </button>
            <button className="bg-purple-100 text-purple-700  border-2 border-purple-500 rounded-md py-2 px-6 block md:inline-block mx-auto my-3">
              Learn more
            </button>
          </div>
          <div className="">
            <div className="hidden h-fit lg:h-[20rem] lg:flex flex-col lg:flex-row justify-between mb-2">
              <img
                src={img_1}
                alt=""
                className="lg:mr-2 lg:translate-y-[-1rem] rounded"
              />
              <img src={img_2} alt="" className="rounded" />
            </div>
            <div className="flex flex-col md:flex-row justify-between h-fit  ">
              <img
                src={img_3}
                alt=""
                className="hidden md:inline-block h-[25rem] lg:h-[20rem] mr-2 lg:translate-y-[-1rem] rounded object-cover"
              />
              <img
                src={img_4}
                alt=""
                className="rounded h-[25rem] lg:h-[20rem] w-[30rem]  object-cover mx-auto lg:m-0"
              />
            </div>
          </div>
        </section>
      </div>
      {/* Features section */}
      <div className="bg-slate-50">
        <section className="container mx-auto p-10">
          <h2 className="text-center text-3xl font-bold my-3">
            Everything You Need to Share Your Creativity
          </h2>
          <p className="text-center text-gray-700 mb-10">
            Powerful features to showcase your work and connect with others
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="bg-purple-200 p-8 rounded mb-4">
              <FaUpload className="mx-auto block text-purple-700 text-xl" />
              <h3 className="text-center font-semibold mb-1">Easy uploads</h3>
              <p className="text-gray-700">
                Upload your photos in seconds with our intuitive interface
              </p>
            </div>
            <div className="bg-purple-200 p-8 rounded mb-4">
              <FaTags className="mx-auto block text-purple-700 text-xl" />
              <h3 className="text-center font-semibold mb-1">Smart tagging</h3>
              <p className="text-gray-700">
                Organize your content with intelligent tagging system
              </p>
            </div>
            <div className="bg-purple-200 p-8 rounded mb-4">
              <FaComments className="mx-auto block text-purple-700 text-xl" />
              <h3 className="text-center font-semibold mb-1">
                Social engagement
              </h3>
              <p className="text-gray-700">
                Connect with others through comments and likes
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Call to Action (Sign up section) */}
      <div className="bg-gradient-to-r from-indigo-600 from-10% via-purple-500 via-50% to-purple-600 to-90%">
        <section className="container mx-auto p-10">
          <h3 className="text-center text-white font-bold text-3xl my-4">
            Ready To Share Your Story?
          </h3>
          <p className="text-white text-center mb-3">
            Join our creative community today and start sharing your visual
            journey
          </p>
          <button className="block text-purple-700 bg-gray-100 border-2 border-purple-500 py-2 px-6 my-5 mx-auto rounded">
            Create Your Account
          </button>
        </section>
      </div>
      {/* Trending Section */}
      <div className="bg-slate-50">
        <section className="container mx-auto p-10">
          <h2 className="text-center text-3xl font-bold my-3">Trending Now</h2>
          <p className="text-center text-gray-700 mb-10">
            Check out the latest and most popular images on Ogallery
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <img src={img_1} alt="" className="h-[22rem]" />
            <img src={img_2} alt="" className="h-[22rem]" />
            <img src={img_3} alt="" className="h-[22rem]" />
            <img src={img_4} alt="" className="h-[22rem]" />
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container mx-auto p-4">
          <p className="text-gray-700 text-center">
            © 2025 Ogallery. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
