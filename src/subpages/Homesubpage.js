import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef } from "react";
import img2 from "../images/HomeImages/home2.png";
import img3 from "../images/HomeImages/home3.png";
import img1 from "../images/HomeImages/home1.png";
import { Link } from "react-router-dom";

const Homesubpage = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Auto navigate to the next slide after 3 seconds
      sliderRef.current.slickNext();
    }, 500000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bannerClass relative h-[40rem] ">
      <Slider ref={sliderRef} {...settings}>
        <div className="relative  overflow-hidden !flex !flex-col !items-center  bg-rose-100 h-[40rem] sm:h-[20.5rem] lg:h-[40rem] ">
          <div className="absolute flex flex-col items-center text-center sm:text-left sm:items-start  gap-3 sm:translate-x-0 top-12 sm:left-24  sm:top-1/4 lg:left-32 lg:top-1/3">
            <h3 className="text-xl font-medium">Smart Products 1</h3>
            <h1 className=" text-4xl lg:text-6xl font-semibold ">
              Summer Offer
            </h1>
            <h1 className=" text-4xl lg:text-6xl font-semibold ">
              2024 Collection
            </h1>
            <Link to="/shop">
              <button className=" border border-black py-4 px-8 my-4 w-40 text-base font-medium transition ease-in-out duration-500 hover:bg-rose-600 hover:border-rose-600 hover:text-white">
                SHOP NOW
              </button>
            </Link>
          </div>
          <img
            src={img1}
            className="sm:h-full absolute object-cover bottom-0 sm:right-0 lg:right-0 lg:mt-2 lg:mr-0 lg:h-[37rem] "
          ></img>
        </div>
        <div className="relative  overflow-hidden !flex !flex-col !items-center  bg-rose-100 h-[40rem] sm:h-[20.5rem] lg:h-[40rem] ">
          <div className="absolute flex flex-col items-center text-center sm:text-left sm:items-start  gap-3 sm:translate-x-0 top-12 sm:left-24  sm:top-1/4 lg:left-32 lg:top-1/3">
            <h3 className="text-xl font-medium">Smart Products 2</h3>
            <h1 className=" text-4xl lg:text-6xl font-semibold ">
              Summer Offer
            </h1>
            <h1 className=" text-4xl lg:text-6xl font-semibold ">
              2024 Collection
            </h1>

            <Link to="/shop">
              <button className=" border border-black py-4 px-8 my-4 w-40 text-base font-medium transition ease-in-out duration-500 hover:bg-rose-600 hover:border-rose-600 hover:text-white">
                SHOP NOW
              </button>
            </Link>
          </div>
          <img
            src={img2}
            className="sm:h-full absolute object-cover bottom-0 sm:right-0 lg:right-0 lg:mt-2 lg:mr-0 lg:h-[37rem] "
          ></img>
        </div>
        <div className="relative  overflow-hidden !flex !flex-col !items-center  bg-rose-100 h-[40rem] sm:h-[20.5rem] lg:h-[40rem] ">
          <div className="absolute flex flex-col items-center text-center sm:text-left sm:items-start  gap-3 sm:translate-x-0 top-12 sm:left-24  sm:top-1/4 lg:left-32 lg:top-1/3">
            <h3 className="text-xl font-medium">Smart Products 3</h3>
            <h1 className=" text-4xl lg:text-6xl font-semibold ">
              Summer Offer
            </h1>
            <h1 className=" text-4xl lg:text-6xl font-semibold ">
              2024 Collection
            </h1>

            <Link to="/shop">
              <button className=" border border-black py-4 px-8 my-4 w-40 text-base font-medium transition ease-in-out duration-500 hover:bg-rose-600 hover:border-rose-600 hover:text-white">
                SHOP NOW
              </button>
            </Link>
          </div>
          <img
            src={img3}
            className="sm:h-full absolute object-cover bottom-0 sm:right-0 lg:right-0 lg:mt-2 lg:mr-0 lg:h-[37rem] "
          ></img>
        </div>
        {/* Add more slides with images and headings as needed */}
      </Slider>
      <button
        className="absolute top-2/4 sm:top-1/4 lg:top-1/2 left-8  transform -translate-y-1/2 arrow-button text-3xl "
        onClick={() => sliderRef.current.slickPrev()}
      >
        &lt;
      </button>
      <button
        className="absolute top-2/4 sm:top-1/4 lg:top-1/2 right-8 transform -translate-y-1/2 arrow-button text-3xl "
        onClick={() => sliderRef.current.slickNext()}
      >
        &gt;
      </button>

      <style>
        {`
          .slick-dots {
            bottom: 2rem;
          }
          .bannerClass .slick-slider .slick-list .slick-track .slick-slide > div{
            margin: 0px;
          }
          @media screen and (min-width: 1024px) {
            .slick-dots {
              /* Add your styles for large screens here */
            }
          }

          @media screen and (min-width: 768px) and (max-width: 1023px) {
            .slick-dots {              
            bottom: 16.5rem;
            }
          }

          @media screen and (max-width: 767px) {
            .slick-dots {
              
            }
          }

          .slick-dots li {
            margin: 0;
          }

          .slick-next{
            display:none !important
          }
          // .slick-dots li button {
          //   width: 10px;
          //   height: 10px;
          //   background-color: blue;
          //   border-radius: 50%;
          //   border: 0;
          //   outline: none;
          // }

          // .slick-dots li.slick-active button {
          //   background-color: red;
          // }
        `}
      </style>
    </div>
  );
};

export default Homesubpage;
