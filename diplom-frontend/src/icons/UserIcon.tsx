import { FC } from "react";
import { IconsType } from "../types/IconsType";

export const UserIcon:FC<IconsType> = ({className}) => {
    return(
<svg width="50" height="50" viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="24" fill="white" stroke="#4F4F4F" strokeWidth="2"/>
<path d="M9.44434 42.7778C17.0774 30.9197 31.6958 30.6749 40.5554 42.7778" stroke="#4F4F4F" strokeWidth="3" strokeLinecap="round"/>
<circle cx="25" cy="18.3333" r="10.1111" fill="#FFD700" stroke="#4F4F4F" strokeWidth="2"/>
<path d="M39.5272 42.9054C36.4867 45.6081 30.4056 47.973 25.0002 47.973C18.9097 47.973 13.1758 45.2703 10.4731 42.9054C12.5002 39.8649 17.2299 34.7973 24.3245 34.7973C31.4191 34.4595 37.1623 39.8649 39.5272 42.9054Z" fill="#FFD700"/>
</svg>
    )
}