/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.filter;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

/**
 *
 * @author rogera
 */
@Service
public class FiltroImplementacion implements Filter {

    @Override
    public void filtradoDeRedundancias(Blueprint bp) {
        ArrayList<Point> puntos = new ArrayList<>();
        for (int i = 0; i < bp.getPoints().size(); ++i) {
            if (puntos.isEmpty()) {
                Point ref = bp.getPoints().get(i);
                puntos.add(new Point(ref.getX(), ref.getY()));
            } else {
                Point ref = bp.getPoints().get(i);
                Point last = puntos.get(puntos.size() - 1);
                if ((ref.getX() != last.getX()) || (ref.getY() != last.getY())) {
                    puntos.add(new Point(ref.getX(), ref.getY()));
                }
            }
        }
        bp.setPoints(puntos);
    }

    @Override
    public void filtradoDeSubmuestreo(Blueprint bp) {
        ArrayList<Point> puntos = new ArrayList<>();
        for (int i = 0; i < bp.getPoints().size(); ++i) {
            if (i % 2 == 0) {
                Point ref = bp.getPoints().get(i);
                puntos.add(new Point(ref.getX(), ref.getY()));
            }
        }
        bp.setPoints(puntos);
    }

}
