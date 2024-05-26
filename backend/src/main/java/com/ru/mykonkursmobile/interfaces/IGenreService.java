package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.AgeCategory;
import com.ru.mykonkursmobile.models.Genre;
import java.util.List;

public interface IGenreService extends IService<Genre>{

    /**
     * A method that returns a List of genres
     * @return List of the genres
     */
    List<Genre> all();

    /**
     * Method of adding record in the database
     * @param genre - the genre to add
     * @return genre - see {@link Genre}
     */
    Genre add( Genre genre);

    /**
     * Method of adding list of genres in the database
     * @param genres - the list of genres to add
     * @return list of genres - see {@link Genre}
     */
    List<Genre> addAll( List<Genre> genres);

    /**
     * Method of changing genre in the database
     * @param genre - genre with changes
     * @return modified genre - see {@link Genre}
     * @throws NotFoundEntityException if the genre to be changed is not found in the database
     */
    Genre update(Genre genre) throws NotFoundEntityException;

    /**
     * Delete the genre from the database by id
     * @param id - id genre
     * @throws NotFoundEntityException if genre with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a genre with this id from the database
     * @param id - id genre
     * @return genre with this id
     * @throws NotFoundEntityException if genre with this id does not exist
     */
    Genre getById(Integer id) throws NotFoundEntityException;
}
