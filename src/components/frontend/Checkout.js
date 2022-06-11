import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function Checkout () {
    
    var totalCartPrice = 0;
	const history = useHistory();
    const [ loading, setLoading ] =  useState(true);
    const [ cart, setCart ] =  useState([]);
    const [ checkoutInput, setCheckoutInput ] = useState({
      firstname : '',
      lastname : '',
      phone : '',
      email_address : '',
      address : '',
      city : '',
      state : '',
      zip_code : ''
    });
   
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

    const handleInput = (e) => {
    	e.persist();
        setCheckoutInput({...checkoutInput, [e.traget.name] : e.target.value });
    }

    const submitOrder = (e) => {
    	e.preventDefault();

    	const data => {
    	   firstname : checkoutInput.firstname,
	       lastname : checkoutInput.lastname,
	       phone : checkoutInput.phone,
	       email_address : checkoutInput.email_address,
	       address : checkoutInput.address,
	       city : checkoutInput.city,
	       state : checkoutInput.state,
	       zip_code : checkoutInput.zip_code
    	}

    	//6:34 https://www.youtube.com/watch?v=yWCjbcnyyRk&list=PLRheCL1cXHrtT6rOSlab8VzMKBlfL-IEA&index=30
    }

    if(loading){
       return (<h4>Loading Checkout...</h4>);
    }
   

   return (
      <div>
        <div className="py-3 bg-warning">
         <div className="container">
            <h6> Home / Checkout</h6>
         </div>
       </div>

       <div className="py-4">
         <div className="container">
            <div className="row">
             
              <div className="col-sm-7">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                 
                  <div className="card-body">

                    <div className="row">

                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label>First Name</label>
                         <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label>Last Name</label>
                         <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label>Phone</label>
                         <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-6">
                       <div className="form-group mb-3">
                         <label>Email Address</label>
                         <input type="text" name="email_address" onChange={handleInput} value={checkoutInput.email_address} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-12">
                       <div className="form-group mb-3">
                         <label>Full Address</label>
                         <textarea type="text" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                       </div>
                     </div>

                     <div className="col-md-4">
                       <div className="form-group mb-3">
                         <label>City</label>
                         <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-4">
                       <div className="form-group mb-3">
                         <label>State</label>
                         <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-4">
                       <div className="form-group mb-3">
                         <label>Zip Code</label>
                         <input type="text" name="zip_code" onChange={handleInput} value={checkoutInput.zip_code} className="form-control" />
                       </div>
                     </div>

                     <div className="col-md-12">
                       <div className="form-group mb-3">
                         <button type="button" onClick={submitOrder} className="btn btn-primary float-end">Place Order</button>
                       </div>
                     </div>
                    
                    </div>

                   </div>
                </div>
              </div>

               <div className="col-sm-5">
                 <table className="table table-bordered">
                   <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                   </thead>
                   <tbody>
                      { cart.map( (item, idx) => {
                        
                        totalCartPrice += item.products.selling_price * item.product_qty;

                        return(
                           <tr key={idx}>
                             <td>{ item.products.name }</td>
                             <td>{ item.products.selling_price }</td>
                             <td>{ item.product_qty }</td>
                             <td>{ item.products.selling_price * item.product_qty }</td>
                           </tr>
                        )

                      })}
                      <tr>
                        <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                        <td colSpan="2" className="text-end fw-bold">{ totalCartPrice }</td>
                      </tr>
                   </tbody>
                 </table>
               </div>

            </div>
          </div>
        </div>
      </div>
   )

}

export default Checkout;