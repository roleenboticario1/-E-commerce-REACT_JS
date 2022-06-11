import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollectionServices from '../../../services/CollectionServices';

function ViewCategory () {

    
    const [ loading, setLoading ] =  useState(true);
    const [ category, setCategory ] =  useState([]);

	useEffect(() => {
    
    var isMounted = true;

    CollectionServices.getAll().then( res => {
        
        if(isMounted)
        {
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }

               setLoading(false);
        }
    });

    return () => {
         isMounted = false;
    }

	}, []);


	if(loading){
       return (<h4>Loading...</h4>);
	}else{
       
      var showCategoryList = '';
      showCategoryList = category.map( (item) => {
      	 return (
      	   <div className="col-md-4" key={item.id}>
             <div className="card">
               <Link to="">
                 <img src="" className="w-100" alt={item.name} />
               </Link>
                 <div className="card-body">
                   <Link to={`collections/${item.slug}`}>
                     <h5>{item.name}</h5>
                   </Link>
                 </div>
             </div>
           </div>
      	 )
      })

	}

    return(
        <div>
           <div className="py-3 bg-warning">
             <div className="container">
                <h6>Categoty Page</h6>
             </div>
           </div>
           <div className="py-3">
             <div className="container">
                <div className="row">
                   { showCategoryList  }
                </div>
             </div>
           </div>
        </div>
    )
}

export default ViewCategory;