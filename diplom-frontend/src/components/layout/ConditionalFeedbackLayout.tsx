import { FC, PropsWithChildren, ReactNode } from "react"
import { AxiosError } from "axios"
import { ETypeMessage } from "src/types/ETypeMessage"
import { Message } from "../message/Message"


interface ConditionalFeedbackLayoutProps {
    isLoading: boolean,
    isError: boolean,
    error: AxiosError | null,
    loadingElement: ReactNode
}

export const ConditionalFeedbackLayout:FC<PropsWithChildren<ConditionalFeedbackLayoutProps>> = ({isLoading, isError, error, loadingElement, children}) => {
    
    console.log(isLoading)
    
    if(isLoading) return <>{loadingElement}</>

    else if(isError) return <Message type={ETypeMessage.ERROR}>{error? error.response ? String(error.response.data) : error.message : 'Произошла ошибка'}</Message>

    else return <>{children}</>
}