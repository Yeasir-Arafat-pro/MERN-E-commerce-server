import React from 'react'

const Pagination = ({currentPage, setCurrentPage, pagination, totalPages}) => {
  return (
    <section className="pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(pagination.previousPage)}
    >
      Previous
    </button>
    <span>{currentPage}</span>
    {Array.from({ length: pagination.totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? "active" : ""}
      >
        {index + 1}
      </button>
    ))}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(pagination.nextPage)}
    >
      Next
    </button>
  </section>
  )
}

export default Pagination