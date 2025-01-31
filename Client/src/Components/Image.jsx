const Image = ({ imageSrc, name, description, author }) => {
  const trimFunction = (str) => {
    return str.length > 60 ? str.slice(0, 60) + "..." : str;
  };
  return (
    <div className="flex flex-col justify-between w-[18rem] border-2 border-gray-200 overflow-hidden">
      <img
        className="object-cover w-full h-[15rem] hover:scale-110 transition-all duration-300"
        src={imageSrc}
        alt="image"
      />
      <div className="flex flex-col justify-between items-center mt-3 px-1 h-[4.5rem]">
        <p className="font-bold font-heading p-1 text-center text-indigo-600">
          {name}
        </p>
        <p className="text-sm font-sans text-center px-1">
          {trimFunction(description)}
        </p>
      </div>
      <div className="flex flex-row-reverse justify-between items-center border-t-2 border-gray-100 rounded-b-lg mt-3">
        <p className="font-sans text-center text-gray-500 pr-2 hover:text-indigo-600">
          <a href="#">by {author}</a>
        </p>
        <button className="bg-gray-300 hover:text-white hover:bg-indigo-600 font-sans text-black px-3 py-2 transition-all duration-300">
          SHOW
        </button>
      </div>
    </div>
  );
};
export default Image;
