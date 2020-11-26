import React, { Fragment, useState, useCallback } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.actions';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, RichUtils } from 'draft-js';

/**
* @author
* @function AddProduct
**/

const AddProduct = (props) => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
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
}

const handleChange = (e) => {
    setQuantity(e.target.value);
}

/* const handleKeyCommand = useCallback((command, description) => {
    const newState = RichUtils.handleKeyCommand(description, command)
    if (newState) {
      setDescription(newState)

      return "handled"
    }
    return "not-handled"
}) */

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


  return(
      <Fragment>
          <Breadcrumb title="Add Product" parent="Products" />
          <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Add Product</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-5">
                                            <div className="add-product">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form">
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Product Name :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={name} onChange={(e) => setName(e.target.value)} name="product_name" id="validationCustom01" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Cluster Name :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={cluster} onChange={(e) => setCluster(e.target.value)} name="cluster_name" id="validationCustom01" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Artisan Name :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" value={artisan} onChange={(e) => setArtisan(e.target.value)} name="artisan_name" id="validationCustom01" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control mb-0" value={price} onChange={(e) => setPrice(e.target.value)} name="price" id="validationCustom02" type="number" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Total Products :</label>
                                                        <fieldset className="qty-box ml-0">
                                                            <div className="input-group bootstrap-touchspin">
                                                                <div className="input-group-prepend">
                                                                    <button className="btn btn-primary btn-square bootstrap-touchspin-down" type="button" onClick={() => setQuantity(quantity - 1)} >
                                                                        <i className="fa fa-minus"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text bootstrap-touchspin-prefix" ></span>
                                                                </div>
                                                                <input className="touchspin form-control" type="text" value={quantity} onChange={handleChange} />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                                                </div>
                                                                <div className="input-group-append ml-0">
                                                                    <button className="btn btn-primary btn-square bootstrap-touchspin-up" type="button" onClick={() => setQuantity(quantity + 1)}>
                                                                        <i className="fa fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                    <label className="col-xl-3 col-sm-4 mb-0">Category :</label>
                                                    <div className="col-xl-8 col-sm-7">
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
                                                    </div>
                                                    </div>
                                                    {
                                                        productPictures.length > 0 ?
                                                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                                                    }
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Product Pictures :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                        <input className="form-control" id="validationCustom02" type="file" name="categoryImage" onChange={handleProductPictures} />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                        <div className="col-xl-8 col-sm-7 description-sm">
                                                       
                                                       <textarea cols="25" rows="14" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} /> 
                                                       {/* <Editor
                                                            editorState={description}
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                            handleKeyCommand={handleKeyCommand} 
                                                            onChange={setDescription}
                                                        /> */}

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" className="btn btn-primary" onClick={handleClose}>Add</button>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
      </Fragment>
   )

 }

export default AddProduct