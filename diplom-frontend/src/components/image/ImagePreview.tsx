import { FC, useEffect, useState } from "react"

interface ImagePreviewProps {
    file?: File,
    classNameContainer?: string
}
export const ImagePreview:FC<ImagePreviewProps> = ({file, classNameContainer}) => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if(!file) {
            return
        }
        setPreviewUrl(URL.createObjectURL(file))
    }, [file, setPreviewUrl])

    if(!previewUrl) return null
    return(
        <div className={classNameContainer}>
            <img src={previewUrl} alt="preview" />
        </div>
        
    )
}