import React, {Component, Fragment} from 'react';
import Signup from './index';
import { ArrowLeft, Sliders } from 'react-feather';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import stats from '../../assets/images/dashboard/stats.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


/**
* @author
* @function Register
**/

const Register = (props) => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false
    };
    
  return(
    <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 p-0 card-left">
                                    <div className="card bg-primary">
                                        <div className="svg-icon">
                                            <img src={stats} className="Img-fluid" />
                                        </div>
                                        <Slider className="single-item" {...settings}>
                                            <div>
                                            </div>
                                            <div>
                                            </div>
                                            <div>
                                                <div>
                                                </div>
                                            </div>
                                        </Slider >
                                    </div>
                                </div>
                                <div className="col-md-7 p-0 card-right">
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <Signup />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
   )

 }

export default Register