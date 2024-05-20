import { FC } from "react";
import { CreateStatementForm } from "src/pages/CreateStatement/CreateStatement";
import { chooseTypeStatement, transformDate } from "src/utils/helpers";
import classNames from "classnames";
import { NestedList } from "../nominationsList/NestedList";
import { FileUpload } from "src/uikit/fileUpload/FileUpload";
import { DescriptionItem } from "../descriptionItem/DescriptionItem";
import { NominationsList } from "../nominationsList/NominationsList";

import style from "../../uikit/statement/Statement.module.scss"

interface StatementPreviewProps {
    statementPreview: CreateStatementForm
}

export const StatementPreview:FC<StatementPreviewProps> = ({statementPreview}) => {
    return(
        <article className={classNames(style.statement, style.statement__preview)}>
            <div className={style.statement__data}>
                <div className="text-orange">Тип: {chooseTypeStatement(statementPreview.type)}</div>
                <div>Название: {statementPreview.name}</div>
                <div>Город: {statementPreview.city.label}</div>
                {statementPreview.dateStart && <div>Дата начала: {transformDate(statementPreview.dateStart)}</div>}
                {statementPreview.dateFinish && <div>Дата оконания: {transformDate(statementPreview.dateFinish)}</div>}
                <div>Стоимость конкурсного взноса: {statementPreview.competitionFee}</div>
                {statementPreview.rules.length > 0 && statementPreview.rules[0] &&
                    <FileUpload key = "rulesPreview" file={statementPreview.rules[0]} label="Положение конкурса:" />
                }
                {statementPreview.regulation.length > 0 && statementPreview.regulation[0] &&
                    <FileUpload key = "regulationPreview" file={statementPreview.regulation[0]} label="Правила проведения:" />
                }
                {statementPreview.description && <DescriptionItem description={statementPreview.description} />}
                {statementPreview.nominations && <NominationsList nominationsList={statementPreview.nominations}/>}
                {statementPreview.ageCategories && statementPreview.ageCategories?.length > 0 &&
                    <NestedList key = "age" list={statementPreview.ageCategories} nameList="Возрастные категории" />
                }
                {statementPreview.groupCategories && statementPreview.groupCategories?.length > 0 &&
                    <NestedList key = "groupCategory" list={statementPreview.groupCategories} nameList="Групповые формы" />
                }
            </div>
        </article>
    )
}