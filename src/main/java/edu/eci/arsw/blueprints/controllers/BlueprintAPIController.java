/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {

    @Autowired
    BlueprintsServices bps = null;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetAllBlueprints() {
        //obtener datos que se enviarán a través del API
        return new ResponseEntity<>(bps.getAllBlueprints(), HttpStatus.ACCEPTED);
    }

    @RequestMapping(path = "/{author}", method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetBlueprintsByAuthor(@PathVariable String author) {
        try {
            Set<Blueprint> respuesta = bps.getBlueprintsByAuthor(author);
            if (respuesta.isEmpty()) {
                return new ResponseEntity<>("Error: No hay blueprints del autor especificado", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(respuesta, HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{author}/{name}", method = RequestMethod.GET)
    public ResponseEntity<?> manejadorGetBlueprint(@PathVariable String author, @PathVariable String name) {
        try {
            return new ResponseEntity<>(bps.getBlueprint(author, name), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> manejadorAgregarBlueprint(@RequestBody Blueprint bp) {
        try {
            bps.addNewBlueprint(bp);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(path = "/{author}/{name}", method = RequestMethod.PUT)
    public ResponseEntity<?> manejadorActualizarBlueprint(@PathVariable String author, @PathVariable String name, @RequestBody Blueprint bp) {
        bps.deleteBlueprint(author, name);
        try {
            bps.addNewBlueprint(bp);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(path = "/{author}/{name}", method = RequestMethod.DELETE)
    public ResponseEntity<?> manejadorDeleteBlueprint(@PathVariable String author, @PathVariable String name) {
        bps.deleteBlueprint(author, name);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
