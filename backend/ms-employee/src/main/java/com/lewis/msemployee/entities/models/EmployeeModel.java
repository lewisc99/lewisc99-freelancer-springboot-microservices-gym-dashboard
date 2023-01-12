package com.lewis.msemployee.entities.models;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class EmployeeModel {


    @NotNull(message = "username cannot be null")
    @NotEmpty(message = "username cannot be Empty")
    private String username;
    @Min(value = 18, message = "Age must be at least 18")
    private Integer age;
    @NotNull(message = "Document cannot be null")
    private String doc;
    @NotNull(message = "Email cannot be null")
    @Email(message = "Email should be valid")
    @NotEmpty(message = "email cannot be Empty")
    private String email;


    private List<String> roles;

    public EmployeeModel() {
    }

    public EmployeeModel(String username, Integer age, String doc, String email, List<String> roles) {
        this.username = username;
        this.age = age;
        this.doc = doc;
        this.email = email;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getDoc() {
        return doc;
    }

    public void setDoc(String doc) {
        this.doc = doc;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}