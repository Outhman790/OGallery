import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import LoginNavbar from '../Components/LoginNavbar';
import Image from '../Components/Image';
import { FaCalendarAlt, FaHeart, FaImages } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { BiHash } from 'react-icons/bi';
import Modal from '../Components/imageModal';
import api from '../api';

const MyProfile = () => {
  const { user } = useAuth();
  const [userImages, setUserImages] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchImages = async () => {
      try {
        const res = await api.get('/my-images');
        const images = res.data.images || [];
        setUserImages(images);
        setTotalLikes(0);
        setCommentCount(0);
        const allTags = images.flatMap((img) => img.tags || []);
        setTagCount(new Set(allTags).size);
      } catch (err) {
        console.error('Failed to fetch user images:', err);
      }
    };

    fetchImages();
  }, [user]);

  return (
    <>
      <LoginNavbar />
      <div className="w-full min-h-screen bg-gray-50 text-gray-800 font-sans">
        <div className="w-full h-40 bg-indigo-600 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
            <img
              src={user?.profilePicture || '/default-profile.jpg'}
              className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
              alt="Profile"
            />
          </div>
        </div>

        <div className="mt-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-700">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <div className="flex justify-center items-center gap-2 mt-3 text-sm text-gray-500">
              <FaCalendarAlt /> <span>Joined: Jan 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <FaImages className="text-indigo-500 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{userImages.length}</p>
              <p className="text-sm text-gray-600">Total Uploads</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <FaHeart className="text-red-400 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{totalLikes}</p>
              <p className="text-sm text-gray-600">Likes Received</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <FiMessageCircle className="text-blue-500 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{commentCount}</p>
              <p className="text-sm text-gray-600">Comments Received</p>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 text-center">
              <BiHash className="text-pink-600 text-xl mb-2 mx-auto" />
              <p className="text-xl font-semibold">{tagCount}</p>
              <p className="text-sm text-gray-600">Tags Used</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">Bio</h2>
            <p className="text-gray-700 leading-relaxed">
              {user?.bio ||
                'No bio has been added yet. You can add your bio in your account settings to let others know more about you.'}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Your Images</h2>
          <div className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-16 mb-12 pt-10 mx-auto transition ease-in-out duration-300">
            {userImages.length > 0 ? (
              userImages.map((item) => (
                <div className="cursor-pointer" onClick={() => setSelectedItem(item)} key={item.id}>
                  <Image
                    image={item.image}
                    fullImage={item.fullImage}
                    name={item.name}
                    description={item.description}
                    author={user?.name}
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
