import React, {useEffect} from 'react'
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData'
import {getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"

const product = {
    name: "Blue Tshirt",
    images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
    price: "₹3000",
    _id: "Vatsal"
}


const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    return (
        <>
            <MetaData title="eCart"/>
            <div className="banner">
                <h1>eCart</h1>
                <h2>Quality Product is Our Habit !!</h2>
                <form className="d-flex">
                    <input className="form-control me-3" type="search" placeholder="Search Products" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
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
