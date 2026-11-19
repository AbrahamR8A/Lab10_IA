package com.pucp.lab10_IA.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// Solo para atender vistas peticiones y devuelve a las vistas
@Controller
public class PeceraController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/p1")
    public String pregunta1(){
        return "p1";
    }

    @GetMapping("/p2")
    public String pregunta2(){
        return "p2";
    }

    @GetMapping("/p3")
    public String pregunta3(){
        return "p3";
    }
}
