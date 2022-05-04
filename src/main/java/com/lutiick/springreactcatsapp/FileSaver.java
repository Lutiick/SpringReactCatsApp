package com.lutiick.springreactcatsapp;

import com.lutiick.springreactcatsapp.model.Cat;
import com.lutiick.springreactcatsapp.repository.CatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class FileSaver implements CommandLineRunner {

    private final CatRepository catRepository;

    @Autowired
    public FileSaver(CatRepository repository) {
        this.catRepository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Optional<Cat> ct = this.catRepository.findAll().stream().filter((Cat cat) -> cat.getImage() != null).findAny();
        if (ct.isPresent()) {
            byte[] bytes = ct.get().getImage();
            try {
                Path path = Paths.get("C:\\Users\\11\\Desktop\\file.jpg");
                Files.write(path, bytes);
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }

        }
    }
}
