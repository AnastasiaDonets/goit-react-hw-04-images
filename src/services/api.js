import axios from 'axios';

export const fetchImages = async (search, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    method: 'get',
    params: {
      key: '36506224-1c0ad3cf4d60fadf7dfb8bd7d',
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: page,
    },
  });
  return response.data.hits;
};
