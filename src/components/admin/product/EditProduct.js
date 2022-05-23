import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import ProductServices from '../../../services/ProductServices';
import CategoryServices from '../../../services/CategoryServices';
 
function EditProduct (props) {
    
    const history = useHistory();
    const [ loading, setLoading ] = useState(true);
    const [ categoryList, setCategotyList ] = useState([]);
    const [ errorList , setError ] = useState([]);
    const [ productInput, setProduct ] = useState({
      'category_id' : '',
      'slug' : '',
      'name' : '',
      'description' : '',
      'meta_title' : '',
      'meta_keyword' : '',
      'meta_description' : '',
      'selling_price' : '',
      'original_price' : '',
      'qty' : '',
      'brand' : '',
      'featured' : '',
      'popular' : '',
      'status' : '',
    });

    const [picture , setPicture ] = useState([]);

    const handleInput = (e) => {
        e.persist()
        setProduct({ ...productInput, [e.target.name] : e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image : e.target.files[0] });
    }
   

    const [ allcheckbox, setCheckBox ] = useState([]);

    const handleCheckBox = (e) => {
      e.persist();
      setCheckBox({...allcheckbox, [e.target.name ]: e.target.checked });
    }

    useEffect(() => {

      CategoryServices.getAll().then( res => {
          if(res.data.status === 200)
          {
              setCategotyList(res.data.category);
          }
      });

      const product_id = props.match.params.id;

      ProductServices.getById(product_id).then( res => {
       if(res.data.status === 200)
       {
          setProduct(res.data.product);
          setCheckBox(res.data.product);
       } 
       else if(res.data.status === 404)
       {
          swal("Error", res.data.message,"error");
          history.push('admin/view-product');
       }
       setLoading(false);
     });

    }, [props.match.params.id, history]);

    const UpdateProduct = (e) => {
        e.preventDefault();

        const product_id = props.match.params.id;

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);
        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_description', productInput.meta_description);
        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', allcheckbox.featured ? 1 : 0);
        formData.append('popular', allcheckbox.popular ? 1 : 0);
        formData.append('status', allcheckbox.status ? 1 : 0);

        ProductServices.update(product_id, formData).then( res => {
           if(res.data.status === 200)
           {
              swal("Success", res.data.message,"success");
              console.log(allcheckbox)
              setError([]); //this remove all the fields

           }
           else if(res.data.status === 422)
           {
              swal("All Fiedlds are mandatory","","error");
              setError(res.data.validation_errors);
           }
           if(res.data.status === 404)
           {
              swal("Error", res.data.message,"error");
              history.push('admin/view-product');
           }
        });
    }


    if(loading){
       return <h2>Loading Edit Product...</h2>;
    }

    return(
      <div className="container-fluid px-4">
        <div className="card">
           <div className="card-header">
              <h4 className="mt-3">Edit Product
               <Link to="/admin/view-product" className="btn btn-primary float-end btn-sm">View Product</Link>
              </h4>
           </div>
           <div className="card-body">
             <form onSubmit={UpdateProduct} encType="multipart/form-data">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO tags</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other details</button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                        <label>Select Category</label>
                         <select name="category_id" className="form-control" onChange={handleInput} value={productInput.category_id}>
                           <option value="">Select Category</option>
                           {
                               categoryList.map( (item) => {
                                  return(
                                    <option value={item.id} key={item.id}>{ item.name }</option>
                                  )
                               })
                           }
                         </select>
                         <span className="text-danger">{errorList.category_id}</span>
                    </div>
                    <div className="form-group mb-3">
                       <label>Slug</label>
                       <input type="" name="slug" className="form-control"  onChange={handleInput} value={productInput.slug}/>
                        <span className="text-danger">{errorList.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                       <label>Name</label>
                       <input type="" name="name" className="form-control"  onChange={handleInput} value={productInput.name}/>
                        <span className="text-danger">{errorList.name}</span>
                    </div>
                    <div className="form-group mb-3">
                       <label>Description</label>
                       <textarea type="" name="description" className="form-control"onChange={handleInput} value={productInput.description}></textarea>
                       <span className="text-danger">{errorList.description}</span>
                    </div>
                  </div>
                  <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                    <div className="form-group mb-3">
                      <label>Meta Title</label>
                      <input type="text" name="meta_title" className="form-control" onChange={handleInput} value={productInput.meta_title}/>
                      <span className="text-danger">{errorList.meta_title}</span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Meta Keyword</label>
                      <textarea type="text" name="meta_keyword" className="form-control" onChange={handleInput} value={productInput.meta_keyword}></textarea>
                      <span className="text-danger">{errorList.meta_keyword}</span>
                    </div>
                    <div className="form-group mb-3">
                      <label>Meta Description</label>
                      <textarea type="text" name="meta_description" className="form-control" onChange={handleInput} value={productInput.meta_description}></textarea>
                     <span className="text-danger">{errorList.meta_description}</span>
                    </div>
                  </div>
                  <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                    <div className="row">
                      <div className="col-md-4 form-group mb-3">
                        <label>Selling Price</label>
                        <input type="text" name="selling_price" className="form-control" onChange={handleInput} value={productInput.selling_price}/>
                        <span className="text-danger">{errorList.selling_price}</span>
                      </div>
                      <div className="col-md-4 form-group mb-3">
                        <label>Original Price</label>
                        <input type="text" name="original_price" className="form-control" onChange={handleInput} value={productInput.original_price}/>
                        <span className="text-danger">{errorList.original_price}</span>
                      </div>
                      <div className="col-md-4 form-group mb-3">
                        <label>Quantity</label>
                        <input type="text" name="qty" className="form-control" onChange={handleInput} value={productInput.qty}/>
                        <span className="text-danger">{errorList.qty}</span>
                      </div>
                      <div className="col-md-4 form-group mb-3">
                        <label>Brand</label>
                        <input type="text" name="brand" className="form-control" onChange={handleInput} value={productInput.brand}/>
                        <span className="text-danger">{errorList.brand}</span>
                      </div>
                       <div className="col-md-8 form-group mb-3">
                        <label>Product Image</label>
                        <input type="file" name="image" className="form-control" onChange={handleImage}/>
                        <img src={`http://localhost:8000/${productInput.image}`} width="50px" height="50px" alt="{productInput.name}"/>
                        <span className="text-danger">{errorList.image}</span>
                      </div>
                        <div className="col-md-4 form-group mb-3">
                        <label>Feature (checked-show)</label>
                        <input type="checkbox" name="featured" className="w-50 h-50" onChange={handleCheckBox} defaultChecked={allcheckbox.featured === 1 ? true : false }/>
                        <span className="text-danger">{errorList.featured}</span>
                      </div>
                      <div className="col-md-4 form-group mb-3">
                        <label>Popular (checked-show)</label>
                        <input type="checkbox" name="popular" className="w-50 h-50" onChange={handleCheckBox} defaultChecked={allcheckbox.popular === 1 ? true : false }/>
                        <span className="text-danger">{errorList.popular}</span>
                      </div>
                      <div className="col-md-4 form-group mb-3">
                        <label>Status (checked-hidden)</label>
                        <input type="checkbox" name="status" className="w-50 h-50" onChange={handleCheckBox} defaultChecked={allcheckbox.status === 1 ? true : false }/>
                         <span className="text-danger">{errorList.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary px-4 float-end mt-4">Submit</button>
              </form>
           </div>
        </div>
      </div>
    )
}

export default  EditProduct;