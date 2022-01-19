import React, { useState, useEffect } from 'react'
import "./Home.css"
import Product from "./ProductCard.js"
import MetaData from '../layout/MetaData'
import { clearErrors, getProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert';

const Home = ({history}) => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const [keyword, setKeyword] = useState("");
    const { loading, error, products, productsCount } = useSelector((state) => state.products)

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`);
        }
        else{
            history.push("/products");
        }

    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])
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
                        <form className="d-flex" onSubmit={searchSubmitHandler}>
                            <input className="form-control me-3" type="search" placeholder="Search Products" aria-label="Search" onChange={(e) => setKeyword(e.target.value)} />
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

// 06.36.00