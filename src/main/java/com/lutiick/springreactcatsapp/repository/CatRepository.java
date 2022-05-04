package com.lutiick.springreactcatsapp.repository;

import com.lutiick.springreactcatsapp.model.Cat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatRepository extends CrudRepository<Cat, Long> {
    @Override
    List<Cat> findAll();

}
