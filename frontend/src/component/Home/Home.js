import React from 'react'
import "./Home.css"
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
        </>
    )
}

export default Home
