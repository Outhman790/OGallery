import React, { useState } from "react";

const Modal = ({ item, onClose }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  if (!item) return null;

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        name: "Commentator name",
        text: comment.trim(),
        date: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl p-4 relative grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-3xl font-bold text-gray-600 hover:text-black z-10"
        >
          &times;
        </button>

        {/* LEFT: Big Image */}
        <div className="flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="rounded-lg max-h-[80vh] w-full object-contain"
          />
        </div>

        {/* RIGHT: Info + Interactions */}
        <div className="flex flex-col justify-start overflow-y-auto pr-2">
          {/* Title & Description */}
          <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <p className="text-sm text-gray-500 mb-1">Author: {item.author}</p>
          <p className="w-fit bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 my-2 rounded">
            Category: {item.category}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Like Button */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleLike}
              className={`px-4 py-1 rounded-lg text-white text-sm font-semibold transition ${
                liked ? "bg-red-500" : "bg-gray-400 hover:bg-red-400"
              }`}
            >
              {liked ? "Liked ❤️" : "Like ❤️"}
            </button>
            <span className="text-gray-600 text-sm">
              {likes} {likes === 1 ? "like" : "likes"}
            </span>
          </div>

          {/* Comments */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Post
              </button>
            </form>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-2 rounded-lg text-sm text-gray-800"
                >
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>{c.name}</span>
                    <span>
                      {new Date(c.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p>{c.text}</p>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-sm text-gray-400">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
