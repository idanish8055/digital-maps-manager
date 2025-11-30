import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CrudHandler = ({ selection, action, setModalOpen, fetchData }) => {
  // const history = useHistory();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    // try {
    //   const res = await axios.delete('/api/products', { data: selection });
    //   console.log(res.data);
    //   fetchData();
    //   setModalOpen(false);
    // } catch (err) {
    //   console.log(err);
    //   setError(err.message);
    // }
    console.log("hello" , fetchData)
  };

  const handleUpdate = async () => {
    // handle update action
  };

  const handleCreate = async () => {
    // handle create action
  };

  switch (action) {
    case 'delete':
      return (
        <div>
          <h2>Delete Product</h2>
          <p>Are you sure you want to delete the selected product(s)?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
          {error && <p>{error}</p>}
         
        </div>
      );
    case 'update':
      return (
        <div>
          <h2>Update Product</h2>
        
          <p>Update form goes here</p>
          
        </div>
      );
    case 'create':
      return (
        <div>
          <h2>Create Product</h2>
          <p>Create form goes here</p>
        </div>
      );
    default:
      return null;
  }
};

export default CrudHandler;
