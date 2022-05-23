import React, { useState, useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import CategoryServices from '../../../services/CategoryServices';

function EditCategory ( props ) {

 const history = useHistory();

 const [ loading, setLoading ] = useState(true);
 const [ categoryInput , setCategory ] = useState([]);
 const [ error, setError] = useState([]);
 
 const handleInput = (e) => {
 	 setCategory({...categoryInput, [ e.target.name ] : e.target.value });
 }

 useEffect(()=> {
   
   const category_id = props.match.params.id;
   CategoryServices.getById(category_id).then( res => {
       if(res.data.status === 200)
       {
       	  setCategory(res.data.category);
       }
       else if(res.data.status === 404)
       {
            swal("Error", res.data.message,"error");
            history.push('admin/view-category');
       }

       setLoading(false);
   });

 },[props.match.params.id, history]);



 if(loading){
    return <h2>Loading Edit Category...</h2>;
 }

 const updateCategory = (e) => {
 	e.preventDefault();
    
    const data = categoryInput;
    const category_id = props.match.params.id;

 	 CategoryServices.update(category_id, data).then( res => {
        if(res.data.status === 200)
        {  
           swal("Success", res.data.message,"success");
           setError([]);
        }
        else if(res.data.status === 422)
        {  
           swal("All Fields are mandatories","","error");
           setError(res.data.validation_errors);
        }
        else if(res.data.status === 404)
        {
           swal("Error", res.data.message,"error");
           history.push('admin/view-category');
        }
 	})
 }


 return (
 	   <div className="container-fluid px-4">
	      <div className="card">
	       <div className="card-header">
	         <h4 className="mt-3">Edit Category
	          <Link to="/admin/view-category" className="btn btn-primary float-end btn-sm">Back</Link>
	         </h4>
	         <div className="card-body">
	            <form onSubmit={updateCategory}>
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
	                    <small className="text-danger">{error.slug}</small>
	                   </div>
	                   <div className="form-group mb-3">
	                    <label>Name</label>
	                    <input type="text" name="name" className="form-control"  onChange={handleInput} value={categoryInput.name}/>
	                    <small className="text-danger">{error.name}</small>
	                   </div>
	                   <div className="form-group mb-3">
	                    <label>Description</label>
	                    <textarea type="text" name="description" className="form-control" onChange={handleInput} value={categoryInput.description}></textarea>
	                    <small className="text-danger">{error.description}</small>
	                   </div>
	                   <div className="form-group mb-3">
	                    <label>Status</label>
	                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}/>
	                     <small className="text-danger">{error.status}</small>
	                   </div>
	                </div>
	                <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
	                   <div className="form-group mb-3">
	                    <label>Meta Title</label>
	                    <input type="text" name="meta_title" className="form-control"  onChange={handleInput} value={categoryInput.meta_title}/>
	                    <small className="text-danger">{error.meta_title}</small>
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
	       </div>
	     </div>
	  </div>
  )

}


export default EditCategory;