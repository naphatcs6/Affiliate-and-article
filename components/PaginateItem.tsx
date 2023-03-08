import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';


export default function PaginateItem({ totalPosts, postsPerPage, setCurrentPage, currentPage, }: any) {
  // let pages = [];
  const pages : number[] = [];
  let i = 1;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className='pagination'>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className='font-medium m-4 py-3 px-4 rounded border-2 border-black bg-white'>
              {page}
            </button>
          );
        })}
      </div>
    </>
  )
}