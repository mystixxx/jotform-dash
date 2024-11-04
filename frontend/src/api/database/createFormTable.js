import { databaseApi } from '../axios'; 
import { urlConfig } from '../config';

export const createFormTable = async (formName, questions) => {
  const config = {
    method: 'post',
    url: urlConfig.forms.MAKE_FORM, 
    data: {
      formName,
      questions,
    },
  };

  try {
    const response = await databaseApi.request(config); 
    console.log('Table creation response:', response);
    return response; 
  } catch (error) {
    console.error('Error creating form table:', error);
    throw error; 
  }
};
