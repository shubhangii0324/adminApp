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

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [cluster, setCluster] = useState('');
  const [artisan, setArtisan] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();


  const handleClose = () => {

    const form = new FormData();
    form.append('name', name);
    form.append('cluster', cluster);
    form.append('artisan', artisan);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }


    dispatch(addProduct(form));


    setShow(false);
  }
  const handleShow = () => setShow(true);

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
                                    <h4>{product.price} <del >{product.price}</del></h4>
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

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Product'}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Cluster Name"
          value={cluster}
          placeholder={`Cluster Name`}
          onChange={(e) => setCluster(e.target.value)}
        />
        <Input
          label="Artisan Name"
          value={artisan}
          placeholder={`Artisan Name`}
          onChange={(e) => setArtisan(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>
        {
          productPictures.length > 0 ?
            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }
        <input type="file" name="productPicture" onChange={handleProductPictures} />
      </Modal>
    );
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }
  
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  }

  const renderProductDetailsModal = () => {

    if(!productDetails){
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={'Product Details'}
        size="lg"
      >

        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
        <Col md="6">
            <label className="key">Cluster Name</label>
            <p className="value">{productDetails.cluster}</p>
          </Col>
          <Col md="6">
            <label className="key">Artisan Name</label>
            <p className="value">{productDetails.artisan}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{display: 'flex'}}>
              {productDetails.productPictures.map(picture => 
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>  
              )}
            </div>
            
          </Col>
        </Row>

      </Modal>
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
      {renderAddProductModal()}
      {renderProductDetailsModal()}
      </Fragment>
  )

}

export default Products