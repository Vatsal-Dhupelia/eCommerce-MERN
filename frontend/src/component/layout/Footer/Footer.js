import React from 'react'
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
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-youtube"></a>
                <a href="#" className="fa fa-instagram"></a>


            </div>
            
        </footer>
    )
}

export default Footer
