package io.movie.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.movie.project.domain.Movie;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    Movie findByTitle(String title);
}
