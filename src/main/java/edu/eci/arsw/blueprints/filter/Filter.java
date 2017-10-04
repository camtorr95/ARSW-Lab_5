/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.filter;

import edu.eci.arsw.blueprints.model.Blueprint;

/**
 *
 * @author rogera
 */
public interface Filter {

    public void filtradoDeRedundancias(Blueprint bp);
    public void filtradoDeSubmuestreo(Blueprint bp);
}
