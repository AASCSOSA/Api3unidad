package com.Auto.Tecnm.AutosSpringboot.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.Auto.Tecnm.AutosSpringboot.model.Auto;
import com.Auto.Tecnm.AutosSpringboot.respository.AutoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/Auto")
public class AutoController {
    @Autowired
    AutoRepository autoRepository;

    @GetMapping()
    public ResponseEntity<Iterable<Auto>> findAll() {
        return ResponseEntity.ok(autoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> findById(@PathVariable Long id) {
        Optional<Auto> autoOptional = autoRepository.findById(id);
        if (autoOptional.isPresent()) {
            return ResponseEntity.ok(autoOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Auto newAuto, UriComponentsBuilder ucb) {
        Auto savedAuto = autoRepository.save(newAuto);
        URI uri = ucb
                .path("Auto/{id}")
                .buildAndExpand(savedAuto.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody Auto autoAct) {
        Auto autoAnt = autoRepository.findById(id).get();
        if (autoAnt != null) {
            autoAct.setId(autoAnt.getId());
            autoRepository.save(autoAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (autoRepository.findById(id).get() != null) {
            autoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
