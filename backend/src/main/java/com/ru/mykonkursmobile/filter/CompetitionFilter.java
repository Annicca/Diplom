package com.ru.mykonkursmobile.filter;

import com.ru.mykonkursmobile.enums.StatusCompetition;
import com.ru.mykonkursmobile.models.Competition;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.executable.ValidateOnExecution;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.ArrayList;

public class CompetitionFilter implements Specification<Competition> {

    private String city;
    
    private Date dateStart;
    private Date dateFinish;
    private boolean isStatusCompetition;
    private String typeSort;

    @Override
    public Predicate toPredicate(Root<Competition> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder)
    {

        ArrayList<Predicate> predicates = new ArrayList<>();

        if (StringUtils.isNotBlank(city))
        {
            predicates.add(criteriaBuilder.like(root.get("cityCompetition").get("city"), city + "%"));

        }
        if(dateStart != null){
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("dateStart"),dateStart));
        }
        if(dateFinish != null){
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("dateFinish"),dateFinish));
        }
        if(isStatusCompetition){
            predicates.add(criteriaBuilder.equal(root.get("statusCompetition"),StatusCompetition.CREATED));
        }

        predicates.add(criteriaBuilder.notEqual(root.get("statusCompetition"),StatusCompetition.FINISHED));
        predicates.add(criteriaBuilder.notEqual(root.get("statusCompetition"),StatusCompetition.CANCELLED));

        if (StringUtils.isNotBlank(typeSort)) {
            if (typeSort.equals("DESC")) {
                query.orderBy(criteriaBuilder.desc(root.get("dateStart")));
            } else if (typeSort.equals("ASC")) {
                query.orderBy(criteriaBuilder.asc(root.get("dateStart")));
            }
        } else {
            query.orderBy(criteriaBuilder.desc(root.get("dateStart")));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateFinish() {
        return dateFinish;
    }

    public void setDateFinish(Date dateFinish) {
        this.dateFinish = dateFinish;
    }

    public boolean isStatusCompetition() {
        return isStatusCompetition;
    }

    public void setStatusCompetition(boolean statusCompetition) {
        isStatusCompetition = statusCompetition;
    }

    public String getTypeSort() {
        return typeSort;
    }

    public void setTypeSort(String typeSort) {
        this.typeSort = typeSort;
    }
}
