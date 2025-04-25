
import React, { useEffect, useState } from 'react'


import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts} from '../../features/products/productSlice';
import Pagination from '../../components/app/Pagination';
import ShowProducts from '../../components/products/ShowProducts';


const AllProducts = () => {
 const { products, pagination, isLoading, error } = useSelector((state) => state.productR);

 //console.log("products", products);

 
const dispatch = useDispatch()
const navigate = useNavigate()
// pagination
const limits  = 20
const [currentPage, setCurrentPage] = useState(pagination.currentPage || 1);
const [totalPages, setTotalPages] = useState(pagination.totalPages);
const [search, setSearch] = useState('');
//sort
const [sortBy, setSortBy] = useState(''); // Add sort state
const [sortOrder, setSortOrder] = useState('asc'); // Add sort order state

useEffect(() => {
  dispatch(
    fetchProducts({
      page: currentPage,
      limit: limits,
      search,
      sortBy,
      sortOrder,
    })
  );
},[dispatch, currentPage, search, sortBy, sortOrder, navigate])


  return (
           <div className='userContainer'>
      <section className="users">

        <h1>List Of Products</h1>
        <ShowProducts setSearch={setSearch} setSortBy={setSortBy} setSortOrder={setSortOrder} isLoading={isLoading} error={error} products={products}/>


        {/* pagination */}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
        pagination={pagination}  totalPages={totalPages} />
      </section>

    </div>
  );
}

export default AllProducts