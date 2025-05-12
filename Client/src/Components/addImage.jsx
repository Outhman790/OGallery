import { useState } from "react";
import AddImageForm from "./addImageForm";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const AddImage = ({ closeModal, dispatch }) => {
  const { user } = useAuth();
  const [image, setImage] = useState("");
  const onSubmit = (formData) => {
    const newItem = {
      id: Date.now(),
      name: formData.name,
      description: formData.imageDescription,
      image: formData.imageFile[0]
        ? URL.createObjectURL(formData.imageFile[0])
        : "",
      author: "temp fake author",
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
    closeModal();
  };
  console.log(user);
  return user?.role ? (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[375px] mx-auto py-3 rounded-md lg:flex lg:justify-center lg:items-center lg:gap-8 bg-gray-300 lg:max-w-[50rem] lg:h-[28rem] lg:p-10"
      >
        <IoClose
          className="absolute lg:top-2 lg:right-2 top-1 right-[2px] text-2xl text-gray-400 hover:text-gray-700 hover:cursor-pointer"
          onClick={closeModal}
        />
        {image && (
          <div>
            <img
              className="mx-auto pt-5 md:h-[400px] object-cover max-w-[350px] lg:max-w-[400px]"
              src={image}
              alt="tempImg"
            />
          </div>
        )}
        <div>
          <AddImageForm onSubmit={onSubmit} setImage={setImage} />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AddImage;
