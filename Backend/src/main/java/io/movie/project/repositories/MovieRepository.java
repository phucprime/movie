package io.movie.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.movie.project.domain.Movie;

/**
 * Created by  Fang on 2018/4/27.
 */
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Movie findByTitle(String title);
}
