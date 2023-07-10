/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from "./../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation(); // Returns the current location object, which represents the current URL in web browsers.
  const navigate = useNavigate(); // Returns an imperative method for changing the location. Used by s, but may also be used by other elements to change the location.
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  console.log(productState);

 
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage?.token : ""
      }`,
      Accept: "application/json",
    },
  };
  //console.log(productState);
  useEffect(() => {
    dispatch(getAProduct(getProductId));
    //dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  });

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false; /** cancels events that 
      normally take place with a handler,
       while return true; lets those events to occur. */
    } else {
      dispatch(
        addProdToCart({
          cartData: {
            productId: productState?._id,
            quantity,
            color,
            price: productState?.price,
          },
          config2,
        }),
        navigate("/cart"),
        getUserCart(config2)
      );
    }
  };
  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };
  const [orderedProduct, setOrderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    toast.success("Link Copied!");
    textField.remove();
  }; /** This function helps to copy a link or some text in the clipboard when an user clicks on it */
  const closeModal = () => {};
  const [popularProduct, setPopularProduct] = useState([]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productsState]);

  

  const [star, setStar] = useState(null);
  const [starNum, setStarNum] = useState(null);
  const [comment, setComment] = useState(0);
  
  console.log(star);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product.");
      return false;
    } else {
      dispatch(
        addRating({
          data: { star: star, comment: comment, prodId: getProductId },
          config2,
        })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 500);
    }
    return false;
  };
  
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images?.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item?.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">
                    ( {productState?.ratings?.length} Reviews )
                  </p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability :</h3>
                  {productState?.quantity < 1 ? (
                    <p className="product-data text-danger">Out Of Stock</p>
                  ) : (
                    <p className="product-data">In Stock</p>
                  )}
                </div>
                {/** <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>*/}
                {alreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color :</h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity :</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control text-secondary"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                          disabled={productState?.quantity < 1 ? true : false}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={`d-flex align-items-center gap-30 ${
                      alreadyAdded ? "ms-0" : "ms-5"
                    }`}
                  >
                    <button
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                      className="button border-0"
                      /**data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"*/
                      type="button"
                    >
                      {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                    </button>
                    {/**<button className="button signup">Buy It Now</button>*/}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" />
                      Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="border badge border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping && Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all country orders within &nbsp;
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link :</h3>
                  <a
                    href="javascript:void(0);" //Javascript:void(0) est une URL d’espace réservé qui est là pour dire à l’utilisateur qu’un événement onclick est lié au lien pour faire l’action réelle.
                    onClick={() => {
                      copyToClipboard(
                        window.location.href // The window.location.href property returns the URL of the current page.
                      ); // Click on this button will automatically copy the href link
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">
                      Based on {productState?.ratings?.length} Reviews
                    </p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={0}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      //console.log(e);
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    className="w-100 form-control"
                    id=""
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onChange={(e) => {
                      //console.log(e);
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="submit"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState?.ratings ? (
                  productState?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          {/**<h6 className="mb-0">mydev847</h6>*/}
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="fs-3 text-center text-secondary">No Comment</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            <ProductCard data={popularProduct} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
