package com.usa.alquilerbicis.servicios;

import com.usa.alquilerbicis.repositorios.RpCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioCategoria {
    @Autowired
    RpCategoria rp;
}
