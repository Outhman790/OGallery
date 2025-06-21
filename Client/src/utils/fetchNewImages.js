import api from '../api';

const fetchNewImages = async (afterId) => {
  const res = await api.get('/new-images', { params: { after: afterId } });
  return res.data.images;
};

export default fetchNewImages;
