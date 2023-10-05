import axios from 'axios';

const API_KEY = '38498125-064450863546d818faf9161ed';

const getImages = async (searchString, page, countInPage) => {
  const paramsObj = {
    key: API_KEY,
    q: searchString,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: countInPage,
    page: page,
  };
  const params = new URLSearchParams(paramsObj);
  return await axios.get(`https://pixabay.com/api/?${params}`);
};

export { getImages };
