const Image = ({ imageSrc, name, description, author, category, tags }) => {
  const trimFunction = (str) => {
    return str.length > 60 ? str.slice(0, 60) + "..." : str;
  };
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-xs transition-transform duration-300 hover:scale-105">
      <img src={imageSrc} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {trimFunction(description)}
        </p>
        <p className="text-xs text-gray-400 mb-2">By {author}</p>
        {category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
            {category}
          </span>
        )}
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;
