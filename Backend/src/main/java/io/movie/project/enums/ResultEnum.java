package io.movie.project.enums;


public enum ResultEnum {
    SIGN_UP(1, "add user successfully"),
    SIGN_IN(1, "login successfully"),
    GET_MOVIE_INFO_LIST(1, "get movie info list successfully"),
    GET_MOVIE_TYPE_LIST(1, "get movie type list successfully"),
    GET_MOVIE_SRC_LIST(1, "get movie source list successfully"),
    GET_MOVIE_DETAIL(1, "get movie detail successfully"),
    GET_TYPES(1, "get types successfully"),
    UPLOAD_MOVIE_FILE(1, "load movie file successfully"),
    ADD_MOVIE(1, "add movie successfully"),
    DELETE_MOVIE(1, "delete movie successfully"),
    DELETE_MORE_MOVIES(1, "delete more movies successfully"),
    GET_MOVIE_COUNT(1, "get movie count successfully"),
    GET_TYPE_COUNT(1, "get type count successfully"),
    USER_DUPLICATE(-1, "user duplicated"),
    USER_MISSED(-1, "user missed"),
    WRONG_PASSWORD(-1, "wrong password"),
    PERMISSION_DENIED(-1, "permission denied"),
    UNKNOWN_ERROR(-1, "unknown"),
    MOVIE_NOT_FOUND(-1, "movie not found"),
    MOVIE_DUPLICATE(-1, "movie duplicated"),
    MOVIE_UPDATED(1, "update movie successfully"),
    TYPE_UPDATED(1,"update type successfully"),
    TYPE_NOT_FOUND(-1, "type not found")
    ;
    private Integer status;
    private String msg;

    ResultEnum(Integer code, String msg) {
        this.status = code;
        this.msg = msg;
    }

    public Integer getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
