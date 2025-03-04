import Navbar from "../Components/Navbar";
import img_1 from "../images/img_1.webp";
import img_2 from "../images/img_2.webp";
import img_3 from "../images/img_3.webp";
import img_4 from "../images/img_4.webp";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-purple-100">
        <section className="container md:mx-auto grid md:grid-flow-col md:grid-cols-4 p-10">
          <div className="max-w-[600px] p-5 col-span-2">
            <h2 className="font-heading text-6xl font-bold mb-4 mt-10 text-center md:text-left">
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
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <img
                src={img_1}
                alt=""
                className="mr-2 translate-y-[-1rem] rounded"
              />
              <img src={img_2} alt="" className="rounded" />
            </div>
            <div className="flex flex-col md:flex-row  justify-between">
              <img
                src={img_3}
                alt=""
                className="mr-2 translate-y-[-1rem] rounded"
              />
              <img src={img_4} alt="" className="rounded" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
