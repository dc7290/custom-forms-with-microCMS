import NextImage, { ImageProps, ImageLoader } from 'next/image'

type Props = Omit<ImageProps, 'src' | 'width' | 'height' | 'alt' | 'layout'> & {
  src: string
  width: number
  height: number
  alt: string
}

const defaultLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=${quality !== undefined ? '' : 'compress,'}format&w=${width}${
    quality !== undefined ? `&q=${quality}` : ''
  }`

const MicroCMSImage = ({ loader = defaultLoader, className, ...imageProps }: Props) => {
  return (
    <div className={className}>
      <NextImage
        {...imageProps}
        loader={loader}
        layout="responsive"
        placeholder="blur"
        blurDataURL={`${imageProps.src}?auto=compress&w=10`}
      />
    </div>
  )
}

export default MicroCMSImage
