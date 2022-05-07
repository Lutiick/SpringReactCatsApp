package com.lutiick.springreactcatsapp.repository;

import com.lutiick.springreactcatsapp.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findRoleByName(String name);
}
