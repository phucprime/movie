package io.movie.project.domain;

import javax.persistence.*;
import java.util.Set;


@Entity
public class Movie {

    @Id
    @GeneratedValue
    private Long id;


    @Column(unique = true)
    private String title;


    private Double score;


    private String alias;


    @Column(name = "release_date")
    private String releaseDate;


    private Integer length;


    private String director;


    private String screenwriter;


    @Column(columnDefinition = "text")
    private String cast;


    @Column(columnDefinition = "text")
    private String overview;


    private String post;


    @ManyToMany
    @JoinTable(name = "movie_type",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id"))
    private Set<Type> type;


    public Movie() {
    }

    public Movie(String title, Double score, String post) {
        this.title = title;
        this.score = score;
        this.post = post;
    }

    public Movie(String title, Double score, String alias, String releaseDate, Integer length, String director,
                 String screenwriter, String cast, String overview, String post, Set<Type> type) {
        this.title = title;
        this.score = score;
        this.alias = alias;
        this.releaseDate = releaseDate;
        this.length = length;
        this.director = director;
        this.screenwriter = screenwriter;
        this.cast = cast;
        this.overview = overview;
        this.post = post;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getScreenwriter() {
        return screenwriter;
    }

    public void setScreenwriter(String screenwriter) {
        this.screenwriter = screenwriter;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public Set<Type> getType() {
        return type;
    }

    public void setType(Set<Type> type) {
        this.type = type;
    }
}
