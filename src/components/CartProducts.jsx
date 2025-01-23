import React from 'react'
import { useState , useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CartProducts = () => {
 
 const navigate = useNavigate() // this is use to navigate the page 

 const [cart, setCart] = useState([]); // this state is use for to store the cart in array

 // this useEffect hook is used for get the product from cart in local storgae
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);


// In this upadateQuantity  function takes id and increment  which upadate the product quantity if their id is same
  const updateQuantity = (id, increment) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(1, item.quantity + (increment ? 1 : -1)), 
        };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // set the updated cart into localstorage
  };

  // for remove the cart from local storage in this i use the filter 
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
 
  // this is use for to navigate back page
  const handleBack = ()=>{
    navigate(-1)
  }
  
  // this function is use for to calculate the total value of price 
  const calculateTotalPrice = ()=>{
   return cart.reduce((total , item) => total + item.price * item.quantity ,0) // sum the total price and multiply the quantity 
  }


  // It show the cart layout in cart component 
  return (
    <div className='w-full h-screen px-3 md:px-28'>
        <h3 className='text-lg font-semibold text-gray-700 text-center pt-3 mb-4'>Cart</h3>
        <button onClick={handleBack}>

        <h3 className='text-md text-gray-600 mb-5'>Back</h3>

        </button>
        <div className='w-full min-h-fit  flex flex-col '>
            <div className='flex justify-around h-10 items-center border rounded-md'>
                <h2 className='text-sm font-semibold text-gray-800'>Products</h2>
                <h2 className='text-sm font-semibold text-gray-800'>Price</h2>
                <h2 className='text-sm font-semibold text-gray-800'>Quantity</h2>
                <h2 className='text-sm font-semibold text-gray-800'>Subtotal</h2>
            </div>
            {cart.map((item)=>(


            <div className='h-60 w-full flex justify-around items-center  border-2 md:h-28 rounded-md mt-4 ' key={item.id}>
                <div className='flex w-20 h-full items-center '>
                    <div className='w-12 h-12 flex flex-col md:flex-row items-center gap-1 md:gap-2 text-wrap'>
                        <button onClick={()=> removeItem(item.id)} ><div className='w-16 h-6 bg-red-800 rounded-md flex justify-center items-center'>
                            <h6 className='text-white text-xs'>remove</h6>
                            </div></button>
                        <img src={item.thumbnail} className='w-full h-full object-cover rounded-md' alt="" />
                        <h3 className='text-gray-700 text-xs md:text-sm font-semibold '>{item.title}</h3>
                    </div>
                </div>
                    <h3 className='text-gray-700 text-sm md:text-md   font-semibold -ml-8'>{item.price}</h3>
                    <div className='w-12 h-12 border-2 border-gray-400 rounded-md flex flex-col items-center justify-between'>
                  <button onClick={()=> updateQuantity(item.id , true)} >  <IoIosArrowUp className='size-4' /> </button>
                    <h3 className='text-xs font-semibold text-black'>{item.quantity}</h3>
                  <button onClick={()=> updateQuantity(item.id , false)}>  <IoIosArrowDown className='size-4' /> </button>
                    </div>
                    <h3 className='text-gray-700 font-semibold text-sm md:text-md'>{(item.price * item.quantity).toFixed(2)}</h3>
            </div>
            ))}

          <button className='w-44 h-12 border-2 border-gray-400 rounded-md text-gray-900 mt-5' onClick={handleBack}>Return to Shop</button>
            
            <div className='w-72 h-60 border-2 border-gray-500 rounded-md mb-10  mt-10 p-5 '>
                <h3 className='text-sm font-semibold text-gray-900 '>Cart Total</h3>
                <div className='flex justify-between mt-3'>
                    <h3 className='text-md text-gray-700'>Subtotal:</h3>
                    {/* In this it show the total price with only two decimal  */}
                    <h3 className='text-md text-gray-700'>${calculateTotalPrice().toFixed(2)}</h3>
                </div>
                <div className='border-b border-gray-500 mt-2'></div>
                <div className='flex justify-between mt-3'>
                    <h3 className='text-md text-gray-700'>Shipping:</h3>
                    <h3 className='text-md text-gray-700'>Free</h3>
                </div>
                <div className='border-b border-gray-500 mt-2'></div>
                <div className='flex justify-between mt-3'>
                    <h3 className='text-md text-gray-700'>Total:</h3>
                    <h3 className='text-md text-gray-700'>${calculateTotalPrice().toFixed(2)}</h3>
                </div>
                <button className='w-44 h-10 rounded-md bg-red-500 text-white text-sm mt-3 ml-8'>Process to Checkout</button>
               
            </div>
        </div>
    </div>
  )
}

export default CartProducts