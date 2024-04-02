import { FC } from "react"
import { URL_IMAGE } from "src/Constants"

interface ImageProps {
    src: string,
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
            src = 'assets/images/photo.png'
            alt = {alt}
            width = {width}
            height = {height}
            className = {className}
        />
    )
}