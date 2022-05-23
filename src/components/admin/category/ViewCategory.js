import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import CategoryServices from '../../../services/CategoryServices';

function ViewCategory () {

  const [ loading, setLoading ] = useState(true);
  const [ categoryList, setCategotyList ] = useState([]);

  useEffect(() => {
     
    CategoryServices.getAll().then( res =>{
      
       if(res.data.status === 200)
       {
          setCategotyList(res.data.category);
       }
       
       setLoading(false);

    });

  }, []);

  
  const deleteCategory = (e, id) => {
     e.preventDefault();

     const thisCliked = e.currentTarget;
     thisCliked.innerText = "Deleting";

      CategoryServices.delete(id).then( res => {
         if(res.data.status === 200)
         {
             swal("Success",res.data.message,"success");
             thisCliked.closest("tr").remove();
         }
         else if(res.data.status === 404)
         { 
             swal("Success",res.data.message,"success");
             thisCliked.closest("tr").remove();
         }
     });
  }

  
  var HTML_TABLE  = '';
  if(loading){
     return <h2>Loading...</h2>;
  }else{
   
    HTML_TABLE = categoryList.map((item) => {
       return(
         <tr key={item.id}>
           <td>{item.id}</td>
           <td>{item.name}</td>
           <td>{item.slug}</td>
           <td>{item.status}</td>
           <td>
             <Link to={`edit-category/${item.id}`} className="btn btn-warning btn-sm text-white">Edit</Link>
           </td>
            <td>
             <button type="button" onClick={ (e) => deleteCategory(e, item.id) }className="btn btn-danger btn-sm">Delete</button>
           </td>
         </tr>
       )
    });
  }

   return(
    <div className="container">
      <div className="card">
       <div className="card-header">
         <h4 className="mt-3">Category List
          <Link to="/admin/add-category" className="btn btn-primary float-end btn-sm">Add Category</Link>
         </h4>
         <div className="card-body">
            <table className="table table-bordered">
      			  <thead>
      			    <tr>
      			       <th>ID</th>
  	               <th>Name</th>
  	               <th>Slug</th>
  	               <th>Status</th>
  	               <th>Edit</th>
  	               <th>Delete</th>
      			    </tr>
      			  </thead>
      			  <tbody>
               { HTML_TABLE }
      			  </tbody>
      			</table>
         </div>
       </div>
     </div>
    </div>
   )
}

export default ViewCategory;