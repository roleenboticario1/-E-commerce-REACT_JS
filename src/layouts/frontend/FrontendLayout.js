import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';

import PublicRouteList from '../../routes/PublicRouteList';

const FrontendLayout = () => {

     return (
         <div>
            < Navbar />
                <div>
                    < Switch>
                        { PublicRouteList.map((routedata, idx)=>{
                            return (
                               routedata.component && (
                                   <Route 
                                       key={idx}
                                       path={routedata.path}
                                       exact={routedata.exact}
                                       name={routedata.name}
                                       render={(props)=>(
                                          <routedata.component{...props} />
                                       )}
                                   />
                               )
                            )
                          })
                        }
                    </ Switch>
                </div>
         </div>
     )
}

export default FrontendLayout; 