import { useState } from "react";
import Image from "./Image";
import { FaRegFileImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

useState
const AddImage = ({closeModal}) => {
    const [isImage, setIsImage] = useState(true);
    const showImage = () => {
        setIsImage(true);
    }
    return ( 
        <div onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="relative max-w-[400px] mx-auto py-3 px-5 rounded-md lg:flex lg:justify-center lg:items-center lg:gap-10 bg-gray-300 lg:max-w-[40rem] lg:h-[28rem] lg:p-10">
                <IoClose className="absolute lg:top-2 lg:right-2 top-1 right-[2px] text-2xl text-gray-400 hover:text-gray-700 hover:cursor-pointer" onClick={closeModal} />
            {isImage && <div><img className="mx-auto pt-5" src="https://placehold.co/300" alt="tempImg" /></div>}
            <div>
                <form className="flex flex-col justify-center items-center gap-1 py-5 font-sans">
                    <label className="cursor-pointer text-indigo-600 my-1 px-4 rounded-md" htmlFor="imageName">Image name:</label>
                    <input className="outline-indigo-600 focus:bg-indigo-100" type="text" id="imageName" />
                    <label className="cursor-pointer text-indigo-600 my-1 px-4 rounded-md" htmlFor="imageDescription">Image description:</label>
                    <input className="outline-indigo-600 focus:bg-indigo-100" type="text" id="imageDescription"/>
                    <label className="cursor-pointer text-indigo-600 mt-2 py-2 px-3 rounded-md border-2 border-indigo-400 bg-gray-200" htmlFor="imageFile">
                    Image file<FaRegFileImage className="inline-block ml-2 text-2xl" />
                    </label>
                    <input className="hidden" type="file" id="imageFile" />
                </form>
            </div>
            </div>
        </div>
      
     );
}
 
export default AddImage ;