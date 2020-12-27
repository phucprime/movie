package io.movie.project.exception;

/**
 * Created by  Fang on 2018/4/28.
 */
public class StorageFileNotFoundException extends StorageException {
    public StorageFileNotFoundException(Integer status, String message) {
        super(status, message);
    }

    public StorageFileNotFoundException(Integer status, String message, Throwable cause) {
        super(status, message, cause);
    }
}
