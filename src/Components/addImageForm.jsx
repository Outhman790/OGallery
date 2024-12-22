import { useForm } from "react-hook-form";
import { FaRegFileImage } from "react-icons/fa";

const AddImageForm = ({ onSubmit, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

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
              value.length >= 3 || "Name must be at least 3 characters long",
            noSpecialChars: (value) =>
              /^[A-Za-z]+$/.test(value) || "Name must only contain letters",
            onChange: (e) => onChange(e),
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
          onChange: (e) => onChange(e),
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
        {...register("imageFile", {
          required: "Image file is required",
          onChange: (e) => onChange(e),
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
