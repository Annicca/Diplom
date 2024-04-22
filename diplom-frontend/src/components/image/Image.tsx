import { FC } from "react"
import { URL_IMAGE } from "src/Constants"
import ImageMock from 'assets/images/photo.png'

interface ImageProps {
    src: string | null,
    alt: string,
    width?: number,
    height?: number,
    className?: string
}

export const Image: FC<ImageProps> = ({src,alt,width, height, className})=>{
    return(
        src ? <img
            src = {URL_IMAGE + src}
            alt = {alt}
            width = {width}
            height = {height}
            className = {className}
        /> :
        <img
            src = {ImageMock}
            alt = {alt}
            width = {width}
            height = {height}
            className = {className}
        />
    )
}