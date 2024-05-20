import { FC, InputHTMLAttributes, forwardRef } from 'react'
import FileUploadIcon from 'assets/icons/upload.svg?react'
import style from './FileUpload.module.scss'

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    accept?: string,
    file?: File,
    error?: string
}

export const FileUpload:FC<FileUploadProps> = forwardRef<HTMLInputElement, FileUploadProps>((props, ref) => {
    const {label, accept, file, error, id, ...inputProps} = props

    return(
        <div className={style.fileContainer} key = {id}>
                <p className={style.fileContainer__title}>{label}</p>
                <input 
                    ref={ref}
                    type="file" 
                    id = {id}
                    accept = {accept}
                    className={style.fileContainer__input}
                    {...inputProps} 
                />
                <label htmlFor={id} className={style.label}>
                    <div className={style.fileContainer__button}>
                        <FileUploadIcon width={20} height={20} />
                    </div>
                    <div key = {file?.name} className={style.fileContainer__text}>{ !file || !file.name ? "Файл не выбран" : file.name.length > 19 ? file.name.slice(15) : file.name }</div>
                </label>
                {error && <div className='error-text'>{error}</div>}
        </div>
    )
})