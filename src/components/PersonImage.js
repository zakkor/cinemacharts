import React from 'react'

function PersonImage(props) {
  return (
    <img
      alt={`Portrait of ${props.name}`}
      width={props.width} height={props.height}
      src={props.src}
      className={"rounded-md border-2 border-gray-400 " + props.className}></img>
  )
}
export default PersonImage