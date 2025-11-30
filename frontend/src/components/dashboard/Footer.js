import React from "react";

const Footer = ({ issidebar, changeSidebar, islogin }) => {

    return (
        <footer className="mt-auto py-3 border-t dark:border-white/10 bg-white dark:bg-bgdark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" bis_skin_checked="1">
                <p className="text-center text-sm">Copyright © <span id="year">2023</span>
                    <a href="#" className="text-primary">CEDCOSS</a>. Designed with
                    <span className="ri ri-heart-fill text-red-500"></span> by
                    <a className="text-primary" href="#"> CEDCOSS
                    </a> All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;