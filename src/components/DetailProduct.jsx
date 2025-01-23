import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DetailProduct = () => {
   

        const [product, setProduct] = useState(null)      // This state is store for perticular product 
         const {id} = useParams(); // it take id from params
         const navigate = useNavigate() // to use for navigate the page


         // this async function is use to fetch the api for specific id to show the detail of product
      const productApi = async ()=>{
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`)
            setProduct(response.data)
        } catch (error) {
            console.log("Product Fetching error :", error)
        }
      }
    
      // useEffect use to call the productapi when page mounted on dependency of id 
       useEffect(()=>{
        productApi()
       },[id])

       // if id is not their or take some time it show the loading 
     if(!product) return <h3 className='text-center mt-10 text-red-500'>Loading...</h3>

     const handleBack = ()=>{
        navigate(-1)
     }
     
     // This function is use for manipulate the star on rating 
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
    
       
    //  In this code it show on the web page with specific detail of product
  return (
    <>
    
    <div className='w-full h-screen pt-5 md:pt-5'>
        <button onClick={handleBack} >
         
        <h3 className='text-gray-500 text-md ml-10'>Back</h3>
        </button>
    <h3 className='text-lg font-semibold text-gray-700 mb-2 text-center md:mb-8'>Product Details</h3>
       
   <div className=' flex flex-col md:flex-row px-6 gap-8 md:gap-12 md:px-28'>
   <div className='w-full h-96 md:h-[550px]   rounded-lg '>
   <img src={product.images[0]} className='w-full h-full object-cover rounded-lg ' alt="" />
   </div>
   <div className='w-full h-96  mb-10 md:pt-20'>
 <h2 className='text-slate-700 font-semibold  text-xl'>{product.title}</h2>

 <div class="flex items-center mt-2">
 {renderStars(product.rating)}
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{product.rating}</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
</div>


<div className='flex pt-2 mb-1'>
   <h3 className='text-md md:text-lg font-normal text-green-600  mr-3 '>${product.price}</h3>
   <h3 className='text-md md:text-lg font-normal text-red-500 '>{product.discountPercentage}% off</h3>
   </div>
   <h3 className='text-md md:text-lg font-normal text-zinc-800 '>{product.category}</h3>
   <p className='text-gray-500 font-semibold text-sm mb-1'>
   {product.description}
   </p>
   <h4 className='text-red-400 font-semibold text-sm'>Brand : {product.brand}</h4>
   <h4 className='text-gray-800  text-xs'>Weight : {product.weight}</h4>
   <h4 className='text-gray-800  text-xs'>Warranty Info : {product.warrantyInformation}</h4>
   <h4 className='text-gray-800  text-xs'>Shipping Info : {product.shippingInformation}</h4>
   <h4 className='text-gray-800  text-xs'>Avilability : {product.availabilityStatus}</h4>
   </div>
   </div>
    </div>
    </>
  )
}

export default DetailProduct