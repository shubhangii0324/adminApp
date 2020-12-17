import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../actions';
import { generatePublicUrl } from '../../UrlConfig';
import { Edit, Trash2 } from 'react-feather';
import Breadcrumb from '../common/breadcrumb';

/**
* @author
* @function Products
**/

const Products = (props) => {


  const [productCode, setProductCode] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mrpPrice, setMrpPrice] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [makingCost, setMakingCost] = useState('');
  const [gst, setGst] = useState('');
  const [size, setSize] = useState('')
  const [description, setDescription] = useState('');
  const [cluster, setCluster] = useState('');
  const [artisan, setArtisan] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {

    const form = new FormData();
    form.append('productCode', productCode);
    form.append('name', name);
    form.append('cluster', cluster);
    form.append('artisan', artisan);
    form.append('quantity', quantity);
    form.append('mrpPrice', mrpPrice);
    form.append('listPrice', listPrice);
    form.append('makingCost', makingCost);
    form.append('gst', setGst);
    form.append('size', size);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }


    dispatch(addProduct(form));
}

  const createCategoryList = (categories, options = []) => {

    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options;
  }


  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  const renderProducts = () => {
    return (
        <div className="row products-admin ratio_asos">
        {
            product.products.map(product =>
                <div className="col-xl-3 col-sm-6" key={product._id}>
                    <div className="card">
                        <div className="products-admin">
                            <div className="card-body product-box">
                                <div className="img-wrapper">
                                    <div className="front">
                                        <a className="bg-size">
                                        {product.productPictures.map(picture => 
                                            <img className="img-fluid blur-up bg-img lazyloaded" src={generatePublicUrl(picture.img)} /> 
                                        )}
                                       </a>
                                        <div className="product-hover">
                                            <ul>
                                                <li>
                                                    <button className="btn" type="button">
                                                        <Edit className="editBtn" />
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="btn" type="button">
                                                        <Trash2 className="deleteBtn" />
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-detail">
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <a> <h6>{product.name}</h6></a>
                                    <h4>{product.listPrice} <del >{product.mrpPrice}</del></h4>
                                    <ul className="color-variant">
                                        <li className="bg-light0"></li>
                                        <li className="bg-light1"></li>
                                        <li className="bg-light2"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            
        }
        </div>
        );
      }


  return (
      <Fragment>
          <Breadcrumb title="Product List" parent="Products" />
      <Container>
        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      </Fragment>
  )

}

export default Products