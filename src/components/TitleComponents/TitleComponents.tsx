import React from 'react'

const TitleComponents = ({ title } : {title: string}) => {
  return (
    <div style={{ fontSize: '40px', fontWeight: 500 }}>{title}</div>
  )
}

export default TitleComponents
