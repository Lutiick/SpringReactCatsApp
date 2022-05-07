package com.lutiick.springreactcatsapp.repository;

import com.lutiick.springreactcatsapp.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findUserByUsername(String username);
    List<User> findAll();
}
