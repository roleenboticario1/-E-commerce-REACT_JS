import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductServices from '../../../services/ProductServices';

function ViewProduct () {

  const [ loading, setLoading ] = useState(true);
  const [ productList, setProductList ] = useState([]);

  document.title = "View Products";

  useEffect(() => {
     
    ProductServices.getAll().then( res =>{
      
       if(res.data.status === 200)
       {
          setProductList(res.data.product);
       }
       
       setLoading(false);

    });

  }, []);

  var HTML_TABLE  = '';
  if(loading){
     return <h2>Loading...</h2>;
  }else{  

    var status = '';
    HTML_TABLE = productList.map((item) => {
       if(item.status === 0)
       {
          status = 'Shown';
       }
       else
       {
          status = 'Hidden';
       }

       return(
         <tr key={item.id}>
           <td>{item.id}</td>
           <td>{item.categories.name}</td>
           <td>{item.name}</td>
           <td>{item.selling_price}</td>
           <td><img src={`http://localhost:8000/${item.image}`} width="50px" height="50px" alt="{item.name}"/></td>
           <td>
             <Link to={`edit-product/${item.id}`} className="btn btn-warning btn-sm text-white">Edit</Link>
           </td>
            <td>
              { status }
           </td>
         </tr>
           )

        });
  }

    return(
        <div className="container">
          <div className="card">
           <div className="card-header">
             <h4 className="mt-3">View Products
              <Link to="/admin/add-product" className="btn btn-primary float-end btn-sm">Add Product</Link>
             </h4>
             <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                      <thead>
                        <tr>
                           <th>ID</th>
                           <th>Category Name</th>
                           <th>Product Name</th>
                           <th>Selling Price</th>
                           <th>Image</th>
                           <th>Edit</th>
                           <th>Status</th>
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
        </div>
    )
}

export default  ViewProduct;

