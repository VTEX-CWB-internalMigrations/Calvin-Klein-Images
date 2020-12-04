import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['initialImages'] as const

const InitialImage = (props: InitialProps) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <>
      <img
        className={`${handles.initialImages}`}
        src={props.imageUrl}
        alt={props.imageText}
      />
    </>
  )
}

export interface InitialProps {
  imageUrl: string
  imageText: string
}

export default InitialImage
