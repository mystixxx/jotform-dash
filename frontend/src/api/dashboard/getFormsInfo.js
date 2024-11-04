import { jotformApi } from '../axios'; 
import { urlConfig } from '../config';

export const fetchFormInfo = (formID, _params = {}) => {
  const config = {
    method: 'get',
    url: `${urlConfig.forms.GET_INFO}${formID}`,
    params: {
      ..._params,
    },
  };

  return jotformApi.request(config);
};
