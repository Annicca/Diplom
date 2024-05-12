package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.FileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IFileService {

    /**
     * Image saving method
     * @param file - image for save
     * @return name image
     * @throws IOException if an error occurred while saving the image
     * @throws FileException if the file format is not correct or file is empty
     */
    String saveImg(MultipartFile file) throws IOException, FileException;


}
