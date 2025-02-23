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
        <section className="container mx-auto grid lg:grid-cols-4 grid-cols-2 gap-32 p-10">
          <div className="col-start-1 col-end-3 p-5">
            <h2 className="text-6xl font-bold mb-4">
              Share Your Visual Stories with the World
            </h2>
            <p className="mb-4">
              Join millions of creators sharing their photos, artwork, and
              memorable moments on Ogallery. Connect, inspire, and get inspired.
            </p>
            <button className="bg-purple-700 text-white rounded py-2 px-6 md:mr-5">
              Get Started
            </button>
            <button className="bg-purple-100 text-purple-700  border border-purple-500 rounded-md py-2 px-6">
              Learn more
            </button>
          </div>
          <div className="col-start-3 col-end-5">
            <img className="inline-block" src={img_1} alt="" width={"300px"} />
            <img className="inline-block" src={img_2} alt="" width={"300px"} />
            <img className="inline-block" src={img_3} alt="" width={"300px"} />
            <img className="inline-block" src={img_4} alt="" width={"300px"} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
