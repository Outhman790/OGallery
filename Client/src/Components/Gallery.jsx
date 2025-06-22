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
import fetchNewImages from '../utils/fetchNewImages';
import { cn } from '../lib/utils';

const Gallery = () => {
  const { images, dispatch } = useImageContext();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [newCount, setNewCount] = useState(0);
  const [bannerTop, setBannerTop] = useState(0);
  const [animatingIds, setAnimatingIds] = useState([]);
  const loader = useRef(null);
  const navRef = useRef(null);
  const pollingRef = useRef(null);
  const imagesRef = useRef(images);
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

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    const poll = async () => {
      try {
        if (!imagesRef.current.length) return;
        const afterId = imagesRef.current[0]?.id || 0;
        const fresh = await fetchNewImages(afterId);
        if (fresh.length > 0) {
          setNewImages(fresh);
          setNewCount(fresh.length);
        }
      } catch (err) {
        console.error('Failed to fetch new images:', err);
      }
    };

    poll();
    pollingRef.current = setInterval(poll, 30000);

    return () => clearInterval(pollingRef.current);
  }, []);

  useInfiniteScrollLoader(loader, { hasMore, loading }, () => setPage((p) => p + 1));

  useEffect(() => {
    const updateBannerTop = () => {
      const navHeight = navRef.current?.offsetHeight || 0;
      const scrollY = window.scrollY;
      setBannerTop(scrollY < 50 ? navHeight : 0);
    };

    updateBannerTop(); // on mount
    window.addEventListener('scroll', updateBannerTop);
    window.addEventListener('resize', updateBannerTop); // handle nav height changes

    return () => {
      window.removeEventListener('scroll', updateBannerTop);
      window.removeEventListener('resize', updateBannerTop);
    };
  }, []);

  return (
    <>
      {user ? <LoginNavbar ref={navRef} /> : <Navbar ref={navRef} />}
      {newCount > 0 && (
        <div
          onClick={() => {
            dispatch({ type: 'PREPEND_IMAGES', payload: newImages });
            setNewImages([]);
            setNewCount(0);
          }}
          style={{ top: bannerTop }}
          className="sticky w-full left-0 z-50
      bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-center 
      px-4 py-3 text-sm sm:text-base md:text-lg
      transition-all duration-300 ease-in-out
      hover:from-indigo-500 hover:to-indigo-700 hover:shadow-md hover:cursor-pointer
      active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-600
      animate-[fadeIn_0.8s_ease-in-out_forwards]"
        >
          {`${newCount} new images available – click to load`}
        </div>
      )}
      <div className="flex justify-center items-center mt-4">
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
          <div
            key={item.id}
            className={cn(
              'cursor-pointer',
              animatingIds.includes(item.id) && 'animate-in fade-in zoom-in-95 duration-500',
            )}
            onClick={() => setSelectedItem(item)}
            onAnimationEnd={() => setAnimatingIds((ids) => ids.filter((id) => id !== item.id))}
          >
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
