import React, { Component, useEffect } from 'react'
import Sidebar from './common/sidebar_components/sidebar';
import RightSidebar from './common/right-sidebar';
import Footer from './common/footer';
import Header from './common/header_components/header';
import { useDispatch, useSelector} from 'react-redux';
import { isUserLoggedIn, getInitialData } from '../actions';

/**
* @author
* @function App
**/

const App = (props) => {

    const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
      dispatch(getInitialData());
    

  }, [auth.authenticate]);

  return(
    <div>
                <div className="page-wrapper" >
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar />
                        <RightSidebar />
                        <div className="page-body">
                            {props.children}
                        </div>
                            <Footer />
                    </div>
                </div>
    </div>
   )

 }

export default App