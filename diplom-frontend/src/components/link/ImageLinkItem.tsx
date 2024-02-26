import { FC } from "react"
import { Link } from "react-router-dom"
import { Image } from "../image/Image"
import { TImageLink } from "../../types/TImageLink"

interface ImageLinkItemProps {
    img: TImageLink,
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