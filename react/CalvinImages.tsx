import React, { FC, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useLazyQuery } from 'react-apollo'

import ProductQuery from './queries/ProductQuery.gql'
import InitialImage from './InitialImage'

const CSS_HANDLES = ['ckImagesContainer'] as const

const CalvinImages: FC = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [pdpImages, { loading, error, data }] = useLazyQuery(ProductQuery)
  const slug = 'calcinha-short-modern-cotton-preto-f3788p_0987'

  useEffect(() => {
    const variables = { slug: '' }

    pdpImages({ variables: { ...variables, slug } })
  }, [pdpImages])

  if (loading) {
    return (
      <>
        <h6>Carregando ...</h6>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h6>Erro ao carregar imagens</h6>
      </>
    )
  }

  if (data) {
    const imagesMap = data.product.items.map((skuData: SkuData) => {
      return skuData.images.map((imagesData: ImageData, index: number) => {
        return (
          <InitialImage
            imageUrl={imagesData.imageUrl}
            imageText={imagesData.imageText}
            key={index}
          />
        )
      })
    })

    return (
      <div className={`${handles.ckImagesContainer} flex w-100`}>
        {imagesMap}
      </div>
    )
  }

  return <></>
}

export interface SkuData {
  images: ImageData[]
}

export interface ImageData {
  imageUrl: string
  imageText: string
}

export default CalvinImages
