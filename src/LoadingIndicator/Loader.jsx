import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center items-center mt-[16px] w-full min-h-screen">
    <div className="spinner-border animate-spin rounded-full h-8 w-8 border-solid border-t-2 border-b-2 border-blue-700"></div>
  </div>
  )
}

export default Loader