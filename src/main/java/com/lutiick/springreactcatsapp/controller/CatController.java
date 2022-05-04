package com.lutiick.springreactcatsapp.controller;

import com.lutiick.springreactcatsapp.exceptions.NoIdExistException;
import com.lutiick.springreactcatsapp.model.Cat;
import com.lutiick.springreactcatsapp.service.CatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cats")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @GetMapping
    public List<Cat> getCats() {
        return catService.getAll();
    }

    @GetMapping("/{id}")
    public Cat getOneCat(@PathVariable long id) {
        try {
            return catService.getOne(id);
        } catch (NoIdExistException e) {
            return null;
        }
    }

    @PostMapping("/create")
    public String createCat(@RequestParam String description, @RequestParam MultipartFile image) {
        try {
            catService.save(description, image);
        } catch (IOException e) {
            return e.getMessage();
        }
        return "success";
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCat(@PathVariable long id) {
        try {
            catService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoIdExistException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> editCat(@RequestParam String description,
                                              @RequestParam MultipartFile image,
                                              @PathVariable long id) {
        try {
            catService.edit(description, image, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoIdExistException | IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
