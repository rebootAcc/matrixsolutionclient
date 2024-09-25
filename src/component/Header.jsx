import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoMdArrowDropup } from "react-icons/io";

const Header = () => {
  const [dropdownStates, setDropdownStates] = useState({});
  const [menuopen, setMenuopen] = useState(false);
  const [subcategories, setSubcategories] = useState({});
  const [subSubDropdownStates, setSubSubDropdownStates] = useState({});

  const headerRef = useRef(null);
  const togglemenuopen = () => {
    setMenuopen(!menuopen);
  };

  const toggleDropdown = (index) => {
    setDropdownStates((prevState) => {
      const updatedDropdownStates = { ...prevState };

      // Close all other dropdowns
      Object.keys(updatedDropdownStates).forEach((key) => {
        if (key !== index.toString()) {
          updatedDropdownStates[key] = false;
        }
      });

      // Toggle the current dropdown
      updatedDropdownStates[index] = !prevState[index];
      return updatedDropdownStates;
    });
  };

  const location = useLocation();

  const NavElement = [
    { name: "MS STORE", dropdown: true },
    { name: "PC COMPONENTS", dropdown: true },
    { name: "PC PERIPHERALS", dropdown: true },
    { name: "PRE-BUILD PC", dropdown: true },
    { name: "BRANDS", link: "/brands" },
  ];

  const MobNavElement = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
    { name: "PC COMPONENTS", dropdown: true },
    { name: "PC PERIPHERALS", dropdown: true },
    { name: "PRE-BUILD PC", dropdown: true },
    { name: "BRANDS", link: "/brands" },
    { name: "MS STORE", dropdown: true },
  ];

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/categories/getcategory`
        );
        const fetchedSubcategories = response.data.reduce((acc, category) => {
          acc[category.mainCategory] = category.subcategories;
          return acc;
        }, {});
        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleNestedDropdownToggle = (categoryIndex, subIndex) => {
    setDropdownStates((prevState) => {
      // Close all other sub-dropdowns at the same level
      const updatedState = { ...prevState };

      Object.keys(updatedState).forEach((key) => {
        // Only reset states for other subcategories within the same category
        if (
          key.startsWith(`${categoryIndex}-`) &&
          key !== `${categoryIndex}-${subIndex}`
        ) {
          updatedState[key] = false;
        }
      });

      // Toggle the current subcategory dropdown
      updatedState[`${categoryIndex}-${subIndex}`] =
        !prevState[`${categoryIndex}-${subIndex}`];
      return updatedState;
    });
  };

  const handleLevel3DropdownToggle = (categoryIndex, subIndex, thirdIndex) => {
    setDropdownStates((prevState) => {
      const updatedState = { ...prevState };

      // Close all other 3rd-level dropdowns in the same category/subcategory
      Object.keys(updatedState).forEach((key) => {
        if (
          key.startsWith(`${categoryIndex}-${subIndex}-`) &&
          key !== `${categoryIndex}-${subIndex}-${thirdIndex}`
        ) {
          updatedState[key] = false;
        }
      });

      // Toggle the current 3rd-level dropdown
      updatedState[`${categoryIndex}-${subIndex}-${thirdIndex}`] =
        !prevState[`${categoryIndex}-${subIndex}-${thirdIndex}`];
      return updatedState;
    });
  };

  const handleLevel4DropdownToggle = (
    categoryIndex,
    subIndex,
    thirdIndex,
    fourthIndex
  ) => {
    setDropdownStates((prevState) => {
      const updatedState = { ...prevState };

      // Close all other 4th-level dropdowns in the same subcategory/3rd level
      Object.keys(updatedState).forEach((key) => {
        if (
          key.startsWith(`${categoryIndex}-${subIndex}-${thirdIndex}-`) &&
          key !== `${categoryIndex}-${subIndex}-${thirdIndex}-${fourthIndex}`
        ) {
          updatedState[key] = false;
        }
      });

      // Toggle the current 4th-level dropdown
      updatedState[
        `${categoryIndex}-${subIndex}-${thirdIndex}-${fourthIndex}`
      ] =
        !prevState[`${categoryIndex}-${subIndex}-${thirdIndex}-${fourthIndex}`];
      return updatedState;
    });
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdownStates({});
        setMenuopen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getGridColumnsClass = (items) => {
    if (!items) return ""; // Handle case where items is undefined or null
    return items.length >= 6
      ? "grid-cols-2 w-[32rem]"
      : "grid-cols-1 w-[15rem]";
  };

  const formatSubcategoryLink = (name) => {
    // Encode the subcategory name properly
    return encodeForUrl(name);
  };

  const encodeForUrl = (str) => {
    return encodeURIComponent(str)
      .replace(/%2F/g, "-slash-") // Replace encoded "/" with "-slash-"
      .replace(/%40/g, "-at-") // Replace encoded "@" with "-at-"
      .replace(/%26/g, "-and-") // Replace encoded "&" with "-and-"
      .replace(/%5C/g, "-backslash-") // Replace encoded "\" with "-backslash-"
      .replace(/%25/g, "-percent-"); // Replace encoded "%" with "-percent-"
  };

  return (
    <header
      ref={headerRef}
      className={`bg-[#313846] fixed z-50 w-full font-roboto ${
        scrolled ? "top-0 header-transition" : ""
      }`}
    >
      <div className="lg:flex sm:hidden w-full lg:h-[5rem] xlg:h-[6rem] shadow-lg justify-between items-center md:p-4 sm:p-2 px-5">
        <Link
          to={"/"}
          className="sm:hidden z-[100] md:block py-4 text-white font-bold"
        >
          <img src="/images/logo.svg" alt="logo" className="size-28" />
        </Link>
        <div className="flex xl:gap-4 lg:gap-2 justify-end  relative">
          {NavElement.map((navbar, index) => (
            <div
              key={index}
              onMouseEnter={() => toggleDropdown(index)}
              onMouseLeave={() => toggleDropdown(index)}
              className={`font-medium lg:text-sm xlg:text-lg hover:bg-red-600 h-[6rem] flex justify-center items-center lg:px-2 xlg:px-4 ${
                location.pathname === navbar.link
                  ? "text-[#FFB800A6]"
                  : "text-white"
              }`}
            >
              {navbar.dropdown ? (
                <div className="relative ">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex flex-row gap-1 items-center"
                  >
                    <div>{navbar.name}</div>
                  </button>
                  {dropdownStates[index] && navbar.name !== "BRANDS" && (
                    <div className="absolute z-50 top-[4.1rem]  -left-4 flex justify-center items-center">
                      <div className="bg-white w-[10rem] shadow-md  grid grid-cols-1">
                        <div className="absolute top-[-1rem] left-[1rem] w-[10rem]">
                          <IoMdArrowDropup className="text-[#313846] text-2xl" />
                        </div>
                        {subcategories[navbar.name]?.map((sub, subIndex) => (
                          <div key={subIndex} className="relative group">
                            <Link
                              to={`/products/${
                                navbar.name
                              }/${formatSubcategoryLink(sub.name)}`}
                              className="flex py-4 px-2 justify-between text-[#313846] font-[200] text-sm border-b-[0.5px] hover:bg-[#FFB800A6] relative"
                              onMouseEnter={() =>
                                handleNestedDropdownToggle(index, subIndex)
                              }
                            >
                              {sub.name}
                              {sub.subsubcategories?.length > 0 && (
                                <span className="ml-2">▸</span>
                              )}
                            </Link>

                            {dropdownStates[`${index}-${subIndex}`] &&
                              sub.subsubcategories?.length > 0 && (
                                <div className="absolute left-full top-0 w-[10rem] bg-white shadow-lg z-50">
                                  {sub.subsubcategories.map(
                                    (subsub, subsubIndex) => (
                                      <div
                                        key={subsubIndex}
                                        className="relative group"
                                      >
                                        <Link
                                          to={`/products/${
                                            navbar.name
                                          }/${formatSubcategoryLink(
                                            sub.name
                                          )}/${formatSubcategoryLink(
                                            subsub.name
                                          )}`}
                                          className="block px-2 py-4 text-sm text-[#313846] hover:bg-gray-100"
                                          onMouseEnter={() =>
                                            handleLevel3DropdownToggle(
                                              index,
                                              subIndex,
                                              subsubIndex
                                            )
                                          }
                                        >
                                          {subsub.name}
                                          {subsub.lavel3CategorySchema?.length >
                                            0 && (
                                            <span className="ml-2">▸</span>
                                          )}
                                        </Link>

                                        {dropdownStates[
                                          `${index}-${subIndex}-${subsubIndex}`
                                        ] &&
                                          subsub.lavel3CategorySchema?.length >
                                            0 && (
                                            <div className="absolute left-full top-0 w-[10rem] bg-white shadow-lg z-50">
                                              {subsub.lavel3CategorySchema.map(
                                                (lavel3, lavel3Index) => (
                                                  <div
                                                    key={lavel3Index}
                                                    className="relative group"
                                                  >
                                                    <Link
                                                      to={`/products/${
                                                        navbar.name
                                                      }/${formatSubcategoryLink(
                                                        sub.name
                                                      )}/${formatSubcategoryLink(
                                                        subsub.name
                                                      )}/${formatSubcategoryLink(
                                                        lavel3.name
                                                      )}`}
                                                      className="block px-2 py-4 text-sm text-[#313846] hover:bg-gray-100"
                                                      onMouseEnter={() =>
                                                        handleLevel4DropdownToggle(
                                                          index,
                                                          subIndex,
                                                          subsubIndex,
                                                          lavel3Index
                                                        )
                                                      }
                                                    >
                                                      {lavel3.name}
                                                      {lavel3
                                                        .lavel4CategorySchema
                                                        ?.length > 0 && (
                                                        <span className="ml-2">
                                                          ▸
                                                        </span>
                                                      )}
                                                    </Link>

                                                    {dropdownStates[
                                                      `${index}-${subIndex}-${subsubIndex}-${lavel3Index}`
                                                    ] &&
                                                      lavel3
                                                        .lavel4CategorySchema
                                                        ?.length > 0 && (
                                                        <div className="absolute left-full top-0 w-[10rem] bg-white shadow-lg z-50">
                                                          {lavel3.lavel4CategorySchema.map(
                                                            (
                                                              lavel4,
                                                              lavel4Index
                                                            ) => (
                                                              <Link
                                                                key={
                                                                  lavel4Index
                                                                }
                                                                to={`/products/${
                                                                  navbar.name
                                                                }/${formatSubcategoryLink(
                                                                  sub.name
                                                                )}/${formatSubcategoryLink(
                                                                  subsub.name
                                                                )}/${formatSubcategoryLink(
                                                                  lavel3.name
                                                                )}/${formatSubcategoryLink(
                                                                  lavel4.name
                                                                )}`}
                                                                className="block px-2 py-4 text-sm text-[#313846] hover:bg-gray-100"
                                                              >
                                                                {lavel4.name}
                                                              </Link>
                                                            )
                                                          )}
                                                        </div>
                                                      )}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={navbar.link}>{navbar.name}</Link>
              )}
            </div>
          ))}
        </div>
        <Link
          to={"https://api.whatsapp.com/send?phone=919476383750"}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex justify-center z-[20] items-center p-2 xlg:h-[3rem] xlg:w-[12rem] lg:w-[9rem] lg:h-[2.5rem] bg-transparent text-[white] xlg:border-2 lg:border border-white gap-3 lg:text-xs xlg:text-lg font-medium rounded-full"
        >
          <span>
            <img src="/images/whatsapp.svg" alt="" className="h-5" />
          </span>
          WhatsApp Us!
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="sm:flex md:justify-between md:items-center sm:justify-between sm:items-center w-full sm:px-9 px-0 lg:hidden">
        <Link
          href={"/"}
          className="lg:hidden text-xl z-[100] text-white font-semibold"
        >
          <img src="/images/logo.svg" alt="logo" className="size-28" />
        </Link>

        <button onClick={togglemenuopen} className="">
          <label
            htmlFor="checkbox"
            className={`toggle ${menuopen ? "menu-open" : ""}`}
          >
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </button>
      </div>
      {menuopen && (
        <div className="sm:flex bg-[#2D68DB] flex-col sm:h-[50vh] md:h-[60vh] md:text-3xl sm:text-xl overflow-scroll lg:hidden px-9 relative">
          {MobNavElement.map((navbar, index) => (
            <div
              key={index}
              className="font-semibold text-[white] p-4 md:py-10 border-b-2 border-gray-200"
            >
              {navbar.dropdown ? (
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex flex-row gap-2 items-center"
                  >
                    <div>{navbar.name}</div>
                  </button>
                  <div className="w-full flex items-center justify-center z-50 relative top-0">
                    {dropdownStates[index] && (
                      <div className="relative bg-[#CA003D] rounded-lg shadow-md mt-1 p-2 py-4 w-full transition-opacity border-gray-200 text-white opacity-100">
                        {subcategories[navbar.name] &&
                          subcategories[navbar.name].map((item, i) => (
                            <div key={i} className="relative">
                              <Link
                                to={`/products/${
                                  navbar.name
                                }/${formatSubcategoryLink(item.name)}`}
                                className="flex py-5 px-4 text-white  text-lg border-b-[0.5px] hover:bg-[#FFB800A6] relative"
                              >
                                {item.name}
                                {item.subsubcategories?.length > 0 && (
                                  <span className="ml-2">▸</span>
                                )}
                              </Link>
                              {item.subsubcategories?.length > 0 &&
                                subSubDropdownStates[`${index}-${i}`] && (
                                  <div className="pl-4 bg-[#900033] rounded-lg mt-1 p-2 text-white shadow-lg">
                                    {item.subsubcategories.map((subitem, j) => (
                                      <Link
                                        key={j}
                                        to={`/products/${
                                          navbar.name
                                        }/${formatSubcategoryLink(
                                          item.name
                                        )}/${formatSubcategoryLink(
                                          subitem.name
                                        )}`}
                                        className="block px-4 py-2 text-white hover:bg-gray-400"
                                      >
                                        {subitem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={navbar.link}>{navbar.name}</Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
