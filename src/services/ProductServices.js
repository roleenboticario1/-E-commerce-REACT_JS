
import axios from 'axios';

class ProductServices {

  getAll() {
    return axios.get(`/api/view-product`);
  }

  create(data) {
    return axios.post(`api/store-product`, data);
  }

  delete(id){
    return axios.delete(`api/delete-category/${id}`);
  }

  getById(product_id){
     return axios.get(`api/edit-product/${product_id}`);

  }

  update(product_id, data){
    return axios.post(`api/update-product/${product_id}`, data);
  }

}

export default new ProductServices();