import api from '../api';

const fetchImagesFromAPI = async (page, limit) => {
  const res = await api.get('/all-images', { params: { page, limit } });
  return {
    images: res.data.images,
    total: res.data.total,
  };
};

export default fetchImagesFromAPI;
