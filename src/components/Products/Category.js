import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategory,
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions';
import { generatePublicUrl } from '../../UrlConfig';
import Modal from '../UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './UpdateCategoriesModal';
import AddCategoryModal from './AddCategoryModal';

/**
* @author
* @function Category
**/

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();


    useEffect(() => {

        if (!category.loading) {
            setShow(false);
        }

    }, [category.loading]);


    const handleClose = () => {

        const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });

    const classes = useStyles();

    const renderCategories = () => {

      

        return (
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">MRP</TableCell>
                  <TableCell align="right">List Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Cluster</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
          product.products.length > 0 ?
            product.products.map(product =>
              <TableRow>
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">{product.mrpPrice}</TableCell>
                <TableCell align="right">{product.listPrice}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.category.name}</TableCell>
                <TableCell align="right">{product.cluster}</TableCell>
                <TableCell align="right">
                <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
                <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}></i>
                </TableCell>
              </TableRow>
            ) : null
      }
              </TableBody>
              </Table>
      </TableContainer>
              
            
          );
    }

    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
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
              <Col md="4">
                <label className="key">Name</label>
                <p className="value">{productDetails.name}</p>
              </Col>
              <Col md="4">
                <label className="key">MRP Price</label>
                <p className="value">{productDetails.mrpPrice}</p>
              </Col>
              <Col md="4">
                <label className="key">List Price</label>
                <p className="value">{productDetails.listPrice}</p>
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
                <textarea className="key">Description</textarea>
                <p className="value">{productDetails.description}</p>
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

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }

        setDeleteCategoryModal(false);


    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >


                <h5>Expanded</h5>
                { expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                { checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}

            </Modal>
        );
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product Table</h3>
                            <div className="actionBtnContainer btn-popup pull-right">
                                <button style={{margin: "5px"}} type="button" className="btn btn-primary" onClick={handleShow}><IoIosAdd /> <span>Add Category</span></button>
                                {/* <button style={{margin: "5px"}} type="button" className="btn btn-primary" onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                                <button style={{margin: "5px"}} type="button" className="btn btn-primary" onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></button> */}
                            </div>

                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        
                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {renderCategories()}
                                    </div>
                    </Col>
                </Row>
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {/* {renderAddCategoryModal()} */}
            {renderDeleteCategoryModal()}
            {renderProductDetailsModal()}
        </Fragment>
    )

}

export default Category