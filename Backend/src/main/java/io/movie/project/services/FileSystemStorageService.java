package io.movie.project.services;

import io.movie.project.enums.ResultEnum;
import io.movie.project.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import io.movie.project.exception.StorageException;
import io.movie.project.exception.StorageFileNotFoundException;
import io.movie.project.properties.StorageProperties;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;


@Service
public class FileSystemStorageService implements StorageService {

    private final Path rootLocation;

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new StorageException(-1, "Could not initialize storage", e);
        }
    }

    @Override
    public void store(File file) {
        try {
            if (!file.exists()) {
                throw new StorageException(-1, "Failed to store empty file " + file.getName());
            }
            InputStream inputStream = new FileInputStream(file);
            Files.copy(inputStream, this.rootLocation.resolve(file.getName()));
        } catch (IOException e) {
            throw new StorageException(-1, "Failed to read stored files", e);
        }
    }

    @Override
    public void store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException(-1, "Failed to store empty file " + file.getOriginalFilename());
            }
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new StorageException(-1, "Failed to read stored files", e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new StorageException(-1, "Failed to read stored files", e);
        }
    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException(-1, "Could not read file: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException(-1, "Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void delete(File file){
        try {
            if (!file.exists()) {
                throw new StorageException(-1, "Failed to delete " + file.getName());
            }
            Path path = rootLocation.resolve(file.getName());
            Files.delete(path); // delete file in storage/location
            file.delete(); // delete file in storage/source
        } catch (Exception e) {
            throw new StorageException(-1, file.getName()
                    .replaceFirst("[.][^.]+$", "") +  " no longer existed", e);
        }
    }
}