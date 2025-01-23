import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { GrCart } from "react-icons/gr";
import Allproducts from './components/Allproducts';
import axios from 'axios';
import { Link } from 'react-router-dom';

// This is all imports for specific requirments


// This is App component where i create the Navbar layout and state management and show the list of all Products

function App() {

  
const [isOpen, setIsOpen] = useState(false); // This state for toogle the dropdown of category

const [allProducts, setAllProducts] = useState([]); // This state for storing the all products in array

const [searchQuery, setSearchQuery] = useState("") // this state use for take the user search query for specific products

const [cartCount, setCartCount] = useState(0); // this state use for count the quantity of cart 

const [selectedCategory, setSelectedCategory] = useState(""); //this state for category filtering

  const [categories, setCategories] = useState([]); // this state use for store available categories in dropdown

  const [sortOption, setSortOption] = useState(""); // this state use for sort the products which their price and rating



// In This asynchronous function i fetch the api of all products with the help of axios library 
  
  const productsApi = async ()=>{
    try {
      const response = await axios.get(`https://dummyjson.com/products`)
      
      const products = response.data.products
      
      setAllProducts(products);
      
      // In this code i store the unique categories from products to use for dropdown in which i use the set object 
      //  to store the unique category 

      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
      
    } catch (error) {
      console.log("Error fetching data :" , error)
    }
  }


// Here i use the useEffect to when page is render api will call 

useEffect(() => {
  productsApi()
}, [])


// This function  is use for when user enter any input data on search input it will update the searchquery state
const handleSearch = (event)=>{
setSearchQuery(event.target.value)
}

// This handlecategory change function take the category as parameter and update the selectedCategory with their conditional logic
//  if user choose the all category it show the all category and if choose another it show specific products 

const handleCategoryChange = (category) => {
  setSelectedCategory(category === "All Category" ? "" : category);
  setIsOpen(false); // Close dropdown after selection
};

// This function is use to sort the products with their specific condition
const sortProducts = (products) => {
  if (sortOption === "priceLowToHigh") {
    return [...products].sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    return [...products].sort((a, b) => b.price - a.price);
  } else if (sortOption === "ratingHighToLow") {
    return [...products].sort((a, b) => b.rating - a.rating);
  }
  return products;
};

// In this code products will filter and sort 
const sortedAndFilteredProducts = sortProducts(
  allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());  // for search the products
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true; // for filtering the category
    return matchesSearch && matchesCategory; 
  })
);

// this is use for toogle the dropdown
const toogleDropdown = ()=>{
    setIsOpen(!isOpen)
   }


  // this useEffect use for when page is mounted in which their totalquantity count the total quantity of cart from localstorage
   useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // get the cart from localstorage
    const totalQuantity = storedCart.reduce((sum, item) => sum + item.quantity, 0); // with the help of reduce method it count the total quantity of cart
    setCartCount(totalQuantity); // update the cartcount state
  }, []);


  // This is for use for send the cart count data to Allproducts component 
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalQuantity);
  };

//  In this part the Navbar return and Show the All product list into the web page and for responsive mobile device 
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        <div className="w-full h-16 md:border-b border-gray-300 md:h-20 flex items-center  fixed bg-white z-10  ">
          <div className="w-14 ml-4 md:ml-6">
            <img src="/e-logo.png" alt="" />
          </div>

          <h1 className="hidden md:block text-black text-xl font-semibold ml-6">ShopFusion</h1>
           <div className="w-9/12 h-12 bg-slate-200 ml-3 md:ml-32 rounded-md flex items-center justify-between md:hidden">
            <input
              className="bg-slate-200 rounded-md w-5/6 h-full outline-none text-md text-gray-600 px-3"
              placeholder="What are you looking for"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
            />
            <button>
              <FiSearch className="size-6 text-gray-700 mr-4 font-light" />
            </button>
          </div>
         

    {/* here it show for the desktop screen navbar */}

          <div className="w-4/6 h-12 hidden ml-36 md:block ">
            <div className="w-full h-full flex items-center justify-between">
              <h2 className="text-md font-light">Home</h2>
              <h2 className="text-md font-light">Contact</h2>
              <h2 className="text-md font-light">About</h2>
              <h2 className="text-md font-light">Sign Up</h2>

              {/* searchbar */}
              <div className="w-1/4 h-5/6 flex bg-slate-200 rounded-md justify-between ">
                <input
                  className="bg-slate-200 rounded-md h-full outline-none text-sm text-gray-600 px-3"
                  placeholder="What are you looking for"
                  onChange={handleSearch}
                  value={searchQuery}
                  type="text"
                />
                <button>
                  <FiSearch className="size-6 text-gray-700 mr-4 font-light" />
                </button>
              </div>

              {/* Dropdown for category */}

