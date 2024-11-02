import axios from '../axios';
import { urlConfig } from '../config';

export const fetchUserForms = (_params = {}) => {
  const config = {
    method: 'get',
    url: urlConfig.user.GET_FORMS,
    params: {
      ..._params,
    },
  };

  return axios.request(config);
};
