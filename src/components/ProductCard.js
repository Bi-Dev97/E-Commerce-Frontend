/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component"; /**react-stars ⭐️.
 A simple star rating component for your React projects */
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addCart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { useEffect } from "react";

import { getUserProductWishlist } from "./../features/user/userSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  const [elClicked, setElClicked] = useState([]);
  // console.log(elClicked);
  //console.log(data);
  let location = useLocation();

  const addToWish = (id) => {
    //alert(id);
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 100);
  };

  useEffect(()=>{
    dispatch(getUserProductWishlist());
  }, [])

  const prodsId = useSelector((state) =>
    state?.auth?.wishlist?.wishlist?.map((i) => i._id)
  );
  console.log(prodsId);

  //console.log(prodsInWish?.includes(elClicked));

  return (
    <>
      {data?.length > 0 ? (
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                location.pathname === "/product" ? `gr-${grid}` : "col-3"
              } `}
            >
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button
                    className="border-0 bg-transparent"
                    onClick={() => addToWish(item?._id)}
                  >
                    {prodsId?.includes(item?._id) ? (
                      <BsSuitHeartFill
                        //onClick={() => setElClicked(item?._id)}
                        className="text-danger"
                      />
                    ) : (
                      <BsSuitHeart />
                    )}

                    {/**<img src={wish} alt="wishlist" />*/}
                  </button>
                </div>
                <div className="product-image">
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid"
                    alt="productImage"
                    width={160}
                  />
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid mx-auto"
                    alt="productImage"
                    width={160}
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">Havels</h6>
                  <h5 className="product-title">{item?.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p
                    className={`description ${
                      grid === 12 ? "d-block" : "d-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item?.description }} /**
                  dangerouslySetInnerHTML property in a React application,
                   is the equivalent of the innerHTML attribute in browser DOM.
                  dangerouslySetInnerHTML is a property that you can use on 
                  HTML elements in a React application to programmatically 
                  set their content. Instead of using a selector to grab the HTML element, then setting its innerHTML, you can use this property directly on the element. */
                  >
                    {/**{item?.description} instead of this we pass the p content in the dangerouslySetInnerHTML' s attribute */}
                  </p>
                  <p className="price">$ {item?.price}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    {/**  <button className="border-0 bg-transparent">
                      <img src={prodcompare} alt="compare" />
                    </button>*/}
                    <Link
                      to={"/product/" + item?._id}
                      className="border-0 bg-transparent"
                    >
                      <img src={view} alt="view" />
                    </Link>
                    {/**<button className="border-0 bg-transparent">
                      <img src={addCart} alt="addCart" />
                  </button>*/}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="fs-3 text-center text-secondary mt-4 ">No Item</p>
      )}
    </>
  );
};

export default ProductCard;
