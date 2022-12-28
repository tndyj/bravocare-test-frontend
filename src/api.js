import apisauce from 'apisauce';

const create = () => {
  const api = apisauce.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
    responseType: 'json',
  });

  const getAllShifts = () => api.get('/shifts');
  const compareShifts = (shift_ids) =>
    api.get('/shifts/compare', { shift_ids });
  const runQuery = (query, data) => api.get(`/queries/q${query}`, data);

  return {
    getAllShifts,
    compareShifts,
    runQuery,
  };
};

export default create();