<div class="relative inline-block text-left">
  <div>
    <button type="button" onClick={toogleDropdown} class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-light
     text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
 {selectedCategory || "Categories"}
      <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  {isOpen && ( <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
      <button onClick={() => handleCategoryChange("All Category")}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" > All Category </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          
          {/* This is cart icon */}
            <Link to={"/cart"} className='relative'>
              <GrCart className='size-6 opacity-75'/>
              <div className='w-5 h-5 bg-red-500 rounded-full  flex justify-center items-center absolute ml-3 -mt-3'>
                <h5 className='text-white text-center  bg'>{cartCount}</h5>
              </div>
               </Link>
            </div>
          </div>
        </div>

{/* this navbar code is for mobile screen  */}
        <div className='w-full h-16 border-b-2 md:hidden flex justify-evenly items-center fixed mt-16  bg-white z-10'>
        <div className="relative inline-block text-left ">
          {/* Sort dropdown for mobile screen */}
               <select
                     value={sortOption}
                     onChange={(e) => setSortOption(e.target.value)}
                     className="inline-flex justify-center w-full rounded-md bg-white px-3 py-2  text-sm   text-gray-800 border outline-none shadow-sm  hover:bg-gray-50" >
    <option className='text-gray-700 text-sm' value="">Sort By</option>
    <option className='text-gray-700 text-sm ' value="priceLowToHigh">Price: Low to High</option>
    <option className='text-gray-700 text-sm ' value="priceHighToLow">Price: High to Low</option>
    <option className='text-gray-700 text-sm ' value="ratingHighToLow">Rating: High to Low</option>
  </select> 
</div>
        <Link to={"/cart"} className='relative'>
            
            <GrCart className='size-6 opacity-75'/>
            <div className='w-5 h-5 bg-red-500 rounded-full  flex justify-center items-center absolute ml-3 -mt-3'>
              <h5 className='text-white text-center  bg'>{cartCount}</h5>
            </div>
             </Link>
        <div class="relative inline-block text-left">
  <div>
    <button type="button" onClick={toogleDropdown} class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-light text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
    {selectedCategory || "Categories"}
      <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
              <button onClick={() => handleCategoryChange("All Category")}
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                     All Category </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
     </div>


<div className='w-full min-h-fit md:flex md:flex-row  mt-20'>
<div className='w-72  hidden md:block border-r-2 h-screen bg-white fixed z-10 '>
<h2 className='text-lg font-normal px-16 pt-4'>Sort Products</h2>

<div className="relative inline-block text-left px-10 mt-4">
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="inline-flex justify-center w-full rounded-md bg-white px-3 py-2  text-sm  text-gray-700 border outline-none shadow-sm  hover:bg-gray-50"
  >
    <option className='text-gray-700 text-sm' value="">Sort By</option>
    <option className='text-gray-700 text-sm ' value="priceLowToHigh">Price: Low to High</option>
    <option className='text-gray-700 text-sm ' value="priceHighToLow">Price: High to Low</option>
    <option className='text-gray-700 text-sm ' value="ratingHighToLow">Rating: High to Low</option>
  </select> 
</div>
</div>


{/*here is All products list show to import the All products component in which i pass the data as props  */}

   <Allproducts 
  allProducts={sortedAndFilteredProducts}
   setAllProducts = {setAllProducts}
   updateCartCount ={updateCartCount}
/>

</div>
 </div>

    </>
  );
}

export default App;