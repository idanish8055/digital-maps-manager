import React from 'react';
import errorimage from '../../assets/500.png';

const ServerIssue = () => {
    return (
        <div>
            <div className="grid grid-cols-12 justify-center pt-12">
                <div className="col-span-8 col-start-3">
                    <div className="pt-10 flex items-center justify-center place-items-center m-auto" style={{ maxWidth: "600px" }}>
                        <img src={errorimage} alt="404 error" className="img-fluid" />
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="text-center pt-8">
                        <h4 className="text-3xl font-medium text-slate-900 dark:text-white mb-2"> We are under maintenance. </h4>
                        <p className='font-normal text-base text-slate-500 dark:text-slate-300'> We’re making the system more awesome. </p>
                        <p className='font-normal text-base text-slate-500 dark:text-slate-300'>  We’ll be back shortly.  </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServerIssue;
