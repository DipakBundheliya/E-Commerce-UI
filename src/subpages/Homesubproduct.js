import React, { useEffect, useRef, useState } from "react";
import ProductList from "../features/product/components/ProductList";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByFilterAsync,
  selectAllProducts,
  selectProductListStatus,
} from "../features/product/productSlice";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ProductPopup from "../features/product/components/ProductPopup";
import { useAlert } from "react-alert";
import {
  addToWishlistAsync,
  selectWishlistItems,
} from "../features/wishlist/wishlistSlice";
import { selectUserInfo } from "../features/user/userSlice";

const Homesubproduct = () => {
  const dispatch = useDispatch();
  const [filter, setfilter] = useState({});
  const sixProducts = useSelector(selectAllProducts);
  const status = useSelector(selectProductListStatus);
  const [products, setproducts] = useState([]);
  const [showPopup, setshowPopup] = useState(false);
  const [prodId, setprodId] = useState();
  const wishlistItemSet = useSelector(selectWishlistItems);
  const user = useSelector(selectUserInfo);
  const alert = useAlert();

  const productset1 = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 3,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 4,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      thumbnail:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // More products...
  ];
  const productset2 = [
    {
      id: 1,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://idestiny.in/wp-content/uploads/2022/09/Apple_Watch_SE_LTE_40mm_Starlight_Aluminum_Starlight_Sport_Band_PDP_Images_Position-1__en-IN.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 2,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://idestiny.in/wp-content/uploads/2022/09/Apple_Watch_SE_LTE_40mm_Starlight_Aluminum_Starlight_Sport_Band_PDP_Images_Position-1__en-IN.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 3,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://idestiny.in/wp-content/uploads/2022/09/Apple_Watch_SE_LTE_40mm_Starlight_Aluminum_Starlight_Sport_Band_PDP_Images_Position-1__en-IN.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 4,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://idestiny.in/wp-content/uploads/2022/09/Apple_Watch_SE_LTE_40mm_Starlight_Aluminum_Starlight_Sport_Band_PDP_Images_Position-1__en-IN.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
  ];
  const productset3 = [
    {
      id: 5,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://www.jiomart.com/images/product/original/rvhknoqiew/emble-starbucks-designer-printed-silicone-case-for-nothing-phone-1-tpu-soft-nothing-phone-1-multicolor-product-images-orvhknoqiew-p602267981-0-202306091136.png?im=Resize=(1000,1000)",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 6,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://www.jiomart.com/images/product/original/rvhknoqiew/emble-starbucks-designer-printed-silicone-case-for-nothing-phone-1-tpu-soft-nothing-phone-1-multicolor-product-images-orvhknoqiew-p602267981-0-202306091136.png?im=Resize=(1000,1000)",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 7,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://www.jiomart.com/images/product/original/rvhknoqiew/emble-starbucks-designer-printed-silicone-case-for-nothing-phone-1-tpu-soft-nothing-phone-1-multicolor-product-images-orvhknoqiew-p602267981-0-202306091136.png?im=Resize=(1000,1000)",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 8,
      title: "Basic Tee",
      href: "#",
      thumbnail:
        "https://www.jiomart.com/images/product/original/rvhknoqiew/emble-starbucks-designer-printed-silicone-case-for-nothing-phone-1-tpu-soft-nothing-phone-1-multicolor-product-images-orvhknoqiew-p602267981-0-202306091136.png?im=Resize=(1000,1000)",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
  ];

  useEffect(() => {
    filter[`_page`] = [1];
    filter[`_limit`] = [8];
    setfilter({ ...filter });
    dispatch(fetchProductsByFilterAsync({ filter })).then(() => {
      setproducts([...sixProducts]);
    });
  }, []);

  function handleWishlist(e, productId) {
    e.preventDefault();
    if (
      wishlistItemSet.findIndex((item) => item.product.id === productId) >= 0
    ) {
      alert.error(`Item already added to Wishlist`);
    } else {
      const newItem = {
        quantity: 1,
        user: user.id,
        product: productId,
      };
      dispatch(addToWishlistAsync(newItem));
      //    TODO: This alert is based on server response when item successfully added
      alert.success(`Item added to Wishlist`);
    }
  }

  const posts = [
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "#",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    // More posts...
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const sliderRef = useRef(null);

  const [set1, setset1] = useState(true);
  const [set2, setset2] = useState(false);
  const [set3, setset3] = useState(false);

  return (
    <>
      {
        <ProductPopup
          showPopup={showPopup}
          setshowPopup={setshowPopup}
          prodId={prodId}
        ></ProductPopup>
      }
      {sixProducts.length > 0 && (
        <>
          <div className="my-4 ">
            <div>
              <div className="py-4 flex items-center justify-center">
                <hr className="w-24 border border-black" />
                <h1 className="text-center mx-4 text-4xl font-[500]">
                  OUR PRODUCTS
                </h1>
                <hr className="w-24 border border-black" />
              </div>
              <div className="py-4 flex items-center justify-center">
                <a
                  className={`${
                    set1 ? "text-[#d74447]" : "text-black"
                  }  cursor-pointer hover:text-[#d74447]`}
                  onClick={() => {
                    setset1(true);
                    setset3(false);
                    setset2(false);

                    filter[`_page`] = [1];
                    filter[`_limit`] = [8];
                    setfilter({ ...filter });
                    dispatch(fetchProductsByFilterAsync({ filter }));
                  }}
                >
                  <h1 className="text-center mx-4 text-xl font-[400]">
                    New Arrivals
                  </h1>
                </a>
                <a
                  className={`${
                    set2 ? "text-[#d74447]" : "text-black"
                  }    cursor-pointer hover:text-[#d74447]`}
                  onClick={() => {
                    setset2(true);
                    setset1(false);
                    setset3(false);
                    filter[`_page`] = [2];
                    filter[`_limit`] = [8];
                    setfilter({ ...filter });
                    dispatch(fetchProductsByFilterAsync({ filter }));
                  }}
                >
                  <h1 className="text-center mx-4 text-xl font-[400]">
                    Best sellers
                  </h1>
                </a>
                <a
                  className={`${
                    set3 ? "text-[#d74447]" : "text-black"
                  }   cursor-pointer hover:text-[#d74447]`}
                  onClick={() => {
                    setset3(true);
                    setset1(false);
                    setset2(false);
                    filter[`_page`] = [3];
                    filter[`_limit`] = [8];
                    setfilter({ ...filter });
                    dispatch(fetchProductsByFilterAsync({ filter }));
                  }}
                >
                  <h1 className="text-center mx-4 text-xl font-[400]">
                    Sale Items
                  </h1>
                </a>
              </div>
              {status === "loading" ? (
                <div className=" bg-white flex justify-center py-60 h-full w-full">
                  <Bars
                    height="60"
                    width="60"
                    color="#E53E3E"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <div className=" mx-28 max-w-2xl px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {sixProducts.map((product) => (
                      <div key={product.id} className="group/card ">
                        <div className="relative  w-full overflow-hidden rounded-md bg-white cursor-pointer  lg:h-60">
                          <Link
                            key={product.id}
                            to={`/product-detail/${product.id}`}
                          >
                            <img
                              src={product.thumbnail}
                              alt={product.thumbnail}
                              className="h-full w-full object-contain object-center lg:h-full lg:w-full "
                            />
                          </Link>
                          <div className="absolute group/inner grid grid-cols-4 gap-0 w-full top-[194px]  h-12 ">
                            <button
                              className="col-span-1 w-full h-full text-white bg-rose-600  flex items-center justify-center transition ease-in-out duration-500  translate-y-12  group-hover/card:translate-y-0 hover:bg-black"
                              onClick={(e) => {
                                handleWishlist(e, product.id);
                              }}
                            >
                              <HeartIcon className="h-4 w-4 " />
                            </button>
                            <div className="col-span-2  border border-x-2 border-y-0 border-x-rose-900 bg-rose-600 flex items-center justify-center w-full h-full transition ease-in-out duration-[600ms]  translate-y-12  group-hover/card:translate-y-0 hover:bg-black">
                              <h1 className="text-center text-white ">
                                Buy Now
                              </h1>
                            </div>
                            <div
                              className="col-span-1  w-full h-full bg-rose-600 flex items-center justify-center transition ease-in-out duration-700  translate-y-12  group-hover/card:translate-y-0 hover:bg-black"
                              onClick={(e) => {
                                setshowPopup(!showPopup);
                                setprodId(product.id);
                              }}
                            >
                              <EyeIcon className="h-4 w-4 text-white " />
                            </div>
                          </div>
                        </div>
                        <div className="bg-white mt-3 flex flex-col items-center">
                          <h3 className="text-base font-semibold text-gray-700 cursor-pointer hover:text-rose-500  transition ease-in-out duration-500">
                            <Link
                              key={product.id}
                              to={`/product-detail/${product.id}`}
                            >
                              <span aria-hidden="true" className="absolute " />
                              {product.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            {product.color}
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Our blog */}
            <div>
              <div className="my-16 flex items-center justify-center">
                <hr className="w-24 border border-black" />
                <h1 className="text-center mx-4 text-4xl font-[500]">
                  OUR BLOG
                </h1>
                <hr className="w-24 border border-black" />
              </div>
              <div className="relative  mx-28 my-4">
                <Slider ref={sliderRef} {...settings}>
                  <div className="group h-[24rem] rounded-[24px] overflow-hidden">
                    <div className="relative w-full h-full rounded-[24px] ">
                      <img
                        src="https://www.auroracommerce.com/templates/auroracommerce/_images/content/blog12.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-[24px] transition ease-in-out duration-500 group-hover:scale-110"
                      />

                      <div className="absolute top-0 h-full w-full bg-gradient-to-t from-rose-700 rounded-[24px] via-transparent  "></div>
                      <div className="absolute top-3/4 h-1/4 w-full py-4 px-8 text-white">
                        <div className="flex p-2 text-sm gap-8">
                          <h1 className="">May 16, 2020</h1>
                          <h1 className="">Dipak Bundheliya</h1>
                        </div>
                        <div className="px-2 font-semibold text-lg">
                          <h1>Explore new fashion trends</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group h-[24rem] rounded-[24px] overflow-hidden">
                    <div className="relative w-full h-full rounded-[24px] ">
                      <img
                        src="https://www.mlive.com/resizer/fqM4LtnX8l0edG1jK_4-TrfAibw=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/I3FII6NM6BH4PDGSEAGGMQ37ZY.JPG"
                        alt=""
                        className="w-full h-full object-cover rounded-[24px] transition ease-in-out duration-500 group-hover:scale-110"
                      />

                      <div className="absolute top-0 h-full w-full bg-gradient-to-t from-rose-700 rounded-[24px] via-transparent  "></div>
                      <div className="absolute top-3/4 h-1/4 w-full py-4 px-8 text-white">
                        <div className="flex p-2 text-sm gap-8">
                          <h1 className="">May 16, 2020</h1>
                          <h1 className="">Dipak Bundheliya</h1>
                        </div>
                        <div className="px-2 font-semibold text-lg">
                          <h1>Explore new fashion trends</h1>
                        </div>
                      </div>
                    </div>

                    {/* <h1></h1>
            <h2></h2> */}
                  </div>
                  <div className="group h-[24rem] rounded-[24px] overflow-hidden">
                    <div className="relative w-full h-full rounded-[24px] ">
                      <img
                        src="https://img.freepik.com/free-photo/black-woman-trendy-grey-leather-jacket-posing-beige-background-studio-winter-autumn-fashion-look_273443-141.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-[24px] transition ease-in-out duration-500 group-hover:scale-110"
                      />

                      <div className="absolute top-0 h-full w-full bg-gradient-to-t from-rose-700 rounded-[24px] via-transparent  "></div>
                      <div className="absolute top-3/4 h-1/4 w-full py-4 px-8 text-white">
                        <div className="flex p-2 text-sm gap-8">
                          <h1 className="">May 16, 2020</h1>
                          <h1 className="">Dipak Bundheliya</h1>
                        </div>
                        <div className="px-2 font-semibold text-lg">
                          <h1>Explore new fashion trends</h1>
                        </div>
                      </div>
                    </div>

                    {/* <h1></h1>
            <h2></h2> */}
                  </div>
                </Slider>
                <button
                  className="absolute top-2/4 sm:top-1/4 lg:top-1/2 -left-4  transform -translate-y-1/2 arrow-button text-3xl "
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  &lt;
                </button>
                <button
                  className="absolute top-2/4 sm:top-1/4 lg:top-1/2 -right-4 transform -translate-y-1/2 arrow-button text-3xl "
                  onClick={() => sliderRef.current.slickNext()}
                >
                  &gt;
                </button>
              </div>
            </div>

            <style>
              {`
          .slick-dots {
            bottom: 2rem;
          }
          .slick-slide > div{
            margin: 0 10px;
          }
          @media screen and (min-width: 1024px) {
            .slick-dots {
              /* Add your styles for large screens here */
              bottom: 2rem;
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
            display:block !important
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
        </>
      )}
    </>
  );
};

export default Homesubproduct;
