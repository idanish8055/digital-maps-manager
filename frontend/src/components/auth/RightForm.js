import React from "react";
import {Link} from 'react-router-dom';
import Logo from '../../assets/maps-logo.png';

const RightForm = (props) => {

    return(
        <main className="flex w-full flex-col items-center bg-whiteLinen dark:bg-navy-700 lg:max-w-lg">
        <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
          <div className="text-center">
          <img className="mx-auto h-12 lg:hidden" src={Logo} alt="logo" />
            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                    {props.heading}
                </h2>
                <p className="text-slate-400 dark:text-navy-300 mt-2">
                {props.paragraph} {' '}
                <Link to={props.linkUrl} className="font-medium text-primary-600 hover:text-primary-500">
                    {props.linkName}
                </Link>
                </p>
            </div>
          </div>
          <div className="">
            {props.children}
          </div>
        </div>
      </main>
    );

}

export default RightForm;