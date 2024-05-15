import { FC } from "react"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement"

interface CreateNominations {
    register: UseFormRegister<CreateStatementForm>,
    errors: FieldErrors<CreateStatementForm>,
    control?: Control<CreateStatementForm>
}

export const CreateNominations:FC<CreateNominations> = () => {

    return(
        <>
        </>
    )
}