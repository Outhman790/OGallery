import { useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";

const AddImage = ({ closeModal }) => {
  const [isImage, setIsImage] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const showImage = () => {
    setIsImage(true);
  };
  const handleBlur = (field) => {
    trigger(field);
  };

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
        {isImage && (
          <div>
            <img
              className="mx-auto pt-5 md:h-[400px] object-cover max-w-[350px] lg:max-w-[400px]"
              src="https://placehold.co/400x400"
              alt="tempImg"
            />
          </div>
        )}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-1 py-5 font-sans "
          >
            <label
              className="cursor-pointer text-indigo-600 my-1 px-4 rounded-md"
              htmlFor="imageName"
            >
              Image name:
            </label>
            <input
              className="outline-indigo-600 focus:bg-indigo-100"
              type="text"
              id="imageName"
              {...register("name", {
                validate: {
                  minLength: (value) =>
                    value.length >= 3 ||
                    "Name must be at least 3 characters long",
                  noSpecialChars: (value) =>
                    /^[A-Za-z]+$/.test(value) ||
                    "Name must only contain letters",
                },
              })}
              onBlur={() => handleBlur("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-[.8rem]">{errors.name.message}</p>
            )}

            <label
              className="cursor-pointer text-indigo-600 my-1 px-4 rounded-md"
              htmlFor="imageDescription"
            >
              Image description:
            </label>
            <textarea
              className="outline-indigo-600 focus:bg-indigo-100"
              id="imageDescription"
              rows="3"
              cols="30"
              {...register("imageDescription", {
                validate: {
                  minLength: (value) =>
                    value.length >= 10 ||
                    "Description must be at least 10 characters long",
                  maxLength: (value) =>
                    value.length <= 100 ||
                    "Description must be less than 100 characters",
                },
              })}
              onBlur={() => handleBlur("imageDescription")}
            ></textarea>
            {errors.imageDescription && (
              <p className="text-red-500 text-[.8rem]">
                {errors.imageDescription.message}
              </p>
            )}

            <label
              className="cursor-pointer text-indigo-600 mt-2 py-2 px-3 rounded-md border-2 border-indigo-400 bg-gray-200"
              htmlFor="imageFile"
            >
              Image file
              <FaRegFileImage className="inline-block ml-2 text-2xl" />
            </label>
            <input
              className="hidden"
              type="file"
              id="imageFile"
              {...register("imageFile", { required: "Image file is required" })}
            />
            {errors.imageFile && (
              <p className="text-red-500 text-[.8rem]">
                {errors.imageFile.message}
              </p>
            )}

            <button
              className="bg-indigo-600 font-sans text-white py-1 px-4 mt-3 rounded-md"
              type="submit"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddImage;
