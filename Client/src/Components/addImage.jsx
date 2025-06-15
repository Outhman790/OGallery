import { useState } from 'react';
import AddImageForm from './addImageForm';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import api from '../api';
import { showSuccessToast, showErrorToast } from '../lib/toast';
const AddImage = ({ closeModal, dispatch }) => {
  const { user } = useAuth();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const data = new FormData();
      console.log('formData:', formData);
      data.append('title', formData.name);
      data.append('description', formData.imageDescription);
      data.append('category_name', formData.category);
      data.append('tags', JSON.stringify(formData.tags));
      data.append('image', formData.imageFile[0]);

      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      closeModal();
      dispatch({ type: 'ADD_IMAGE', payload: res.data });
      showSuccessToast('Image uploaded successfully!', 3000);
    } catch (err) {
      console.error('Upload failed:', err);
      showErrorToast(`Failed to upload image !! ${err}`, 3000);
    } finally {
      setLoading(false);
    }
  };
  console.log(user);
  return user?.role ? (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[375px] mx-auto py-3 rounded-md lg:flex lg:justify-center lg:items-center lg:gap-8 bg-gray-300 lg:max-w-[50rem] lg:h-[34rem] lg:p-10"
      >
        <IoClose
          className="absolute lg:top-2 lg:right-2 top-1 right-[2px] text-2xl text-gray-400 hover:text-gray-700 hover:cursor-pointer"
          onClick={closeModal}
        />
        {image && (
          <div>
            <img
              className="mx-auto p-4 md:pl-10 md:h-[400px] object-cover max-w-[350px] lg:max-w-[400px]"
              src={image}
              alt="tempImg"
            />
          </div>
        )}
        <div>
          <AddImageForm onSubmit={onSubmit} setImage={setImage} />
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <BounceLoader color="#4f46e5" />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AddImage;
