
import axios from 'axios';

class CategoryServices {

  getAll() {
    return axios.get(`/api/category`);
  }

  create(data) {
    return axios.post('/api/store-category', data);
  }

  delete(id){
    return axios.delete(`api/delete-category/${id}`);
  }

  getById(category_id){
     return axios.get(`api/edit-category/${category_id}`);
  }

  update(category_id, data){
    return axios.put(`api/update-category/${category_id}`, data)
  }

}

export default new CategoryServices();