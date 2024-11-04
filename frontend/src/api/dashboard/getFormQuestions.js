import { jotformApi } from '../axios'; 
import { urlConfig } from '../config';

export const fetchFormQuestions = (formID, _params = {}) => {
  const config = {
    method: 'get',
    url: `${urlConfig.forms.GET_INFO}${formID}/questions`,
    params: {
      ..._params,
    },
  };

  return jotformApi.request(config);
};
