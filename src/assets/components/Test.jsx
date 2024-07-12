import React from 'react'

const Test = ({data}) => {
    // let newData = JSON.parse(data)
    console.log(data)
  return (
    <div>{data.id}</div>
  )
}

export default Test