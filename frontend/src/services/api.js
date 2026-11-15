/* API service for contact form submissions.
   Posts JSON to the Laravel /api/contact endpoint.
   Sets the X-CSRF-TOKEN header from the meta tag.
   Exports a single function used by the Contact component.
*/

import axios from 'axios';

export const contactApi = {
  submit: async (data) => {
    const response = await axios.post('/api/contact', data);
    return response.data;
  }
};