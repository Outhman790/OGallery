import Navbar from "../Components/Navbar";
import AddImage from "./addImage";
import Image from "./Image";
import { useState } from "react";
import { useGlobalContext } from "../Context/GlobalState";
const Gallery = () => {
  const { items, dispatch } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <p className="text-center p-2 font-medium md:text-xl">{`Images number is: ${items.length}`}</p>
        <hr className="border-l border-gray-300 h-10 mr-3" />
        <button
          onClick={openModal}
          className="bg-indigo-600 font-sans text-white py-2 px-3 rounded "
        >
          Add an image
        </button>
      </div>
      <div className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-16 pt-10 mx-auto transition ease-in-out duration-300">
        {items.map((item) => (
          <Image
            imageSrc={item.image}
            name={item.name}
            description={item.description}
            author={item.author}
            key={item.id}
          />
        ))}
      </div>
      {isModalOpen && <AddImage dispatch={dispatch} closeModal={closeModal} />}
    </>
  );
};
export default Gallery;
