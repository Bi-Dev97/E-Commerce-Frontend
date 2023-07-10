/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  console.log(location.pathname.split("/"));
  const getBlogId = location
    .pathname
    .split("/")[2]; /**The pathname property of the Location 
  interface is a string containing the path of the URL for the location. 
  If there is no path, pathname will be empty: otherwise, 
  pathname contains an initial '/' followed by the path of the URL, not including the query string or fragment.
  Example we want here to get the Id in the pathname then we split the pathname by a specific separator here the "/" 
  then we get the Id by his index in the array returns by the split method: here is a pathname as example 
  /blog/644d8341150ca12710840975;
  after the split we will get something like this: [http://localhost:3000, blog, 644d8341150ca12710840975], we get the Id by his index 2 */

  const dispatch = useDispatch();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    dispatch(getABlog(getBlogId));
  };
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{blogState?.title}</h3>
              <img src={blogState?.images[0]?.url ? blogState?.images[0].url: blog} className="img-fluid w-100 my-4 " alt="blog" />
              <p
                dangerouslySetInnerHTML={{
                  __html: blogState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
