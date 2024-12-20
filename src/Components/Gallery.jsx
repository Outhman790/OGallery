import AddImage from "./addImage";
import Image from "./Image"
import { useState } from "react"
const Gallery = () => { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const tempArrImages = [1,2,3,4,5,6,7,8,9]
    return (
        <>
        <div className="flex max-w[1200px] justify-center items-center mt-10">
        <p className="text-center p-2 font-medium md:text-xl">{`Images number is: ${tempArrImages.length}`}</p>
        <hr className="border-l border-gray-300 h-10 mr-3" />
        <button onClick={openModal} className="bg-indigo-600 font-sans text-white py-2 px-3 rounded ">Add an image</button>
        </div>
        <div  className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 pt-5 mx-auto transition ease-in-out duration-300">   
                {tempArrImages.map(() => (
                    <Image />
                ))}
        </div>
        {isModalOpen && <AddImage closeModal={closeModal} />}
        </>
    )

}
export default Gallery
