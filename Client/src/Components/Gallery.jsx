import Navbar from '../Components/Navbar';
import LoginNavbar from '../Components/LoginNavbar';
import AddImage from './addImage';
import Image from './Image';
import { useEffect, useState } from 'react';
import { useImageContext } from '../Context/ImageContext';
import { useAuth } from '../Context/AuthContext';
import Modal from './imageModal';
import api from '../api';
const Gallery = () => {
  const { images, dispatch } = useImageContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { user } = useAuth();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get('/all-images');
        console.log(res);
        dispatch({ type: 'GET_ALL_IMAGES', payload: res.data.images });
      } catch (err) {
        console.error('Failed to fetch images:', err);
      }
    };
    fetchImages();
  }, []);
  return (
    <>
      {user ? <LoginNavbar /> : <Navbar />}

      <div className="flex justify-center items-center mt-10">
        <p className="text-center p-2 font-medium md:text-xl">{`Images number is: ${images.length}`}</p>
        <hr className="border-l border-gray-300 h-10 mr-3" />
        <button
          onClick={openModal}
          className="bg-indigo-600 font-sans text-white py-2 px-3 rounded "
        >
          Add an image
        </button>
      </div>
      <div className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-16 pt-10 mx-auto transition ease-in-out duration-300">
        {images.map((item) => (
          <div key={item.id} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
            <Image
              key={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              author={item.author}
              category={item.category}
              tags={item.tags}
            />
          </div>
        ))}
      </div>
      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      {isModalOpen && <AddImage dispatch={dispatch} closeModal={closeModal} />}
    </>
  );
};
export default Gallery;
