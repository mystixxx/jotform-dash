import { databaseApi } from '../axios'; 
import { urlConfig } from '../config';

export const importAnswers = async (formName, submissionData) => {
  const formToInsert = "form_" + formName
  const config = {
    method: 'post',
    url: `${urlConfig.forms.IMPORT_ANSWERS}${formToInsert}`, 
    data: {
      formName,
      submissionData,
    },
  };

  try {
    const response = await databaseApi.request(config); 
    return response; 
  } catch (error) {
    console.error('Error creating form table:', error);
    throw error; 
  }
};
