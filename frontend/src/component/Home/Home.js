import React, { useEffect } from 'react'
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData'
import { getProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const { loading, error, products, productsCount } = useSelector((state) => state.products)
    useEffect(() => {
        if(error){
            return alert.error(error)
        }
        dispatch(getProduct());
    }, [dispatch, error])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="eCart" />
                    <div className="banner">
                        <h1>eCart</h1>
                        <h2>Quality Product is Our Habit !!</h2>
                        <form className="d-flex">
                            <input className="form-control me-3" type="search" placeholder="Search Products" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>

                    <h2 className="homeHeading">
                        Featured Products
                    </h2>

                    <div className="container" id='container'>
                        {products && products.map(product => (
                            <Product product={product} />
                        ))}

                    </div>
                </>
            )}
        </>
    )
}

export default Home
