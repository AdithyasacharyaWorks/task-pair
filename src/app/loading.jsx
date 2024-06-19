import React from 'react'

import Loader from "../components/custom/Loader"
const loading = () => {
  return (
    <div className='flex justify-center items-center mt-32'>
      <Loader />
    </div>
  )
}

export default loading