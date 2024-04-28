package com.Auto.Tecnm.AutosSpringboot.respository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.Auto.Tecnm.AutosSpringboot.model.Auto;
@Repository
public interface AutoRepository extends CrudRepository<Auto, Long> {

}
