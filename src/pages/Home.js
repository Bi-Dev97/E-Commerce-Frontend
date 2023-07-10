/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee"; /**React Fast Marquee is 
a lightweight React component 
that utilizes the power of CSS animations to create silky smooth marquees. */
import { BlogCard } from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import famous1 from "../images/famous-1.webp";
import famous2 from "../images/famous-2.webp";
import famous3 from "../images/famous-3.webp";
import brand1 from "../images/brand-01.png";
import brand2 from "../images/brand-02.png";
import brand3 from "../images/brand-03.png";
import brand4 from "../images/brand-04.png";
import brand5 from "../images/brand-05.png";
import brand6 from "../images/brand-06.png";
import brand7 from "../images/brand-07.png";
import brand8 from "../images/brand-08.png";
import camera from "../images/camera.jpg";
import tv from "../images/tv.jpg";
import headphone from "../images/headphone.jpg";
import mainbanner1 from "../images/main-banner-1.jpg";
import catbanner1 from "../images/catbanner-01.jpg";
import catbanner2 from "../images/catbanner-02.jpg";
import catbanner3 from "../images/catbanner-03.jpg";
import catbanner4 from "../images/catbanner-04.jpg";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component"; /**react-stars ⭐️.
 A simple star rating component for your React projects */
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import addCart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishlist } from "../features/products/productSlice";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);

  console.log(productState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  const getProducts = () => {
    dispatch(getAllProducts());
  };
  const addToWish = (id) => {
    //alert(id);
    dispatch(addToWishlist(id));
  };
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src={mainbanner1}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src={catbanner1}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={catbanner2}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={catbanner3}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src={catbanner4}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        {/**<div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt="tv" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt="watch" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src={camera} alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src={tv} alt="tv" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src={headphone} alt="watch" />
              </div>
            </div>
          </div>
            </div>*/}
      </Container>
      <Container class1="featured-wrap py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState?.length > 0 ? (
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => addToWish(item?._id)}
                        >
                          <img src={wish} alt="wishlist" />
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
                          src={watch2}
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
                        <p className="price">$ {item?.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/**<button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                </button>*/}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/**<button className="border-0 bg-transparent">
                            <img src={addCart} alt="addCart" />
              </button>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <p className="fs-3 text-center text-secondary">No Item</p>
          )}
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous1} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous2} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5k Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous3} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src={famous3} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState?.length > 0 ? (
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    brand={item?.brand}
                    title={item?.title}
                    totalrating={item?.totalrating}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    image={item?.images[0]?.url}
                  />
                );
              }
            })
          ) : (
            <p className="fs-3 text-center text-secondary">No Item</p>
          )}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="Container-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            <ProductCard data={popularProduct} />
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src={brand1} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand2} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand3} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand4} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand5} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand6} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand7} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand8} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="Container-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState?.length > 0 ? (
            blogState?.map((item, index) => {
              if (index < 3) {
                /** Here we make this condition 
                because we want to show latest blogs 
                we don't need to show all blogs */
                return (
                  <div className="col-3" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })
          ) : (
            <p className="fs-3 text-center text-secondary">No Item</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
