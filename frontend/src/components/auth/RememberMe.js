import React, { useState } from "react";
import { Link } from 'react-router-dom';

const RememberMe = ({ label, checked, onChange }) => {

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <Link to='/resetpassword' className="font-medium text-primary-600 hover:text-primary-500">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}

export default RememberMe;