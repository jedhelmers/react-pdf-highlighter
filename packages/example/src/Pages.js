import React from 'react'

const Pages = ({ pages = 0 }) => {


  return (
    <div className=''>
      {
        createPages(pages)
      }
    </div>
  )
}

const createPages = (num) => {
  let result = []
  for(let i = 0; i < num; i++) {
    result.push(<div className='thumbnail flex-column-c'>{i + 1}</div>)
  }

  return result
}

export default Pages
