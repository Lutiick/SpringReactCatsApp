package com.lutiick.springreactcatsapp.model;


import javax.persistence.*;


@Entity
public class Cat {
    private @Id @GeneratedValue Long id;
    private String description;
    private @Lob byte[] image;

    public Cat() {}

    public Cat(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
