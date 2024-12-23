import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegFileImage } from "react-icons/fa";

const AddImageForm = ({ onSubmit, setImage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const imageWatch = watch("imageFile");
  useEffect(() => {
    if (imageWatch?.length > 0 && imageWatch[0].type.startsWith("image/")) {
      const url = URL.createObjectURL(imageWatch[0]);
      setImage(url);
      return () => {
        URL.revokeObjectURL(url);
        setImage("");
      };
    }
  }, [imageWatch]);
  const handleBlur = (field) => {
    trigger(field);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-1 py-5 font-sans lg:w-[18rem]"
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
              (value.length >= 3 && value.length <= 25) ||
              "Name must be at least 3 characters long",
            noSpecialChars: (value) =>
              /^[a-zA-Z\s]+$/.test(value) || "Name must only contain letters",
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
              value.length >= 50 ||
              "Description must be at least 50 characters long",
            maxLength: (value) =>
              value.length <= 500 ||
              "Description must be less than 500 characters",
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
        accept="image/*"
        className="hidden"
        type="file"
        id="imageFile"
        {...register("imageFile", {
          required: "Image file is required",
          validate: {
            isImage: (fileList) => {
              const file = fileList[0];
              if (!file) return true;

              const validTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
                "image/jpg",
              ];

              return (
                validTypes.includes(file.type) ||
                "Please insert a valid image file"
              );
            },
            maxSize: (fileList) => {
              const file = fileList[0];
              if (!file) return true;

              const maxSize = 1024 * 1024 * 5;
              return file.size <= maxSize || "File size must be less than 5MB";
            },
          },
        })}
      />
      {errors.imageFile && (
        <p className="text-red-500 text-[.8rem]">{errors.imageFile.message}</p>
      )}

      <button
        className="bg-indigo-600 font-sans text-white py-1 px-4 mt-3 rounded-md"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddImageForm;
