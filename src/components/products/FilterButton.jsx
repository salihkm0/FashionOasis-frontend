import React from 'react'

export const FilterButton = ({handleClick ,title,value}) => {
  return (
    <>
        <button className="border rounded-[4px] border-gray-300 py-1 px-2" onClick={handleClick} value={value} >{title}</button>
    </>
  )
}
