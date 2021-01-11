import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import {useImages} from './ImagesProvider'

const CSS_HANDLES = ['imagesContainer'] as const

const PDPImages: FC = () => {

  const {imagesMap} = useImages()

  const handles = useCssHandles(CSS_HANDLES);


    return (
        <div className={handles.imagesContainer}>
          {imagesMap}
        </div>
    )
}

export default PDPImages
