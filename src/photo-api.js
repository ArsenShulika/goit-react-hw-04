import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const ACCESS_KEY = '9mzDC2Ltqp5mH7OY07jxQB_c57vugNWKyjewCTR-TaA';

export const getPhotos = async (topic, currentPage) => {
  const response = await axios.get('search/photos', {
    params: {
      client_id: ACCESS_KEY,
      query: topic,
      page: currentPage,
      per_page: 10,
      orientation: 'landscape',
    },
  });
  console.log(response.data.results);
  return response.data.results;
};
