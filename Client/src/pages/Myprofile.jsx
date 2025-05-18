import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import LoginNavbar from "../Components/LoginNavbar";
import Image from "../Components/Image";
import { FaCalendarAlt, FaHeart, FaImages } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { BiHash } from "react-icons/bi";
import Modal from "../Components/imageModal";

const MyProfile = () => {
  const { user } = useAuth();
  const [userImages, setUserImages] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fakeImages = [
      {
        id: 1,
        image:
          "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Sunset",
        description: "A beautiful sunset by the beach",
        author: user.name,
        likes: 12,
        comments: 4,
        tags: ["nature", "sunset", "beach"],
        category: "Landscape",
      },
      {
        id: 2,
        image:
          "https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg",
        name: "Mountains",
        description: "Snowy peaks touching the clouds",
        author: user.name,
        likes: 7,
        comments: 2,
        tags: ["mountain", "snow"],
        category: "Landscape",
      },
      {
        id: 3,
        image:
          "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Mountains 2",
        description: "Snowy peaks touching the clouds",
        author: user.name,
        likes: 9,
        comments: 2,
        tags: ["mountain", "snow"],
        category: "Landscape",
      },
      {
        id: 3,
        image:
          "https://images.pexels.com/photos/12762122/pexels-photo-12762122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Mountains 3",
        description: "Snowy peaks touching the clouds",
        author: user.name,
        likes: 90,
        comments: 2,
        tags: ["mountain", "snow"],
        category: "Landscape",
      },
    ];
    setUserImages(fakeImages);
    setTotalLikes(fakeImages.reduce((sum, img) => sum + img.likes, 0));
    setCommentCount(fakeImages.reduce((sum, img) => sum + img.comments, 0));
    const allTags = fakeImages.flatMap((img) => img.tags);
    setTagCount(new Set(allTags).size);
  }, [user]);

  return (
    <>
      <LoginNavbar />
      <div className="w-full min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Banner */}
        <div className="w-full h-40 bg-indigo-600 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
            <img
              src={user?.profilePicture || "/default-profile.jpg"}
              className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
              alt="Profile"
            />
          </div>
        </div>

        <div className="mt-20 max-w-6xl mx-auto px-4">
          {/* Profile Info */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-700">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <div className="flex justify-center items-center gap-2 mt-3 text-sm text-gray-500">
              <FaCalendarAlt /> <span>Joined: Jan 2024</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {/* Total Uploads */}
            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <FaImages className="text-indigo-500 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{userImages.length}</p>
              <p className="text-sm text-gray-600">Total Uploads</p>
            </div>

            {/* Likes */}
            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <FaHeart className="text-red-400 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{totalLikes}</p>
              <p className="text-sm text-gray-600">Likes Received</p>
            </div>

            {/* Comments */}
            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <FiMessageCircle className="text-blue-500 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{commentCount}</p>
              <p className="text-sm text-gray-600">Comments Received</p>
            </div>

            {/* Tags */}
            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <BiHash className="text-pink-600 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{tagCount}</p>
              <p className="text-sm text-gray-600">Tags Used</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">Bio</h2>
            <p className="text-gray-700 leading-relaxed">
              {user?.bio ||
                "No bio has been added yet. You can add your bio in your account settings to let others know more about you."}
            </p>
          </div>

          {/* Image Gallery */}
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Your Images
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-10">
            {userImages.length > 0 ? (
              userImages.map((item) => (
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  key={item.id}
                >
                  <Image
                    imageSrc={item.image}
                    name={item.name}
                    description={item.description}
                    author={item.author}
                    category={item.category}
                    tags={item.tags}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm col-span-full">
                You haven’t uploaded any images yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
};

export default MyProfile;
