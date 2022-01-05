import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/appstore.png"
import "./Footer.css"


const Footer = () => {
    return (
        <footer id='footer'>
            <div className="leftFooter">
            <h1>eCart</h1>
            </div>
            <div className="midFooter">
                
                <p>We Believe in Quality</p>
                <p>Copyrights 2021 &copy; eCart</p>

            </div>
            <div className="rightFooter">
                <h4>Follow Us </h4>
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-youtube"></a>
                <a href="#" class="fa fa-instagram"></a>


            </div>
            
        </footer>
    )
}

export default Footer
