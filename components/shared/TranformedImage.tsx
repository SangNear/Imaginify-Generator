import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { CldImage } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const TranformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = true }: TransformedImageProps) => {
  const downloadHandler = () => {

  }
  return (
    <div>
      <div className='flex-between'>
        <h3 className='h3-bold text-dark-600'>
          Tranformed
        </h3>
        {hasDownload && (
          <button className='download-btn' onClick={downloadHandler}>
            <Image
              src="/assets/icons/download.svg"
              alt='download'
              className='pb-[6px]'
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {image?.publicId && transformationConfig ?
        (
          <div className='relative'>
            <CldImage
              width={getImageSize(type, image, "width")}
              height={getImageSize(type, image, "height")}
              src={image?.publicId}
              alt='image'
              sizes={"(max-width: 767px) 100vw, 50vw"}
              placeholder={dataUrl as PlaceholderValue}
              className='tranformed-image'
              onLoad={() => {
                setIsTransforming && setIsTransforming(false);
              }}
              onError={() => {
                debounce(() => {
                  setIsTransforming && setIsTransforming(false);
                }, 8000)()
              }}
              {...transformationConfig}
            />

          </div>
        )
        :
        (
          <div className='transformed-placeholder'>
            Tranformed Image
          </div>
        )
      }
    </div>
  )
}

export default TranformedImage