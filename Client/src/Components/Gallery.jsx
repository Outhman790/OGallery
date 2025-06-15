import Navbar from '../Components/Navbar';
import LoginNavbar from '../Components/LoginNavbar';
import AddImage from './addImage';
import Image from './Image';
import SkeletonCard from './SkeletonCard';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useImageContext } from '../Context/ImageContext';
import { useAuth } from '../Context/AuthContext';
import Modal from './imageModal';
import useInfiniteScrollLoader from '../hooks/useInfiniteScrollLoader';
import fetchImagesFromAPI from '../utils/fetchImages';

const Gallery = () => {
  const { images, dispatch } = useImageContext();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const limit = 12;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const { images: newImages, total } = await fetchImagesFromAPI(page, limit);

      dispatch({
        type: page === 1 ? 'GET_IMAGES' : 'APPEND_IMAGES',
        payload: newImages,
      });

      const loaded = (page - 1) * limit + newImages.length;
      if (loaded >= total || newImages.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, dispatch]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useInfiniteScrollLoader(loader, { hasMore, loading }, () => setPage((p) => p + 1));

  return (
    <>
      {user ? <LoginNavbar /> : <Navbar />}

      <div className="flex justify-center items-center mt-10">
        <p className="text-center p-2 font-medium md:text-xl">{`Images number is: ${images.length}`}</p>
        <hr className="border-l border-gray-300 h-10 mr-3" />
        <button
          onClick={openModal}
          className="bg-indigo-600 font-sans text-white py-2 px-3 rounded"
        >
          Add an image
        </button>
      </div>

      <div className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-16 pt-10 mx-auto transition ease-in-out duration-300">
        {images.map((item) => (
          <div key={item.id} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
            <Image {...item} />
          </div>
        ))}

        {loading &&
          page === 1 &&
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={`skeleton-${idx}`} />)}
      </div>

      {hasMore && (
        <div
          ref={loader}
          className="w-full container max-w-[1200px] grid place-items-center grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-16 pt-10 mx-auto mb-20 transition ease-in-out duration-300"
        >
          {loading &&
            page > 1 &&
            Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={`skeleton-${idx}`} />)}
        </div>
      )}

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      {isModalOpen && <AddImage dispatch={dispatch} closeModal={closeModal} />}
    </>
  );
};

export default Gallery;
