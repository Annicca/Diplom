package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.FileException;
import com.ru.mykonkursmobile.interfaces.IFileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.UUID;

@Service
public class FileService implements IFileService{

    private Path resourcesPath = Paths.get("src", "main", "resources");

    private  static  String[] imgFormat = new String[]{".jpeg", ".png", ".jpg", ".webp"};

    private  static  String[] fileFormat = new String[]{".doc", ".docx", ".ppt", ".pptx", ".pdf"};

    public String saveImg(MultipartFile file) throws IOException, FileException, MaxUploadSizeExceededException {
        if (file.isEmpty()) {
            throw new FileException(HttpStatus.BAD_REQUEST, "Файл пуст, пожалуйста, загрузите другой или повторите попытку");
        }
        try{
            if( !(Arrays.asList(imgFormat).contains(FileService.getFileFormat(file.getOriginalFilename()).toLowerCase()))){
                throw new FileException(HttpStatus.BAD_REQUEST, "Неверный формат файла, загрузите другой файл");
            }
            File uploadDir = new File(resourcesPath.toFile().getAbsoluteFile() + "/img");
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }

            String uuidFile = UUID.randomUUID().toString();
            String resultName = uuidFile + "_" + file.getOriginalFilename();
            String pathName = resourcesPath.toFile().getAbsoluteFile() + "/img/" + resultName;
            file.transferTo(new File(pathName));

            return resultName;

        }catch(IOException e){
            System.out.println(e);
            throw new FileException(HttpStatus.BAD_REQUEST, "Произошла ошибка при загрузке файла");
        }catch(MaxUploadSizeExceededException e){
            System.out.println(e);
            throw new FileException(HttpStatus.BAD_REQUEST, "Превышен максимальный размер файла в 10МБ");
        }

    }

    public String saveFile(MultipartFile file) throws IOException, FileException {
        if (file.isEmpty()) {
            throw new FileException(HttpStatus.BAD_REQUEST, "Файл пуст, пожалуйста, загрузите другой или повторите попытку");
        }
        try{
            if( !(Arrays.asList(fileFormat).contains(FileService.getFileFormat(file.getOriginalFilename())))){
                System.out.println(FileService.getFileFormat(file.getOriginalFilename()));
                throw new FileException(HttpStatus.BAD_REQUEST, "Неверный формат файла, загрузите другой файл");
            }
            File uploadDir = new File(resourcesPath.toFile().getAbsoluteFile() + "/rules");
            if(!uploadDir.exists()){
                uploadDir.mkdir();
            }

            String uuidFile = UUID.randomUUID().toString();
            String resultName = uuidFile + "_" + file.getOriginalFilename();
            String pathName = resourcesPath.toFile().getAbsoluteFile() + "/rules/" + resultName;
            file.transferTo(new File(pathName));

            return resultName;

        }catch(IOException e){
            System.out.println(e);
            throw new FileException(HttpStatus.BAD_REQUEST, "Произошла ошибка при загрузке файла");
        }catch(MaxUploadSizeExceededException e){
            System.out.println(e);
            throw new FileException(HttpStatus.BAD_REQUEST, "Превышен максимальный размер файла в 10МБ");
        }
    }

    public static String getFileFormat(String format) {
        int index = format.lastIndexOf('.');
        return index == -1? null : format.substring(index);
    }
}
