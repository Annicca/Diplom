import { FC } from "react"
import { Link } from "react-router-dom"
import { TypeLink } from "../../types/TypeLink"

interface LinkItemProps {
    item: TypeLink,
    className?: string
}

export const LinkItem: FC<LinkItemProps> = ({item, className}) => {
    return(
        <Link key = {item.title} to = {item.link} className={className}>
            {item.title}
        </Link>
    )
}    