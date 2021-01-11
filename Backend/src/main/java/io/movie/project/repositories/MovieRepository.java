package io.movie.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.movie.project.domain.Movie;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    Movie findByTitle(String title);

    @Transactional
    @Modifying
    @Query("update Movie m set " +
            "m.alias = :alias, " +
            "m.cast = :cast, " +
            "m.director = :director, " +
            "m.length = :length, " +
            "m.overview = :overview, " +
            "m.post = :post, " +
            "m.releaseDate = :releaseDate, " +
            "m.score = :score, " +
            "m.screenwriter = :screenwriter " +
            "WHERE m.id = :id")

    void updateMovie(
             @Param("id") Long id,
             @Param("alias") String alias,
             @Param("cast") String cast,
             @Param("director") String director,
             @Param("length") Integer length,
             @Param("overview") String overview,
             @Param("post") String post,
             @Param("releaseDate") String releaseDate,
             @Param("score") Double score,
             @Param("screenwriter") String screenwriter
    );
}
