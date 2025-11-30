import React from 'react'
import { Link } from 'react-router-dom';
import errorimage from '../../assets/404.png';

const Index = () => {
    return (
        <div>
            <div className="grid grid-cols-12 justify-center pt-12">
                <div className="col-span-8 col-start-3">
                    <div className="pt-10 flex items-center justify-center place-items-center m-auto" style={{ maxWidth: "500px" }}>
                        <img src={errorimage} alt="404 error" className="img-fluid" />
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="mt-12 text-center">
                        <Link to="/" className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-10">Back to dashboard</Link>
                    </div>
                    <div className="text-center my-6">
                        <h4 className="text-3xl font-medium text-slate-900 dark:text-white mb-2"> Page not found </h4>
                        <p className='font-normal text-base text-slate-500 dark:text-slate-300 m-auto' style={{ maxWidth: "500px" }}>  The page you are looking for might have been removed had its name changed or is temporarily unavailable. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;
