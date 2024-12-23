import { useState } from "react";
import AddImageForm from "./addImageForm";
import { IoClose } from "react-icons/io5";

const AddImage = ({ closeModal, items, setItems }) => {
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
    setItems([...items, newItem]);
    closeModal();
  };

  // const onChange = (e) => {
  //   e.target.files && e.target.files.length > 0
  //     ? setImage(URL.createObjectURL(e.target.files[0]))
  //     : "";
  // };

  return (
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
  );
};

export default AddImage;
