import { jotformApi } from '../axios'; 
import { urlConfig } from '../config';

export const fetchFormAnswers = (formID, _params = {}) => {
  const config = {
    method: 'get',
    url: `${urlConfig.forms.GET_INFO}${formID}/submissions`,
    params: {
      ..._params,
    },
  };

  return jotformApi.request(config);
};
