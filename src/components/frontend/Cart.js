import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Cart () {
  
  	const history = useHistory();
    const [ loading, setLoading ] =  useState(true);
    const [ cart, setCart ] =  useState([]);

    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning","Login to goto cart Page","error");
    }

    useEffect(() => {
    
    var isMounted = true;

    axios.get(`/api/cart/`).then( res => {
        
        if(isMounted)
        {
            if(res.data.status === 200)
            {   
                setCart(res.data.cart);
                setLoading(false);
            }
            else if(res.data.status === 401)
            {
                history.push('/');
                swal("Warning",res.data.message,"error");
            }
        }
    });

    return () => {
       isMounted = false;
    }

    }, [history]);
   

   if(loading){
       return (<h4>Loading Product Cart...</h4>);
   }else{

   }

    return (
     <div>
       <div className="py-3 bg-warning">
         <div className="container">
            <h6> Home / Cart</h6>
         </div>
       </div>

       <div className="py-4">
         <div className="container">
            <div className="row">
              
              <div className="col-sm-12">
     
                 <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Total Price</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        { cart.map( (item, idx) => {
                           return(
                              <tr key={idx}>
                               <td width="10%">
                                 <img src={`http://localhost:8000/${item.products.image}`} alt="{item.products.image}" width="70px" height="70px" />
                               </td>
                               {/* products came from cart model It's a relatioship. use relationship coz the other column is in usertables not in carts table*/}
                               <td>{ item.products.name }</td>
                               <td width="15%" className="text-center">500</td>
                               <td width="15%">
                                  <div className="input-group">
                                     <button type="button" className="input-group-text">-</button>
                                     <div className="form-control text-center">{item.product_qty}</div>
                                     <button type="button" className="input-group-text">+</button>
                                  </div>
                               </td>
                               <td width="15%" className="text-center">{ item.products.selling_price * item.product_qty }</td>
                               <td width="10%">
                                  <button type="button" className="btn btn-danger btn-sm">Remove</button>
                               </td>
                              </tr>
                           )
                        })}
                      </tbody>
                    </table>
                 </div>

              </div>

            </div> 
         </div>
       </div>
     </div>
   )

}

export default Cart;