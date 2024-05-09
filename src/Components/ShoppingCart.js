import React, { useState, useEffect } from 'react';
import FetchWithAuth from './Auth/FetchWithAuth';

const accessToken = localStorage.getItem('accessToken'); // if no token then it means the user is not logged in
                                                        // then we display a message telling them they can't add to cart
                                                        // until they log in. Or we can redirect them to /login

let ALL_PRODUCTS_IN_CART_URL = 'http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/viewcart';
let ADD_CART_TO_CART_URL = 'http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/add-to-cart';
let DELETE_A_PRODUCT_FROM_CART = 'http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/delete-from-cart'; // this will delete the product from the cart no matter the quantity
let DELETE_ALL_PRODUCTS_FROM_CART = 'http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/clear-cart';
let UPDATE_CART_URL = 'http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/update-cart';
                    
function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [update, setUpdate] = useState(false); // actualizar shopping cart en tiempo real.
    const [showCart, setShowCart] = useState(false);  // To toggle cart display



    useEffect(() => {
        if (accessToken) {
            fetchProductsInCart();
        }
    }, [update]); // Update on changes to cart

    useEffect(() => {
        if (accessToken) {
            fetchProductsInCart();
        }
    }, [showCart]); // Update cart whenever it's opened


    
    const fetchProductsInCart = async () => {

        if (!accessToken) {return;}

        setIsLoading(true);
        try {
            const response = await FetchWithAuth('http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/viewcart', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await response.json();
            setCartItems(data.Products || []);
            setIsLoading(false);
        } catch (error) {
            console.error(`Error fetching cart items: ${error}`);
        }
    };



    const addToCart = async (productId, quantity) => {

        if (!accessToken) {return} // instead of return display a message to the user

        try {
            await FetchWithAuth('http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ productId, quantity })
            });
            setUpdate(!update); // Toggle to re-fetch cart items
        } catch (error) {
            console.error(`Error adding to cart: ${error}`);
        }
    };
   

    // USE TRY CATCH!
    const updateQuantity = async (productId, newQuantity) => {

        if (!accessToken) {return}

        const response = await fetch('http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/update-cart', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ productId, quantity: newQuantity })
        });
        if (response.ok) {
            setCartItems(prevItems =>
                prevItems.map(item => item.id === productId ? { ...item, ProductCart: { ...item.ProductCart, quantity: newQuantity } } : item)
            );
        } else {
            console.error('Failed to update quantity');
        }
    };


    // this is also a button that will be displayed to delete a specific product from the cart.
    const deleteFromCart = async (productId) => {
        try {
            await FetchWithAuth('http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/delete-from-cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ productId })
            });
            setUpdate(!update); // Toggle to re-fetch cart items
        } catch (error) {
            console.error(`Error deleting a product from cart: ${error}`);
        }
    };



    // this will also be a button which will show up once the user clicks on the cart and it opens up to the side.
    // this will delete all products from the cart, leaving it empty.
    const deleteAllProductsFromCart = async () => {
        try {
            await FetchWithAuth('http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/clear-cart', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setUpdate(!update); // Toggle to re-fetch cart items
        } catch (error) {
            console.error(`Error deleting all products from cart: ${error}`);
        }
    };

    const proceedToCheckout = () => {
        // Navigate to checkout page or handle checkout process
        // this button will redirect users to the ViewCart component.
        window.location.href = '/viewcart'
    };

    const toggleCart = () => {
        setShowCart(!showCart); // Toggle visibility of the cart
    };



    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="shopping-cart-icon">
            <button style={{ position: 'fixed', top: '20px', right: '20px' }} onClick={toggleCart}>🛒</button>
            {showCart && (
                <div className='Users-Shopping-Cart-Ultimate' style={{ position: 'fixed', top: '50px', right: '20px', width: '300px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h2>Shopping Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} style={{ marginBottom: '10px' }}>
                                <h3>{item.product} - ${item.price}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <button onClick={() => updateQuantity(item.id, item.ProductCart.quantity - 1)}>-</button>
                                        <span style={{ margin: '0 10px' }}>{item.ProductCart.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.ProductCart.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => deleteFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                    <button onClick={() => {proceedToCheckout()}}>Proceed to Checkout</button>
                    <button onClick={toggleCart} style={{ position: 'absolute', top: '5px', right: '5px' }}>Close</button>
                </div>
            )}
        </div>
    );
    
}

export default ShoppingCart;


// PROVIDE FEEBACK FOR USERS WHO TRY USING THE CART WITHOUT BEING LOGGED IN ! 

// this component will work inside the HOME component.
// below every product in the HOME component there will be a button saying 'add to cart' and when clicked, it 
// will add the specific product to this component (ShoppingCart). 
// because the products are being rendered we already have easy access to the id of each one.
/**
 * // new quantity to also adjust its amount in the cart itself
  const updateQuantity = async (productId, newQuantity) => {
        const response = await fetch('http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/update-cart', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ productId, quantity: newQuantity })
        });
        if (response.ok) {
            setCartItems(prevItems =>
                prevItems.map(item => item.id === productId ? { ...item, ProductCart: { ...item.ProductCart, quantity: newQuantity } } : item)
            );
        } else {
            console.error('Failed to update quantity');
        }
    };



     const deleteFromCart = async (productId) => {
        const response = await fetch(`http://proyecto-final-back-end-a466e2d08fab.herokuapp.com/user/delete-from-cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (response.ok) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        } else {
            console.error('Failed to delete item from cart');
        }
    };

 */