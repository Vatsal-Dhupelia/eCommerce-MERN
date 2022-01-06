import React from 'react'
import "./Home.css"
import Product from "./Product.js"

const product = {
    name: "Blue Tshirt",
    images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
    price: "₹3000",
    _id: "Vatsal"
}


const Home = () => {
    return (
        <>
            <div className="banner">
                <h1>eCart</h1>
                <h2>Quality Product is Our Habit !!</h2>
                <form class="d-flex">
                    <input class="form-control me-3" type="search" placeholder="Search Products" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>

            <h2 className="homeHeading">
                Featured Products
            </h2>

            <div className="container" id='container'>
                <Product product = {product}/>
                <Product product = {product}/>
                <Product product = {product}/>
                <Product product = {product}/>

                <Product product = {product}/>
                <Product product = {product}/>
                <Product product = {product}/>
                <Product product = {product}/>
                
            </div>
        </>
    )
}

export default Home
