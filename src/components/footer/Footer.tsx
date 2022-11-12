import React from 'react';

const Footer = () => {
    return (
        <div className='footer mt-3'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-auto'>
                        <p>New York Times &#169; Copyright {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;