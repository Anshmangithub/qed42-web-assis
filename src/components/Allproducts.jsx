
import { Link } from 'react-router-dom'; // this import link 


// In this component i create the Product layout or design and take props from app component

const Allproducts = ({allProducts , setAllProducts , updateCartCount}) => {


  // This handleAddTocart function take the product and find the existing product from localstorage 
   const handleAddToCart = (product)=>{
    let cart = JSON.parse(localStorage.getItem('cart')) || [] // get the product from localstorage
    const existingProduct = cart.find((item) => item.id === product.id) // find the already created product

    // if existing product already their it increment the quantity of product otherwise it push the product into cart with quantity as initialy  1
    if(existingProduct){
        existingProduct.quantity += 1
    }else{
        cart.push({...product, quantity : 1}) 
    }
   // set the cart into localstorage 
    localStorage.setItem('cart' , JSON.stringify(cart))
   
    updateCartCount() // and here update the count of cart 
   }


   // In this rendersStars function to manipulate the star with the rating
   const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
    }
    return stars;
};



 // this function is return the products for mobile and dekstop screen
  return (
    <>
    <div className='w-full min-h-min  md:ml-80  pt-16 md:pt-10 flex flex-col md:flex-row items-center md:items-stretch md:px-1 gap-2 md:gap-16 md:flex-wrap'>
     <h2 className='text-lg font-semibold text-gray-600 mb-3 md:hidden'>All Products</h2>

{/* PRODUCTS */}

{allProducts.map((product ) =>(


    <div key={product.id} className='w-60  min-h-fit md:w-60  border rounded-md  mb-3  md:p-1 shadow-xl'> 
    <div className='w-full h-52 md:h-44   relative group '>
        <img src={product.thumbnail} className=' h-full  absolute' alt="" />

       <button 
       onClick={() => handleAddToCart(product)}
       > <div className='w-full h-10 bg-gray-800 text-white absolute mt-44 text-center py-2 md:mt-36 invisible group-hover:visible'>Add To Cart</div> </button>
    </div>
   <h3 className='text-md font-medium px-4 pt-2 '>{product.title}</h3>
   <div className='flex'>
   <h3 className='text-sm font-normal text-green-600 px-4 '>${product.price}</h3>
   <h3 className='text-sm font-normal text-red-500 '>{product.discountPercentage}% off</h3>
   </div>
   <h3 className='text-sm font-normal text-zinc-500 px-4'>{product.category}</h3>


   <div class="flex items-center px-4 mb-3">
   {renderStars(product.rating)}
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{product.rating}</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
</div>
{/* add to cart link for mobile screen */}
<Link onClick={()=> handleAddToCart(product)} ><h3 className='text-red-500 text-sm text-center md:hidden '>+Add to Cart</h3></Link>
{/* view details */}
<Link to={`/products/${product.id}`}><h3 className='text-sm text-center text-blue-600 font-normal underline decoration-1 mb-2'>view details</h3></Link>
    </div>
    
))}

</div>

    </>
  )
}

export default Allproducts