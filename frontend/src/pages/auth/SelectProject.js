import React, { useState, useEffect } from 'react';
import Logo from '../../assets/maps-logo.png';
import WildArtLogo from '../../assets/wild-art-logo.png';

let projectSelectionHandler = (projectName) => {
    localStorage.setItem("selectedProject", projectName);
    window.location.href="/dashboard";
}

export default function SelectProject() {
    return (
        <>
          <div className="bg-whiteLinen flex grow bg-slate-50 dark:bg-navy-900 m-4 mt-8">
            <div className="pb-6 min-h-full flex flex-col w-full justify-center align-center">
                <h2 class="font-heading text-center text-xl font-light leading-tight text-muted-800 dark:text-white">
                    <span class="font-semibold">Select your project</span>
                </h2>
                <div className="flex items-center justify-center grid-cols-1 gap-5 mt-6 sm:grid-cols-1 xl:grid-cols-6 2xl:grid-cols-6">
                    <div onClick={()=>{projectSelectionHandler("maps")}} className="items-center p-8 justify-center bg-lightAlmond flex flex-col p-8 transition-shadow border rounded-lg shadow-sm hover:shadow-lg col-span-1 xl:col-span-1">
                        <img className="h-16" src={Logo} alt="logo" />
                    </div>
                    <div onClick={()=>{projectSelectionHandler("wildarts")}} className="items-center p-8 justify-center text-xl bg-lightAlmond transition-shadow border rounded-lg shadow-sm hover:shadow-lg flex col-span-1 sm:col-span-1 md:col-span-1 xl:col-span-1">
                        <img className="h-16" src={WildArtLogo} alt="logo" />
                    </div>
                </div>
            </div>
          </div>
        </>
    );
}