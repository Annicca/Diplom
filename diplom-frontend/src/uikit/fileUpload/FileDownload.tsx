import { FC } from "react";
import DownloadIcon from 'assets/icons/download.svg?react'
import { URL_FILE } from "src/Constants";

import style from './FileUpload.module.scss'


interface FileDownloadProps {
    fileName: string;
    text: string;
    newFileName?: string;
}

export const FileDownload:FC<FileDownloadProps> = ({fileName, text, newFileName}) => {
    if(newFileName) {
        newFileName = newFileName + '.' + fileName.split('.').pop()
    }
 
    return(
        <div className={style.label}>
            <a 
                className={style.fileContainer__button}  
                href = {URL_FILE + fileName }
                target = '_blank' 
                download={newFileName || fileName} 
                rel="noreferrer"
            >
                <DownloadIcon width={20} height={20} />
            </a>
            <div className={style.fileContainer__text}>{text}</div>
        </div>
    )
}