import { jotformApi } from '../axios'; 
import { urlConfig } from '../config';

export const fetchUserInfo = (_params = {}) => {
  const config = {
    method: 'get',
    url: urlConfig.user.GET_INFO,
    params: {
      ..._params,
    },
  };

  return jotformApi.request(config);
};
