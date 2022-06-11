import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Cart () {
  
  	const history = useHistory();
    const [ loading, setLoading ] =  useState(true);
    const [ cart, setCart ] =  useState([]);
    var totalCartPrice = 0;
    

    //check User logged in or not
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
   

    const handleDecrement = (cart_id) => {
        setCart(cart => 
            cart.map( (item) => cart_id === item.id ? { ...item, product_qty : item.product_qty - ( item.product_qty > 1 ? 1 : 0 ) } : item
          )
        );
        updateQuantity(cart_id, "dec");
    }

    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map( (item) => cart_id === item.id ? { ...item, product_qty : item.product_qty + ( item.product_qty < 10 ? 1 : 0 ) } : item
          )
        );
        updateQuantity(cart_id, "inc");
    }

    function updateQuantity(cart_id, scope){
        axios.put(`api/cart/update-quantity/${cart_id}/${scope}`).then(res=>{
            // if(res.data.status === 200)
            // {   
            //     swal("Success",res.data.message,"success");
            // }
        });
    }

    const deleteCartItem = (e, cart_id ) => {
        e.preventDefault();

        const thisCliked = e.currentTarget;

        thisCliked.innerText = "Removing";

        axios.delete(`api/cart/delete-cart-item/${cart_id}`).then(res => {
            if(res.data.status === 200)
            {  
                swal("Success",res.data.message,"success");
                thisCliked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"Error");
                thisCliked.innerText = "Remove";
            }
        });
    }

    if(loading){
       return (<h4>Loading Product Cart...</h4>);
    }
   
    var CART_TABLE = '';

    if(cart.length > 0)
    {
      CART_TABLE = <div className="table-responsive">
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

                          totalCartPrice += item.products.selling_price * item.product_qty;

                           return(
                              <tr key={idx}>
                               <td width="10%">
                                 <img src={`http://localhost:8000/${item.products.image}`} alt="{item.products.image}" width="70px" height="70px" />
                               </td>
                               {/* products came from cart model It's a relatioship. use relationship coz the other column is in usertables not in carts table*/}
                               <td>{ item.products.name }</td>
                               <td width="15%" className="text-center">{ item.products.selling_price }</td>
                               <td width="15%">
                                  <div className="input-group">
                                     <button type="button" onClick={ () => handleDecrement(item.id) } className="input-group-text">-</button>
                                     <div className="form-control text-center">{item.product_qty}</div>
                                     <button type="button" onClick={ () => handleIncrement(item.id) } className="input-group-text">+</button>
                                  </div>
                               </td>
                               <td width="15%" className="text-center">{ item.products.selling_price * item.product_qty }</td>
                               <td width="10%">
                                  <button type="button" onClick={(e) => deleteCartItem(e, item.id) } className="btn btn-danger btn-sm">Remove</button>
                               </td>
                              </tr>
                           )
                        })}
                      </tbody>
                    </table>
                 </div>
    }else{
       CART_TABLE = <div>
                      <div className="card card-body py-5 text-center shadow-sm">
                        <h4>Your Shopping Cart is Empty</h4>
                      </div>
                    </div>
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
                { CART_TABLE }
              </div>
              
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <div className="card card-body mt-3">
                  <h4> Sub Total : 
                    <span className="float-end">{ totalCartPrice }</span>
                  </h4>
                  <h4>Grand Total : 
                    <span className="float-end">{ totalCartPrice }</span>
                  </h4>
                  <hr />
                  <Link to="/checkout" className="btn btn-primary"> Checkout </Link>
                </div>
              </div>

            </div> 
         </div>
       </div>
     </div>
   )

}

export default Cart;