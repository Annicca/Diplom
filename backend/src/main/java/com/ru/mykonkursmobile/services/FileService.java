package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.FileException;
import com.ru.mykonkursmobile.interfaces.IFileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;

@Service
public class FileService implements IFileService{

    @Value("${upload.path}")
    private String uploadPath;

    private  static  String[] imgFormat = new String[]{".jpeg", ".png", ".jpg"};

    public String saveImg(MultipartFile file) throws IOException, FileException {
        if (file.isEmpty()) {
            throw new FileException(HttpStatus.BAD_REQUEST, "Файл пуст, пожалуйста, загрузите другой или повторите попытку");
        }
        try{
            if( !(Arrays.asList(imgFormat).contains(FileService.getFileFormat(file.getOriginalFilename())))){
                throw new FileException(HttpStatus.BAD_REQUEST, "Неверный формат файла, загрузите другой файл");
            }
            File uploadDir = new File(uploadPath);
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }

            String uuidFile = UUID.randomUUID().toString();
            String resultName = uuidFile + "_" + file.getOriginalFilename();
            String pathName = uploadPath + "/" + resultName;
            file.transferTo(new File(pathName));

            return resultName;

        }catch(IOException e){
            System.out.println(e);
            throw new FileException(HttpStatus.BAD_REQUEST, "Произошла ошибка при загрузке файла");
        }
    }

    public static String getFileFormat(String format) {
        int index = format.indexOf('.');
        return index == -1? null : format.substring(index);
    }
}
