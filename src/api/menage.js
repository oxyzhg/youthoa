import http from '@/utils/http';

export const getHygiene = (params = {}) => {
  return http.get('/hygiene/weeks', params);
};

export const deleteHygiene = (params = {}) => {
  return http.delete('/hygiene/weeks', params);
};
