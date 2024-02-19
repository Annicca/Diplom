import { FC } from "react"
import { Link } from "react-router-dom"
import { Image } from "../image/Image"
import { ImageLink } from "../../types/ImageLink"

interface ImageLinkItemProps {
    img: ImageLink,
    className?: string
}
export const ImageLinkItem: FC<ImageLinkItemProps> = ({img, className}) => {
    return (
        <Link to = {img.link} key = {img.link}>
            <Image 
                src = {img.src}
                alt={img.alt}
                className = {className} /> 
        </Link> 
    )
}