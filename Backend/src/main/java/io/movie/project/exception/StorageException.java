package io.movie.project.exception;


public class StorageException extends BaseException {

    public StorageException(Integer status, String message) {
        super(status, message);
    }

    public StorageException(Integer status, String message, Throwable cause) {
        super(status, message, cause);
    }
}
