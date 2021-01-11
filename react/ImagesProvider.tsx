import React, {FC,createContext, useState, useContext,useEffect} from 'react'
import {useProduct} from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles';

interface IProps {
  hiddenImages?: string
}

export interface ImageData {
  imageUrl: string
  imageText: string
  imageLabel: string
}

interface ImagesContextData{
  imagesMap: (JSX.Element | undefined)[] | undefined,
  clickedImage: any
}

const ImagesContext = createContext({} as ImagesContextData)

const CSS_HANDLES = ['eachImage'] as const

const ImagesProvider: FC<IProps> = ({hiddenImages, children}) => {
 
  const productContextValue = useProduct();

  const [imagesMap, setImagesMap] = useState<(JSX.Element | undefined)[] | undefined>([])
  const [clickedImage, setClickedImage] = useState({imageText: '', imageURL: ''})

  //Incio Contexto Produto

  const handles = useCssHandles(CSS_HANDLES);

  //const imagesMapLenght = productContextValue?.selectedItem?.images?.length ? productContextValue?.selectedItem?.images?.length : 1
  //const percentual = 100/imagesMapLenght

  useEffect(() => {
    const newImagesMap = productContextValue?.selectedItem?.images.map((imagesData: ImageData, index: number) => {
      if(imagesData.imageLabel===hiddenImages){
        return
      }
      return (
        <div key={index} className={`${handles.eachImage} border-box`}>
          <img
            className="border-box"
            src={imagesData.imageUrl}
            alt={imagesData.imageText}
            onClick={() =>{setClickedImage({imageText: imagesData.imageText, imageURL: imagesData.imageUrl}), console.log(imagesData.imageUrl), console.log(productContextValue?.selectedItem)}}
            key={index}
          />
        </div>
      )
    })
    setImagesMap(newImagesMap)
  }, [productContextValue?.selectedItem])

  //Fim Contexto Produto

  useEffect(()=>{
    console.log(`atualizei o clickedImage ${clickedImage}`)
  }, [clickedImage])  

  //Criar Context Provider
  return (
    <ImagesContext.Provider value={{imagesMap, clickedImage}}>
      {children}
    </ImagesContext.Provider>
  )
  //Fim Context Provider

}

export function useImages(){
  const context = useContext(ImagesContext)

  return context
}

export default ImagesProvider