import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegFileImage } from "react-icons/fa";

const AddImageForm = ({ onSubmit, setImage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm();

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
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

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      if (tags.length >= 5) return;

      if (!tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        setValue("tags", newTags);
      }

      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-1 py-5 font-sans lg:w-[24rem]"
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
            maxLength: (value) =>
              value.length <= 25 || "Name must be at most 25 characters long",
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
        className="cursor-pointer text-indigo-600 my-1 px-4 rounded-md"
        htmlFor="category"
      >
        Category:
      </label>
      <select
        className="outline-indigo-600 focus:bg-indigo-100"
        id="category"
        {...register("category", { required: "Category is required" })}
        onBlur={() => handleBlur("category")}
      >
        <option value="">Select a category</option>
        <option value="Nature">Nature</option>
        <option value="Architecture">Architecture</option>
        <option value="Animals">Animals</option>
        <option value="Technology">Technology</option>
        <option value="People">People</option>
      </select>
      {errors.category && (
        <p className="text-red-500 text-[.8rem]">{errors.category.message}</p>
      )}
      <label className="cursor-pointer text-indigo-600 my-1 px-4 rounded-md">
        Tags:
      </label>
      <input
        type="text"
        className="outline-indigo-600 focus:bg-indigo-100"
        placeholder="Enter tag and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
      />{" "}
      <div className="flex flex-wrap gap-2 my-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center bg-indigo-200 text-indigo-900 px-2 py-1 rounded-full text-xs"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input type="hidden" {...register("tags")} value={tags} />
      {tags.length >= 5 && (
        <p className="text-red-500 text-[.8rem]">Maximum of 5 tags allowed</p>
      )}
      {/* Image File Upload */}
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
