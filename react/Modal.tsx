import React, { FC, useCallback, useEffect, useState } from 'react'
import MousePosition from './MousePosition'
import { useImages } from './ImagesProvider'
import { useCssHandles } from 'vtex.css-handles'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export interface IModal {
  src: string
  alt: string
}

export interface ImageData {
  imageUrl: string
  imageText: string
  imageLabel: string
}

interface Props {
  thumbnailQuantity: number,
  thumbnailImageWidth: number
}

const CSS_HANDLES = [
  'thumbnailContainer',
  'mainModalImage',
  'wholeModal',
  'sideContainer',
] as const

interface stateTop {
  withModal: {
    top?: number;
    maxWidth: string;
}
}

const Modal: FC<Props> = ({thumbnailQuantity, thumbnailImageWidth}) => {
  const handles = useCssHandles(CSS_HANDLES)

  //console.log(thumbnailImageWidth, 'hi')

  const {
    imagesMap,
    clickedImage: { imageText, imageURL },
  } = useImages()

  //Beggining of modal Mouse move logic
  const imageElement = document.getElementsByClassName("calvinklein-calvin-klein-images-0-x-mainModalImage")
  const imageHeight = imageElement[0]?.clientHeight
  const windowHeight = window.innerHeight
  const maximumTop = windowHeight - imageHeight
  const mouseRatio = maximumTop/windowHeight

  //console.log(maximumTop, thumbnailImageWidth)
  const { x, y } = MousePosition()

  //console.log(y)
  typeof x === 'number' && typeof y === 'number'
  const [styles, setStyles] = useState<stateTop>({ withModal: { maxWidth: '100%' } })

  useEffect(() => {
    const styles = {
      withModal: { top: -y*-mouseRatio > maximumTop ? -y*-mouseRatio : maximumTop, maxWidth: '100%'  },
    }

    if(maximumTop > 0){
      setStyles({withModal: { maxWidth: '70%' }})
      return
    }

    setStyles(styles)
  }, [y])
  //Ending of modal Mouse move logic

  const imagesMapWithoutUndefined = imagesMap?.filter(
    eachElement => eachElement
  )

  const imagesMapTotalLength = imagesMapWithoutUndefined?.length

  thumbnailQuantity >= 2 && thumbnailQuantity <= 6 ? thumbnailQuantity : thumbnailQuantity = 3
  
  if(imagesMapTotalLength){
    thumbnailQuantity >= imagesMapTotalLength ? thumbnailQuantity = imagesMapTotalLength : thumbnailQuantity
  }

  const initialPositionObject: any[] = []

  useEffect(()=>{
    for (let i = 0; i < thumbnailQuantity; i++){
      //  console.log(`position ${i}`)
      initialPositionObject.push({position:i})
    }
  },[])

  const [positions, setPositions] = useState<any[]>(initialPositionObject)

  const handleClickHey = useCallback(
    (type: string) => {

      const newPositionsArray: any[] = []

      positions.map(eachPosition => {
        switch (type) {
          case 'up':
            if(eachPosition.position === 0){
              newPositionsArray.push({position: imagesMapTotalLength as number - 1})
            } else{
              newPositionsArray.push({position: eachPosition.position - 1})
            }
            return

          case 'down':
            if(eachPosition.position === ((imagesMapTotalLength as number) - 1)){
              newPositionsArray.push({position: 0})
            } else{
              newPositionsArray.push({position: eachPosition.position + 1})
            }
            return
        }
      })
      setPositions(newPositionsArray)
    },
    [positions, imagesMapTotalLength]
  )

  const [imagesToShow, setImagesToShow] = useState<(JSX.Element | undefined)[]>([])

  useEffect(()=>{
    if(imagesMapWithoutUndefined){

      const newimagesToShow = positions.map(eachPosition => 
        {return imagesMapWithoutUndefined[eachPosition.position]}
      )
      setImagesToShow(newimagesToShow)
      console.log(newimagesToShow)
    }
  },[positions])

  //padding 8%

  return (
    <div className={`${handles.wholeModal} flex flex-row items-center justify-start`}>
      <div className={`${handles.sideContainer} flex flex-column items-center justify-center`} style={{width: "fit-content"}}>
        <button
          type="button"
          className="bg-transparent b--transparent outline-transparent"
          onClick={() => {
            handleClickHey('up')
          }}
        >
          <FiChevronUp size={40} />
        </button>

        <div className={`${handles.thumbnailContainer} flex flex-column`} style={{maxWidth: '15vh', padding: `0px ${thumbnailImageWidth}%`}}>
          {imagesToShow}
        </div>

        <button 
          type="button"
          className="bg-transparent b--transparent outline-transparent"
          onClick={() => {
            //handleClick('down'),
            handleClickHey('down')
          }}
        >
          <FiChevronDown size={40} />
        </button>
      </div>

      <img
        className={handles.mainModalImage}
        src={imageURL}
        alt={imageText}
        style={styles.withModal}
      />
    </div>
  )
}

export default Modal
