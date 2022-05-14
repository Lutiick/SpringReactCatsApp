package com.lutiick.springreactcatsapp.service;

import com.lutiick.springreactcatsapp.exceptions.NoIdExistException;
import com.lutiick.springreactcatsapp.model.Cat;
import com.lutiick.springreactcatsapp.repository.CatRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CatService {
    private final CatRepository catRepository;

    public CatService(CatRepository catRepository) {
        this.catRepository = catRepository;
    }

    public List<Cat> getAll() {
        return catRepository.findAll();
    }

    public Cat getOne(long id) throws NoIdExistException {
        return catRepository.findById(id).orElseThrow(() -> new NoIdExistException("No Cat with id: " + id));
    }

    public void save(String description, MultipartFile file) throws IOException {
        byte[] fileBytes = file.getBytes();

        Cat cat = new Cat();
        cat.setDescription(description);
        cat.setImage(fileBytes);
        catRepository.save(cat);
    }

    public void delete(long id) throws NoIdExistException {
        try {
            catRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new NoIdExistException("No Cat with ID: " + id);
        }
    }

    public void edit(String description, MultipartFile image, long id) throws NoIdExistException, IOException {
        Cat oldCat = catRepository.findById(id).orElseThrow(() -> new NoIdExistException("No Cat with ID: " + id));
        byte[] fileBytes = image.getBytes();
        oldCat.setId(id);
        oldCat.setDescription(description);
        oldCat.setImage(fileBytes);
        catRepository.save(oldCat);
    }

}
