import { FC } from "react"
import { IconsType } from "../types/IconsType"

export const LkIcon: FC<IconsType> = ({className, width, height}) => {
    return (
        <svg width={width} height='auto' viewBox={`0 0 ${width} ${height}`} fill="none" className = {className} xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12.5" r="12" stroke="#4F4F4F"/>
            <path d="M4.72217 21.3889C8.53868 15.4599 15.8479 15.3375 20.2777 21.3889" stroke="#4F4F4F" stroke-linecap="round"/>
            <circle cx="12.5" cy="9.16664" r="5.05556" stroke="#4F4F4F"/>
        </svg>
    )
}