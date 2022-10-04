package com.reto_3_nftc.reto_3_nftc.service;

import com.reto_3_nftc.reto_3_nftc.entity.Bike;
import com.reto_3_nftc.reto_3_nftc.entity.Category;
import com.reto_3_nftc.reto_3_nftc.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id){
        return categoryRepository.getCategory(id);
    }

    public Category save(Category category){
        if(category.getId()==null){
            return categoryRepository.save(category);
        }else {

            Optional<Category> e= categoryRepository.getCategory(category.getId());
            if(e.isPresent()){
                return category;
            }else{
                return categoryRepository.save(category);
            }
        }

    }

    public Category update(Category category){
        if(category.getId()!=null){
            Optional<Category> q = categoryRepository.getCategory(category.getId());
            if(q.isPresent()){
                if(category.getName()!=null){
                    q.get().setName(category.getName());
                }
                if(category.getDescription()!=null){
                    q.get().setDescription(category.getDescription());
                }

                categoryRepository.save(q.get());
                return q.get();

            }else {
                return category;
            }

        }else {
            return category;
        }
    }


    public boolean delete(int id){
        Boolean flag=false;
        Optional<Category> category= categoryRepository.getCategory(id);
        if(category.isPresent()){
            categoryRepository.delete(category.get());
            flag=true;
        }

        return flag;
    }


}
