import React, { useState } from 'react';
import swal from 'sweetalert';
import CategoryServices from '../../../services/CategoryServices';

function Category () {

    const [ categoryInput, setCategory ] = useState({
      'slug' : '',
      'name' : '',
      'description' : '',
      'meta_title' : '',
      'meta_keyword' : '',
      'meta_description' : '',
      'status': '',
       error_list : [],
    });

    const handleInput = (e) => {
      e.persist();
      setCategory({ ...categoryInput, [e.target.name]: e.target.value  });
    }

    const submitCategory = (e) => {
      e.preventDefault();

      const data = {
          'slug' : categoryInput.slug,
          'name' : categoryInput.name,
          'description' : categoryInput.description,
          'meta_title' : categoryInput.meta_title,
          'meta_keyword' : categoryInput.meta_keyword,
          'meta_description' : categoryInput.meta_description,
          'status' : categoryInput.status
      }

      CategoryServices.create(data).then( res => {
         if(res.data.status === 200)
         {
            swal("Success", res.data.message,"success");
            document.getElementById('CATEGORY_FORM_RESET').reset();
         }
         else if(res.data.status === 400)
         {
            setCategory({ ...categoryInput, error_list: res.data.validation_errors });
         }
      });
    }

    var display_errors = [];
    if(categoryInput.error_list){
        display_errors = [
           categoryInput.error_list.slug,
           categoryInput.error_list.name,
           categoryInput.error_list.meta_title,
        ]
    }

    return(
       <div className="container-fluid px-4">
           <h1 className="mt-4">Add Category</h1>
           {
              display_errors.map((item) => {
                 return( <p className="mb-1 text-danger" key={item}>{item}</p>)
              })
            } 
            <form onSubmit={submitCategory} id="CATEGORY_FORM_RESET">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                     <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
               </li>
               <li className="nav-item" role="presentation">
                   <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="profile" aria-selected="false">SEO Tags</button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                   <div className="form-group mb-3">
                    <label>Slug</label>
                    <input type="text" name="slug" className="form-control"  onChange={handleInput} value={categoryInput.slug}/>
                   </div>
                   <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control"  onChange={handleInput} value={categoryInput.name}/>
                   </div>
                   <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea type="text" name="description" className="form-control" onChange={handleInput} value={categoryInput.description}></textarea>
                   </div>
                   <div className="form-group mb-3">
                    <label>Status</label>
                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}/>
                   </div>
                </div>
                <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                   <div className="form-group mb-3">
                    <label>Meta Title</label>
                    <input type="text" name="meta_title" className="form-control"  onChange={handleInput} value={categoryInput.meta_title}/>
                   </div>
                   <div className="form-group mb-3">
                    <label>Meta Keyword</label>
                    <input type="text" name="meta_keyword" className="form-control"  onChange={handleInput} value={categoryInput.meta_keyword}/>
                   </div>
                   <div className="form-group mb-3">
                    <label>Meta Description</label>
                    <textarea type="text" name="meta_description" className="form-control" onChange={handleInput} value={categoryInput.meta_description}></textarea>
                   </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary px-4 mt-4 float-end">Submit</button>
            </form>
       </div>
    )
}

export default Category;