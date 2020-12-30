package io.movie.projekt.repositories;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import io.movie.project.domain.Type;
import io.movie.project.repositories.TypeRepository;

import java.util.ArrayList;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TypeRepositoryTest {

    @Autowired
    private TypeRepository typeRepository;

    private List<Type> typeList = new ArrayList<>();

    @Before
    public void init(){
        typeList.add(new Type("Action"));
    }

    @Test
    @Ignore
    public void testForAddingType() {
        for (Type type : typeList) {
            typeRepository.save(type);
        }
    }
}