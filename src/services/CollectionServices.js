
import axios from 'axios';

class CategoryServices {

  getAll() {
    return axios.get(`/api/getCategory`);
  }
}

export default new CategoryServices();