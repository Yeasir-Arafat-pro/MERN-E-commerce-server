import React, { useEffect } from 'react'

const ShowProducts = ({setSearch,setSortBy,setSortOrder, isLoading, error, products}) => {

    useEffect(() => {
      // ডেটা/সার্চ সম্পন্ন হলে:
      setTimeout(() => {
        document.querySelector('.table').classList.add('visible');
      }, 200);
    }, [products]);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Search:</th>
          <td colSpan={1}>
            <input onChange={(e) => setSearch(e.target.value)} type="text" />
          </td>
          <th>Sort By:</th>
          <td colSpan={1}>
            <select name="sortBy" onChange={(e) => setSortBy(e.target.value)}>
              <option value="createdAt">Created At</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
              <option value="sold">Sold</option>
            </select>
          </td>
          <th>Order:</th>
          <td colSpan={1}>
            <select
              name="sortOrder"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Name</th>
          <th colSpan={3}>Description</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {!isLoading && !error && products ? (
          products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td colSpan={3}>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Data not found...</td>
          </tr>
        )}
        {isLoading && (
          <tr>
            <td colSpan="6">Loading...</td>
          </tr>
        )}
        {error && (
          <tr>
            <td colSpan="6">{error}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ShowProducts