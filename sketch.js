// p5.js dibuja el espacio del juego y permite tocar sus objetos.
let particulasRaras = [];
let posicionJugadorNivel6 = { x: 250, y: 0 };
let objetivoJugadorNivel6 = { x: 250, y: 0 };
let posicionJugadorNivel7 = { x: 250, y: 0 };
let objetivoJugadorNivel7 = { x: 250, y: 0 };
let nivel7UltimoMovimientoMouse = Date.now();
let nivel7UltimaActualizacionMovimiento = Date.now();
let nivel7MovimientosMouse = 0;
let nivel7GiroAutonomoRegistrado = false;
let nivel7TiempoMouseQuietoMs = 0;

// Datos de marcas y objetos: sus posiciones se dibujan en la habitación.
const manchasHabitacion = [
    { x: 153, y: 88, ancho: 38, alto: 13, giro: -0.18 },
    { x: 391, y: 57, ancho: 30, alto: 10, giro: 0.12 }
];

const papelesHabitacion = [
    { x: 119, y: 214, giro: -0.16, escala: 1 },
    { x: 403, y: 220, giro: 0.10, escala: 0.78 }
];

function setup() {
    const canvas = createCanvas(500, 240);
    canvas.parent("canvas-container");
}

function draw() {
    actualizarAmbienteInterfaz();
    actualizarMovimientoJugadorNivel6();
    actualizarMovimientoJugadorNivel7();
    actualizarSistemaNivel10();

    const esComputadora = estadoActual === "computadora";
    const esNivel2 = estadoActual === "nivel2";
    const esNivel3 = estadoActual === "nivel3";
    const esNivel4 = estadoActual === "nivel4";
    const esNivel5 = estadoActual === "nivel5";
    const esNivel6 = estadoActual === "nivel6";
    const esNivel7 = estadoActual === "nivel7";
    const esNivel8 = estadoActual === "nivel8";
    const esNivel9 = estadoActual === "nivel9";
    const esNivel10 = estadoActual === "nivel10";
    const puertaAbierta = estadoActual === "puertaAbierta" || esNivel2;
    const puertaDesaparecida = esNivel3 && respuestaNivel3 === "si";
    const puertaSeAbreEnEntrada = esNivel3 && Date.now() - tiempoEntradaNivel3 < 950;
    const tiempoReaccion = Date.now() - tiempoRespuestaNivel4;
    const brazoAusente = esNivel4 && reaccionNivel4 === "sacrificio" && tiempoReaccion < 2900 && Math.floor(tiempoReaccion / 230) % 2 === 0;
    const puertaGolpeaNivel4 = esNivel4 && reaccionNivel4 === "rechazo" && !reaccionNivel4Finalizada &&
        [0.18, 0.82, 1.04, 2.1, 2.36, 3.52].some(function (marca) { return Math.abs(tiempoReaccion / 1000 - marca) < 0.09; });
    const puertaRechazo = estadoActual === "puerta";
    const nivelTerror = obtenerNivelTerror();
    const hayInterferencia = nivelInterferencia > 0 || comportamiento.demoras > 0 ||
        comportamiento.presiones > 0 || comportamiento.cambiosRespuesta > 0 ||
        comportamiento.intentosSalida > 0 || comportamiento.clicsVacios > 0 ||
        comportamiento.respuestasRapidas > 0 || comportamiento.mensajesIgnorados > 0;
    const pulso = (sin(frameCount * 0.06) + 1) / 2;
    const sombraVisible = (sin(frameCount * 0.025) + 1) / 2;

    background(12, 8, 17);
    noStroke();

    // Fondo de la habitación con profundidad. La ruta de desconfianza la hace respirar.
    if (esNivel6) {
        dibujarHabitacionNivel6();
        dibujarInsectosNivel6();
        dibujarGrietasNivel6();
    } else if (esNivel7) {
        dibujarHabitacionNivel7();
        dibujarInsectosNivel7();
    } else if (esNivel8) {
        dibujarPasilloNivel8();
    } else if (esNivel9) {
        dibujarSalaEsperaNivel9(pulso);
    } else if (esNivel10) {
        dibujarSalaFinalNivel10(pulso);
    } else if (esNivel4 && respuestaNivel3 === "no") {
        const intensidadRespiracion = ambienteNivel4Alterado ? 0.006 : 0.0015;
        const intensidadTorcedura = ambienteNivel4Alterado ? 0.003 : 0.0008;
        const respiracion = sin(frameCount * 0.024) * intensidadRespiracion;
        const torcedura = sin(frameCount * 0.017) * intensidadTorcedura;
        push();
        translate(width / 2, height / 2);
        rotate(torcedura);
        scale(1 + respiracion);
        translate(-width / 2, -height / 2);
        dibujarHabitacion();
        dibujarDetallesAbandono();
        pop();
    } else {
        dibujarHabitacion();
        dibujarDetallesAbandono();
    }

    if (esNivel4 && respuestaNivel3 === "si") {
        dibujarObjetosDesplazadosNivel4();
        dibujarInsectosNivel4();
    }
    if (esNivel5) dibujarHabitacionNivel5();

    if (esNivel3 && (respuestaNivel2 === "no" || respuestaNivel3 === "no")) {
        noStroke();
        fill(0, 0, 5, respuestaNivel3 === "no" ? 122 : 96);
        rect(0, 0, width, height);
    }

    if (esNivel3 && respuestaNivel2 === "si") dibujarDobleEnEspejo();

    // Al cruzar la puerta, el mismo cuarto se ve desde una perspectiva distinta.
    // La respuesta de la computadora determina si esa versión está alterada.
    if (puertaAbierta) dibujarHabitacionDelOtroLado();

    // Una sombra aparece después de investigar la computadora.
    if (!esNivel2 && !esNivel3 && !esNivel5 && hayInterferencia && sombraVisible > 0.23) {
        dibujarEntidadSombra(sombraVisible);
    }

    if (!esNivel9 && !esNivel10) dibujarComputadora(esComputadora, pulso);
    if (puertaDesaparecida) dibujarMarcaPuertaDesaparecida();
    else if (esNivel6) dibujarPuertaNivel6();
    else if (esNivel7) dibujarPuertaNivel7();
    else if (esNivel8) dibujarPuertasNivel8();
    else if (esNivel9) dibujarPuertaSalaEsperaNivel9(pulso);
    else if (esNivel10 && !nivel10EscenaSinPuerta()) dibujarPuertaFinalNivel10(pulso);
    else dibujarPuerta(puertaAbierta || puertaSeAbreEnEntrada || puertaGolpeaNivel4, puertaRechazo, pulso);
    if (esNivel4) {
        dibujarInscripcionPuertaNivel4();
        dibujarMarcasUñasNivel4();
    }
    if (puertaAbierta) {
        const ocultarDoble = esNivel2 && (reaccionNivel2 === "revelado" || reaccionNivel2 === "oculto");
        if (!ocultarDoble) {
            const figuraAlterada = respuestaActual === "si";
            dibujarPersonaje(false, figuraAlterada || hayInterferencia, {
                x: 248, escala: 0.88, quieto: respuestaActual === "no",
                alterado: figuraAlterada, desfase: figuraAlterada ? 8 : 0
            });
        }
        dibujarPersonaje(false, hayInterferencia, {
            x: 348, escala: 0.78, recienEntrado: true
        });
    } else if (esNivel3) {
        dibujarPersonaje(false, respuestaNivel2 === "si", { x: 348, escala: 0.78 });
    } else if (esNivel4) {
        dibujarPersonaje(false, true, { x: 250, brazoAusente: brazoAusente });
    } else if (esNivel5) {
        dibujarSombraNivel5();
        dibujarPersonaje(false, false, { x: 250 });
    } else if (esNivel6) {
        dibujarFiguraObservadoraNivel6();
        dibujarPersonaje(false, nivel6Fase === "control-no", {
            x: posicionJugadorNivel6.x,
            yOffset: posicionJugadorNivel6.y,
            quieto: nivel6Fase === "control-no" || nivel6Fase === "control-si" || nivel6Fase === "final",
            giro: nivel6Fase === "control-no" ? 0 : nivel6Fase === "cierre" || nivel6Fase === "final" ? -0.16 : Date.now() - nivel6UltimoMovimiento > 2800 ? 0.18 : 0
        });
    } else if (esNivel7) {
        dibujarFiguraNivel7();
        if (nivel7SombraPuerta) dibujarSombraPuertaNivel7();
        if (nivel7FiguraDetras) dibujarSiluetaNivel6(posicionJugadorNivel7.x + 15, 164 + posicionJugadorNivel7.y, 0.62);
        dibujarPersonaje(false, false, {
            x: posicionJugadorNivel7.x,
            yOffset: posicionJugadorNivel7.y,
            quieto: nivel7Fase === "final",
            giro: nivel7Fase === "final" ? 0.2 : sin(frameCount * 0.019) * 0.025
        });
    } else if (esNivel8) {
        if (nivel8FiguraPuerta) dibujarSiluetaNivel6(268, 141, 0.78, true);
        dibujarFiguraPasilloNivel8();
        dibujarPersonaje(false, nivel8Fase === "anomalia", {
            x: 250, escala: nivel8Fase === "final" ? 0.84 : 0.66,
            yOffset: nivel8Fase === "final" ? 0 : 7,
            quieto: true, giro: nivel8Fase === "final" ? -0.08 : 0.18
        });
    } else if (esNivel9) {
        dibujarPersonaje(false, false, { x: 250, escala: 0.64, quieto: true, giro: -0.08 });
    } else if (esNivel10) {
        const mirando = nivel10MiradaPersonaje === "atras" ? -0.13 : nivel10MiradaPersonaje === "jugador" ? 0.08 : nivel10MiradaPersonaje === "pantalla" ? 0.11 : 0;
        const pasoAutonomo = nivel10MovimientoAutonomoHasta > Date.now() ? nivel10PasoAutonomoX : 0;
        dibujarPersonaje(false, false, { x: 250 + pasoAutonomo, escala: 0.66, quieto: true, giro: mirando });
    } else {
        dibujarPersonaje(esComputadora, hayInterferencia);
    }

    if (esNivel10) dibujarEfectosNarrativosNivel10();

    if (esNivel4 && reaccionNivel4 === "sacrificio" && tiempoReaccion < 2550 && tiempoReaccion >= 250) {
        dibujarManoDesdePuertaNivel4(constrain((tiempoReaccion - 250) / 2050, 0, 1));
    }

    if (esNivel3) {
        dibujarNotaNivel3();
        if (sombraPuertaVisible) dibujarSombraBajoPuerta();
    }

    // Una doble imagen pequeña marca la primera interferencia sin tapar la escena.
    if (hayInterferencia && !esComputadora) {
        noFill();
        stroke(194, 94, 221, 65);
        rect(369, 78, 75, 105);
        noStroke();
    }

    // La computadora ilumina su zona; una viñeta oscurece los bordes.
    dibujarIluminacion(esComputadora, pulso);
    dibujarCierreHabitacion(nivelTerror);
    if (esNivel4 && respuestaNivel3 === "si") dibujarSombrasProfundasNivel4();
    if (esNivel4 && respuestaNivel3 === "no" && ambienteNivel4Alterado) dibujarFallaLuzNivel4();
    if (esNivel6) dibujarEfectosInterfazNivel6();
    if (esNivel7) dibujarEfectosInterfazNivel7();
    if (esNivel8) dibujarEfectosNivel8();
    if (esNivel9) dibujarLuzSalaEsperaNivel9(pulso);
    if (esNivel10) dibujarLuzPerfilNivel10();
    if (esNivel10) dibujarTransicionNivel10();

    dibujarIndicaciones();
    dibujarParticulasRaras(nivelTerror);
    dibujarInterferenciaCanvas(pulso);
    dibujarApagonRapido();
    dibujarTextoEstado(pulso);
    dibujarReaccionNivel2();
    if (esNivel4) dibujarReaccionNivel4(tiempoReaccion);
    if (esNivel5) dibujarEfectosNivel5();
}

// Primera etapa del nivel 9: sala de espera y transición desde el pasillo.
function dibujarSalaEsperaNivel9(pulso) {
    const temblor = Date.now() - nivel9InicioTransicion < 1500 ? sin(frameCount * 1.7) * 2 : 0;
    push(); translate(temblor, 0); background(13, 11, 15); noStroke();
    // Paredes convergentes y suelo para crear profundidad dentro del canvas 2D.
    fill(43, 35, 38); quad(0, 0, 500, 0, 397, 151, 96, 151);
    fill(29, 24, 29); quad(0, 0, 96, 151, 96, 202, 0, 240);
    fill(33, 27, 31); quad(500, 0, 397, 151, 397, 202, 500, 240);
    fill(25, 21, 24); quad(96, 151, 397, 151, 500, 240, 0, 240);
    stroke(83, 68, 67, 100); strokeWeight(1);
    line(0, 80, 96, 151); line(500, 76, 397, 151); line(0, 28, 96, 123); line(500, 25, 397, 123);
    line(0, 205, 96, 175); line(500, 206, 397, 175); noStroke();
    // Única salida, cerrada al fondo.
    fill(18, 16, 19); rect(218, 58, 65, 94); fill(48, 38, 40); rect(223, 63, 55, 89);
    fill(26, 22, 25); rect(229, 69, 43, 83); fill(126, 103, 76); ellipse(264, 110, 3, 3);
    // Archivador con cajones a la izquierda.
    fill(44, 40, 39); rect(19, 82, 60, 97, 2); fill(65, 57, 53);
    rect(24, 88, 50, 26); rect(24, 119, 50, 25); rect(24, 149, 50, 24);
    stroke(105, 92, 82); line(30, 111, 67, 111); line(30, 141, 67, 141); line(30, 170, 67, 170); noStroke();
    fill(122, 108, 91); rect(44, 101, 11, 2); rect(44, 131, 11, 2); rect(44, 160, 11, 2);
    // Escritorio, computadora apagada y lámpara de luz localizada.
    fill(67, 48, 40); quad(145, 142, 344, 142, 370, 177, 124, 177);
    fill(43, 34, 31); quad(153, 176, 343, 176, 338, 214, 158, 214);
    fill(83, 61, 48); quad(162, 139, 333, 139, 347, 148, 148, 148);
    fill(20, 18, 22); rect(223, 104, 47, 36, 3);
    const pantallaEncendida = nivel9Fase.startsWith("pregunta-") || nivel9Fase === "busqueda" || nivel9Fase === "deterioro" || nivel9Fase === "pregunta-promesa-pendiente" || nivel9Fase === "final";
    fill(pantallaEncendida ? color(91, 130, 112) : color(38, 44, 45)); rect(227, 108, 39, 27, 1);
    if (pantallaEncendida) {
        fill(8, 17, 13); textAlign(CENTER, CENTER); textSize(4.2);
        text(nivel9Fase === "final" ? "SALIDA\nDISPONIBLE" : nivel9Fase.startsWith("pregunta-") ? "TE ESTOY\nESPERANDO" : "ARCHIVO\nINCOMPLETO", 246.5, 121.5);
    }
    fill(32, 30, 33); rect(243, 140, 8, 6); rect(235, 145, 24, 3);
    fill(66, 56, 49); rect(304, 112, 5, 28); quad(306, 112, 327, 106, 332, 109, 309, 118);
    dibujarSillaEsperaNivel9(103, 154, 0.72, -0.18); dibujarSillaEsperaNivel9(374, 165, 0.92, 0.26);
    if (nivel9FiguraSentada) dibujarSiluetaNivel6(377, 174, 0.38, true);
    // Hojas olvidadas en escritorio y suelo.
    push(); translate(181, 151); rotate(-0.13); fill(174, 163, 143); rect(0, 0, 25, 15); stroke(92, 82, 75); line(4, 5, 20, 5); line(4, 9, 16, 9); noStroke(); pop();
    push(); translate(89, 213); rotate(0.18); fill(137, 127, 113, 205); rect(0, 0, 26, 15); stroke(75, 68, 66); line(4, 5, 21, 5); noStroke(); pop();
    push(); translate(410, 225); rotate(-0.22); fill(116, 108, 102, 175); rect(0, 0, 30, 13); pop();
    // Humedad, números tachados y una advertencia manuscrita.
    noStroke(); fill(19, 17, 21, 95); ellipse(132, 49, 38, 11); ellipse(365, 35, 52, 13);
    fill(105, 76, 74, 125); textSize(8); textAlign(LEFT); text("04̶ ̶", 114, 79); text("NO ME DEJÓ ELEGIR", 310, 52);
    stroke(111, 83, 78, 100); line(323, 59, 379, 57); line(336, 62, 363, 58); noStroke(); pop();
}

// Escenario inicial del nivel 10. Los puestos son deliberadamente neutros;
// sus funciones y distribución se incorporan en los siguientes apartados.
function dibujarSalaFinalNivel10(pulso) {
    if (nivel10Fase === "final-bueno") return dibujarEscenaSalidaNivel10(pulso);
    if (nivel10Fase === "final-malo") return dibujarEscenaFracasoNivel10();
    if (nivel10Fase === "final-meh") return dibujarCuartoNormalNivel10(frameCount % 127 < 4);
    if (nivel10Fase === "terminal" && nivel10ComputadoraActual === 3 && nivel10TerminalSubfase === "normalidad") {
        return dibujarCuartoNormalNivel10(nivel10SubfaseNormalidad === "apagón");
    }
    if (nivel10Fase === "terminal" && nivel10ComputadoraActual === 5 && nivel10TerminalSubfase === "reinicio-escena") {
        return dibujarHabitacionReiniciadaNivel10();
    }
    const confiado = nivel10Perfil === "confiado";
    const desconfiado = nivel10Perfil === "desconfiado";
    const torcedura = desconfiado ? sin(frameCount * 0.017) * 5 : 0;
    background(14, 13, 17); noStroke();
    fill(confiado ? color(58, 49, 44) : desconfiado ? color(34, 27, 38) : color(48, 43, 49));
    quad(0, 0, 500, 0, 430 + torcedura, 155, 70 - torcedura * 0.4, 155);
    fill(confiado ? color(43, 36, 34) : desconfiado ? color(24, 19, 29) : color(35, 31, 38));
    quad(0, 0, 70 - torcedura * 0.4, 155, 70, 205, 0, 240);
    fill(confiado ? color(42, 35, 33) : desconfiado ? color(22, 18, 27) : color(32, 28, 36));
    quad(500, 0, 430 + torcedura, 155, 430, 205, 500, 240);
    fill(confiado ? color(52, 44, 40) : desconfiado ? color(29, 23, 31) : color(43, 38, 43));
    quad(70 - torcedura * 0.4, 155, 430 + torcedura, 155, 500, 240, 0, 240);
    // Zócalos, uniones y desgaste leve: el cuarto aún conserva cierta normalidad.
    stroke(112, 103, 106, 95); strokeWeight(1); line(0, 55, 70, 155); line(500, 54, 430, 155);
    line(70, 155, 430, 155); line(0, 210, 500, 210); noStroke();
    fill(20, 18, 23); rect(224, 46, 54, 109); fill(54, 45, 56); rect(230, 51, 42, 104);
    fill(25, 21, 29); rect(235, 57, 32, 98); fill(153, 123, 166); ellipse(260, 107, 3, 3);
    // Cinco escritorios de distintas formas y alturas, repartidos por la habitación.
    const equipos = nivel10Distribucion || [
        { computadora: 1, x: 28, y: 124, escala: 0.82 }, { computadora: 2, x: 125, y: 91, escala: 0.72 },
        { computadora: 3, x: 281, y: 111, escala: 0.86 }, { computadora: 4, x: 151, y: 166, escala: 0.94 },
        { computadora: 5, x: 369, y: 162, escala: 0.90 }
    ];
    const mueblesSeMueven = nivel10EventoEscena === "muebles" && nivel10EventoEscenaHasta > Date.now();
    equipos.forEach(function (equipo) {
        const corrimiento = mueblesSeMueven ? (equipo.computadora % 2 ? 2.5 : -2.5) : 0;
        dibujarEscritorioFinalNivel10(corrimiento ? Object.assign({}, equipo, { x: equipo.x + corrimiento }) : equipo);
    });
    // Sillas desparejas y un mueble familiar fuera de sitio.
    const sillaGiro = nivel10EventoEscena === "silla" && nivel10EventoEscenaHasta > Date.now() ? -0.42 : 0.12;
    dibujarSillaEsperaNivel9(112, 170, 0.65, sillaGiro);
    dibujarSillaEsperaNivel9(319, 182, 0.7, -0.1);
    fill(27, 24, 29); rect(7, 89, 22, 42, 2); rect(5, 125, 27, 7, 2);
    // Grietas y manchas pequeñas, sin convertir el escenario en una ruina total.
    stroke(14, 10, 17, desconfiado ? 210 : 125); strokeWeight(1.4); line(84, 39, 92, 47); line(92, 47, 87, 55); line(405, 33, 398, 41); line(398, 41, 405, 50); noStroke();
    fill(12, 10, 15, desconfiado ? 120 : 65); ellipse(114, 43, 37, 9); ellipse(389, 127, 28, 8);
    if (nivel10Fase === "exploracion") dibujarPistasNivel10();
}

function nivel10EscenaSinPuerta() {
    return nivel10Fase.indexOf("final-") === 0 ||
        (nivel10Fase === "terminal" && nivel10ComputadoraActual === 3 && nivel10TerminalSubfase === "normalidad") ||
        (nivel10Fase === "terminal" && nivel10ComputadoraActual === 5 && nivel10TerminalSubfase === "reinicio-escena");
}

function dibujarPistasNivel10() {
    // Las tres notas recuperan el aviso del pasillo y los papeles del nivel 9.
    noStroke(); fill(154, 143, 127, 170); rect(75, 31, 68, 26); rect(357, 31, 72, 27); rect(184, 201, 84, 20);
    stroke(77, 70, 66, 130); strokeWeight(0.7);
    line(81, 38, 135, 38); line(81, 43, 128, 43); line(363, 38, 422, 38); line(363, 43, 418, 43);
    line(190, 206, 261, 206); line(190, 211, 253, 211); noStroke();
    if (pistaNivel10BajoCursor(mouseX, mouseY)) {
        const n = pistaNivel10BajoCursor(mouseX, mouseY);
        noFill(); stroke(215, 192, 222, 175); strokeWeight(1); rect(n === 1 ? 73 : n === 2 ? 355 : 182, n === 3 ? 199 : 29, n === 3 ? 88 : 76, n === 3 ? 24 : 31); noStroke();
    }
}

function dibujarCuartoNormalNivel10(deteriorado) {
    background(deteriorado ? color(6, 6, 8) : color(37, 39, 37)); noStroke();
    fill(deteriorado ? color(25, 20, 27) : color(104, 105, 89)); quad(0, 0, 500, 0, 430, 156, 70, 156);
    fill(deteriorado ? color(18, 15, 22) : color(76, 75, 67)); quad(70, 156, 430, 156, 500, 240, 0, 240);
    fill(deteriorado ? color(21, 17, 27) : color(56, 60, 53)); rect(360, 35, 85, 77);
    fill(deteriorado ? color(4, 4, 8) : color(120, 142, 130)); rect(366, 41, 73, 65);
    fill(deteriorado ? color(57, 38, 62) : color(116, 105, 83)); rect(91, 126, 157, 15); rect(105, 141, 130, 42);
    dibujarSillaEsperaNivel9(277, 181, 0.95, 0.03);
    if (deteriorado) {
        stroke(13, 8, 18, 220); strokeWeight(2); line(112, 41, 123, 53); line(123, 53, 116, 65); line(407, 125, 388, 143); noStroke();
        fill(2, 2, 4, 95); ellipse(307, 158, 56, 17); dibujarSiluetaNivel6(414, 177, 0.48, true);
        for (let i = 0; i < 4; i++) { fill(2, 1, 4, 225); ellipse(82 + i * 71, 218 - (i % 2) * 10, 4, 2); }
    } else {
        fill(202, 187, 155, 55); rect(0, 0, width, height);
    }
}

function dibujarHabitacionReiniciadaNivel10() {
    background(7, 6, 10); noStroke(); fill(41, 36, 45); quad(0, 0, 500, 0, 435, 158, 65, 158);
    fill(27, 23, 31); quad(65, 158, 435, 158, 500, 240, 0, 240);
    fill(65, 50, 64); rect(350, 68, 57, 89); fill(15, 13, 19); rect(70, 99, 58, 44);
    fill(86, 72, 91); rect(51, 146, 91, 30); fill(13, 12, 16); rect(164, 126, 67, 45);
    fill(67, 56, 67); rect(316, 155, 82, 15); rect(334, 170, 50, 34);
    stroke(5, 3, 8, 180); line(89, 38, 98, 50); line(98, 50, 91, 63); noStroke();
    fill(183, 151, 196, 180); textAlign(CENTER); textSize(8); text("YA ESTUVISTE ACÁ", 250, 222);
}

function dibujarEscenaSalidaNivel10(pulso) {
    background(24, 31, 31); noStroke(); fill(66, 79, 72); rect(0, 0, width, 145);
    fill(46, 55, 52); quad(0, 145, 500, 145, 500, 240, 0, 240);
    fill(154, 147, 120, 60 + pulso * 18); ellipse(245, 124, 340, 160);
    fill(15, 19, 22); rect(46, 51, 88, 81); fill(99, 121, 112); rect(52, 57, 76, 69);
    fill(74, 79, 66); rect(374, 145, 21, 39); rect(399, 136, 22, 48); fill(12, 14, 18, 190); ellipse(430, 166, 32, 8);
    fill(180, 165, 137, 150); rect(285, 160, 24, 4); rect(285, 165, 24, 4);
    if (nivel10Perfil === "desconfiado" && frameCount % 95 < 5) { fill(0, 0, 0, 110); rect(0, 0, width, height); }
    if (nivel10Perfil === "indeciso" && frameCount % 126 < 4) { fill(0, 0, 0, 150); rect(0, 0, width, height); }
}

function dibujarEscenaFracasoNivel10() {
    background(1, 1, 3); noStroke(); fill(5, 4, 8); quad(0, 0, 500, 0, 432, 158, 68, 158);
    fill(3, 2, 5); quad(68, 158, 432, 158, 500, 240, 0, 240);
    if (frameCount % 42 < 2) { fill(18, 8, 23, 80); rect(0, 128, width, 3); }
}

function dibujarEscritorioFinalNivel10(equipo) {
    const x = equipo.x, y = equipo.y, escala = equipo.escala;
    push(); translate(x, y); scale(escala); noStroke();
    fill(20, 18, 24, 125); ellipse(28, 42, 77, 11);
    fill(53, 43, 49); quad(0, 12, 53, 12, 62, 25, -5, 25);
    fill(37, 30, 37); quad(3, 25, 54, 25, 50, 52, 8, 52);
    fill(13, 12, 17); rect(14, -19, 29, 27, 2);
    const desconfianza = nivel10Perfil === "desconfiado";
    const pantallaSugerida = nivel10PantallaDespierta === equipo.computadora && Date.now() < nivel10PantallaDespiertaHasta;
    const brillo = pantallaSugerida ? 0.72 : nivel10Perfil === "confiado" ? 0.48 : nivel10Perfil === "indeciso" ? 0.34 + sin(frameCount * 0.04 + equipo.computadora) * 0.08 : 0.26;
    fill(68 + brillo * 30, 83 + brillo * 35, 77 + brillo * 24); rect(17, -16, 23, 19, 1);
    if (pantallaSugerida) { noStroke(); fill(124, 160, 137, 24); ellipse(28, -6, 46, 31); }
    stroke(12, 10, 15, 145); strokeWeight(0.65); line(19, -12, 37, -12); line(19, -8, 32, -8); noStroke();
    if (equipo.parcialmenteOculta && desconfianza) { fill(8, 6, 12, 135); rect(15, -18, 28, 11); }
    if (estadoActual === "nivel10" && nivel10Fase === "terminal" && nivel10ComputadoraActual === equipo.computadora) {
        noFill(); stroke(177, 143, 191, 220); strokeWeight(1.2); rect(13, -20, 31, 29); noStroke();
    }
    fill(23, 21, 27); rect(25, 8, 7, 5); rect(21, 12, 15, 2);
    fill(28, 24, 29); rect(9, 51, 3, 12); rect(47, 51, 3, 12);
    pop();
}

function dibujarPuertaFinalNivel10(pulso) {
    noStroke(); fill(0, 0, 0, 125); rect(222, 44, 58, 112);
    fill(48, 33, 58); rect(226, 48, 50, 107);
    noFill(); stroke(135, 85, 150, 140 + pulso * 20); strokeWeight(1.7); rect(226, 48, 50, 107);
    noStroke(); fill(172, 137, 188); ellipse(263, 104, 3, 3);
}

function dibujarTransicionNivel10() {
    if (nivel10Fase !== "transicion" && nivel10Fase !== "encendido") return;
    const tiempo = Date.now() - nivel10InicioTransicion;
    const desdeLuz = Math.max(0, tiempo - 1550);
    const opacidad = tiempo < 1550 ? 255 : 255 * (1 - constrain(desdeLuz / 2200, 0, 1));
    noStroke(); fill(1, 1, 4, opacidad); rect(0, 0, width, height);
    if (tiempo > 1550 && frameCount % 13 < 2) {
        fill(196, 168, 205, 46); rect(0, random(height), width, random(1, 3));
    }
}

function dibujarEfectosNarrativosNivel10() {
    const evento = nivel10EventoEscena;
    const tiempoEvento = nivel10EventoEscenaHasta - Date.now();
    if (evento === "recuerdo" && tiempoEvento > 0) {
        // Un fotograma breve de la habitación inicial, como si hubiese quedado atrapado en la pantalla.
        noStroke(); fill(4, 5, 8, 235); rect(345, 35, 105, 69);
        fill(54, 48, 59); quad(351, 41, 444, 41, 431, 79, 363, 79);
        fill(35, 31, 38); quad(363, 79, 431, 79, 444, 98, 351, 98);
        fill(13, 11, 17); rect(393, 57, 13, 23); fill(174, 144, 188, 120); rect(347, 36, 101, 2);
    } else if (evento === "sombra" && tiempoEvento > 0) {
        const progreso = 1 - tiempoEvento / 3300;
        dibujarSiluetaNivel6(320 + progreso * 150, 178, 0.48, true);
    } else if (evento === "insectos" && tiempoEvento > 0) {
        noStroke(); fill(3, 2, 5, 235);
        for (let i = 0; i < 8; i++) {
            const x = 71 + (i * 53 + frameCount * (i % 2 ? 0.27 : -0.16)) % 360;
            const y = 42 + (i * 19) % 145;
            ellipse(x, y, i % 3 === 0 ? 4 : 2.5, 2);
            stroke(3, 2, 5, 210); line(x - 3, y - 2, x - 5, y - 4); line(x + 3, y + 1, x + 5, y + 3); noStroke();
        }
    } else if (evento === "muebles" && tiempoEvento > 0) {
        noStroke(); fill(215, 194, 222, 34); rect(0, 0, width, height);
        if (frameCount % 90 < 3) { stroke(17, 12, 21, 210); strokeWeight(2); line(78, 39, 96, 52); line(96, 52, 87, 67); noStroke(); }
    } else if (evento === "parpadeo" && tiempoEvento > 0 && (frameCount % 17 < 4 || frameCount % 29 < 2)) {
        noStroke(); fill(0, 0, 2, 185); rect(0, 0, width, height);
        if (frameCount % 29 < 2) {
            stroke(17, 12, 21, 210); strokeWeight(2); line(78, 39, 96, 52); line(96, 52, 87, 67); line(404, 95, 421, 108); noStroke();
            fill(4, 3, 6, 165); ellipse(137, 88, 45, 12); ellipse(374, 131, 57, 18);
            for (let i = 0; i < 4; i++) { fill(2, 1, 4, 235); ellipse(112 + i * 77, 213 - (i % 2) * 8, 4, 2); }
        }
    }
    if (nivel10Fase === "exploracion" && (nivel10MiradaPersonaje !== "frente" || nivel10MovimientoAutonomoHasta > Date.now())) {
        noStroke(); fill(0, 0, 0, 95); ellipse(258, 128, 25, 6);
    }
    if (nivel10Fase === "final-bueno") {
        noStroke(); fill(2, 3, 5, 130); ellipse(426, 184, 36, 8);
        if (nivel10Perfil === "desconfiado" || frameCount % 133 < 3) dibujarSiluetaNivel6(430, 182, 0.34, true);
    } else if (nivel10Fase === "final-meh" && frameCount % 117 < 3) {
        dibujarSiluetaNivel6(416, 180, 0.42, true);
    }
}

function dibujarLuzPerfilNivel10() {
    if (nivel10Perfil === "confiado") {
        drawingContext.save(); drawingContext.globalCompositeOperation = "screen";
        for (let i = 7; i > 0; i--) { noStroke(); fill(195, 154, 111, 2.5); ellipse(252, 105, i * 52, i * 26); }
        drawingContext.restore();
    } else if (nivel10Perfil === "desconfiado") {
        noStroke(); fill(0, 0, 7, 48); rect(0, 0, width, height);
        if (frameCount % 83 < 3) { fill(0, 0, 0, 95); rect(0, 0, width, height); }
        if (frameCount % 41 < 2) { fill(208, 170, 215, 48); rect(0, 52 + frameCount % 100, width, 2); }
    } else if (frameCount % 137 < 4) {
        noStroke(); fill(0, 0, 2, 70); rect(0, 0, width, height);
    }
}

function dibujarSillaEsperaNivel9(x, y, escala, giro) {
    push(); translate(x, y); rotate(giro); scale(escala); noStroke();
    fill(19, 17, 20, 110); ellipse(9, 35, 45, 10); fill(47, 39, 38); rect(-12, -16, 28, 27, 3);
    fill(61, 49, 45); rect(-14, -34, 31, 19, 3); fill(35, 30, 30);
    rect(-12, 9, 3, 25); rect(12, 9, 3, 25); rect(-16, -17, 4, 22); rect(16, -17, 4, 22); pop();
}

function dibujarPuertaSalaEsperaNivel9(pulso) {
    if (nivel9Fase === "final" || nivel9Fase === "terminado") {
        noStroke(); fill(1, 1, 4, 250); quad(217, 59, 284, 59, 284, 151, 217, 151);
        fill(39, 21, 50); quad(218, 59, 254, 64, 252, 148, 218, 151);
        stroke(135, 85, 150, 190); strokeWeight(1.5); noFill(); quad(218, 59, 254, 64, 252, 148, 218, 151);
    } else {
        noFill(); stroke(95, 52, 117, 210); strokeWeight(2.5); quad(211, 54, 290, 54, 290, 157, 211, 157);
        stroke(135, 85, 150, 120 + pulso * 35); strokeWeight(1); line(216, 59, 285, 59); line(216, 151, 285, 151); noStroke();
    }
}

function dibujarLuzSalaEsperaNivel9(pulso) {
    const falla = Date.now() < nivel9LuzParpadeaHasta && frameCount % 18 < 6;
    noStroke(); fill(0, 0, 0, falla ? 138 : 55); rect(0, 0, width, height);
    drawingContext.save(); drawingContext.globalCompositeOperation = "screen";
    for (let i = 8; i > 0; i--) { fill(190, 139, 83, 2.5 + pulso); ellipse(286, 147, 28 + i * 20, 14 + i * 10); }
    drawingContext.restore();
    if (nivel9Fase === "final" || nivel9Fase === "terminado") { noStroke(); fill(0, 0, 2, 92); rect(0, 0, width, height); }
    if (nivel9Fase === "deterioro" && frameCount % 47 < 3) { noStroke(); fill(191, 145, 205, 65); rect(0, 102 + frameCount % 40, width, 2); }
    noFill(); stroke(6, 4, 8, 105); strokeWeight(24); rect(0, 0, width, height); noStroke();
}

function dibujarTransicionNivel9() {
    const transcurrido = Date.now() - nivel9InicioTransicion;
    if (transcurrido > 1900) return;
    const intensidad = transcurrido < 280 ? 235 : transcurrido < 700 ? 135 : constrain(135 * (1 - (transcurrido - 700) / 1200), 0, 135);
    noStroke(); fill(5, 3, 8, intensidad); rect(0, 0, width, height);
    if (transcurrido > 250 && transcurrido < 1150 && frameCount % 5 < 2) {
        fill(180, 130, 190, 70); rect(0, random(height), width, random(1, 4));
    }
}

function actualizarMovimientoJugadorNivel6() {
    if (estadoActual !== "nivel6") return;
    const ahora = Date.now();
    const delta = Math.min(80, Math.max(0, ahora - nivel6UltimaMuestra));
    nivel6UltimaMuestra = ahora;
    if (ahora - nivel6UltimoMovimiento > 300) nivel6TiempoQuietoMs += delta;
    registroNivel6.tiempoMouseQuietoMs = nivel6TiempoQuietoMs;
    registroNivel6.movimientosMouse = nivel6MovimientosMouse;
    if (posicionJugadorNivel6.x < 205) registroNivel6.seAcercoComputadora = true;
    if (posicionJugadorNivel6.x > 345) registroNivel6.seAcercoPuerta = true;

    const mouseQuieto = ahora - nivel6UltimoMovimiento > 2800;
    const invertirCursor = nivel6Fase === "mensajes" && frameCount % 480 >= 440 && frameCount % 480 < 470;
    if (invertirCursor && !nivel6InversionRegistrada) {
        nivel6InversionRegistrada = true;
        nivel6PerdidasControl += 1;
        registroNivel6.perdidasControl = nivel6PerdidasControl;
    } else if (!invertirCursor) {
        nivel6InversionRegistrada = false;
    }
    const pierdeControl = nivel6Fase === "control-no" ||
        (nivel6Fase === "control-si" && ahora - nivel6RespuestaMs < 3500) ||
        (nivel6Fase !== "normalidad" && nivel6Fase !== "cierre" && nivel6Fase !== "final" &&
            mouseQuieto && ahora - nivel6UltimoMovimiento > 4800);
    if (nivel6Fase === "mensajes" && ahora - nivel6UltimoMovimiento > 2700 && !nivel6PausaMarcada && ahora - nivel6UltimoAvisoPausa > 9000) {
        nivel6PausaMarcada = true;
        nivel6UltimoAvisoPausa = ahora;
        mensajeComputadoraNivel6.textContent = "¿POR QUÉ TE DETUVISTE?";
        setTimeout(function () {
            if (estadoActual === "nivel6" && nivel6PausaMarcada) mensajeComputadoraNivel6.textContent = "NO TE DIJE QUE DEJARAS DE MOVERTE.";
        }, 950);
    }
    if (nivel6Fase === "control-si" && ahora - nivel6RespuestaMs > 1450 && ahora - nivel6RespuestaMs < 1650 && !nivel6PosicionAlterada) {
        posicionJugadorNivel6.x = Math.min(410, posicionJugadorNivel6.x + (nivel6Ruta === "borro" ? 74 : 42));
        posicionJugadorNivel6.y = -8;
        nivel6PosicionAlterada = true;
    }
    if (pierdeControl) {
        if (!nivel6AutonomiaMarcada) {
            nivel6AutonomiaMarcada = true;
            nivel6PerdidasControl += 1;
            registroNivel6.perdidasControl = nivel6PerdidasControl;
        }
        const direccion = nivel6Fase === "control-no" ? -1 : 1;
        objetivoJugadorNivel6.x = constrain(posicionJugadorNivel6.x + sin(frameCount * 0.043) * 1.2 + direccion * 0.22, 75, 430);
        objetivoJugadorNivel6.y = constrain(posicionJugadorNivel6.y + cos(frameCount * 0.027) * 0.15, -32, 30);
    } else if (nivel6Fase === "normalidad" || nivel6Fase === "cierre" || nivel6Fase === "final") {
        objetivoJugadorNivel6.x = 250;
        objetivoJugadorNivel6.y = 0;
    } else {
        const cursorX = constrain(mouseX, 0, width);
        const cursorY = constrain(mouseY, 0, height);
        objetivoJugadorNivel6.x = invertirCursor
            ? map(width - cursorX, 0, width, 90, 425)
            : map(cursorX, 0, width, 90, 425);
        objetivoJugadorNivel6.y = map(cursorY, 0, height, -27, 28);
        if (mouseQuieto) {
            objetivoJugadorNivel6.x = lerp(objetivoJugadorNivel6.x, 105, 0.22);
            objetivoJugadorNivel6.y = lerp(objetivoJugadorNivel6.y, -3, 0.22);
        }
    }
    const rapidez = nivel6Fase === "control-no" ? 0.012 : nivel6Fase === "control-si" ? 0.038 : (nivel6Fase === "normalidad" || nivel6Fase === "cierre" || nivel6Fase === "final") ? 0.075 : 0.055;
    posicionJugadorNivel6.x = lerp(posicionJugadorNivel6.x, objetivoJugadorNivel6.x, rapidez);
    posicionJugadorNivel6.y = lerp(posicionJugadorNivel6.y, objetivoJugadorNivel6.y, rapidez);
}

function actualizarMovimientoJugadorNivel7() {
    if (estadoActual !== "nivel7") return;
    const ahora = Date.now();
    const delta = Math.min(80, Math.max(0, ahora - nivel7UltimaActualizacionMovimiento));
    nivel7UltimaActualizacionMovimiento = ahora;
    if (ahora - nivel7UltimoMovimientoMouse > 300) nivel7TiempoMouseQuietoMs += delta;
    registroNivel7.tiempoQuietoMouseMs = nivel7TiempoMouseQuietoMs;
    registroNivel7.movimientosMouse = nivel7MovimientosMouse;
    if (nivel7Fase === "final") {
        objetivoJugadorNivel7.x = 250;
        objetivoJugadorNivel7.y = 0;
    } else if (ahora - nivel7UltimoMovimientoMouse > 4200 && frameCount % 170 < 38) {
        objetivoJugadorNivel7.x = 120 + sin(frameCount * 0.025) * 9;
        objetivoJugadorNivel7.y = -7 + cos(frameCount * 0.019) * 4;
        if (!nivel7GiroAutonomoRegistrado) {
            registroNivel7.girosAutonomos = (registroNivel7.girosAutonomos || 0) + 1;
            nivel7GiroAutonomoRegistrado = true;
        }
    } else {
        objetivoJugadorNivel7.x = map(constrain(mouseX, 0, width), 0, width, 92, 410);
        objetivoJugadorNivel7.y = map(constrain(mouseY, 0, height), 0, height, -24, 20);
        if (ahora - nivel7UltimoMovimientoMouse < 700) nivel7GiroAutonomoRegistrado = false;
        if (nivel7Fase === "anomalia-respuesta" && frameCount % 150 < 22) {
            objetivoJugadorNivel7.x = constrain(posicionJugadorNivel7.x - 24, 92, 410);
        }
    }
    const velocidad = nivel7Fase === "final" ? 0.09 : 0.045;
    posicionJugadorNivel7.x = lerp(posicionJugadorNivel7.x, objetivoJugadorNivel7.x, velocidad);
    posicionJugadorNivel7.y = lerp(posicionJugadorNivel7.y, objetivoJugadorNivel7.y, velocidad);
}

function dibujarHabitacionNivel7() {
    const ruta = document.body.dataset.rutaNivel7 || "vigilancia";
    const terminaOscuro = nivel7Fase === "reaccion" && nivel7Respuesta === "silencio";
    const deformacion = sin(frameCount * 0.021) * 1.6 +
        (nivel7Fase === "anomalia-respuesta" ? sin(frameCount * 0.09) * 2.8 : 0);
    const derrumbe = ruta === "advierte" || nivel7Fase === "anomalia-respuesta";
    noStroke();
    background(terminaOscuro ? color(3, 3, 7) : color(12, 10, 16));
    fill(derrumbe ? color(27, 24, 30) : color(39, 45, 42));
    quad(0, 0, 500, 0, 455 + deformacion, 153, 39 - deformacion, 174);
    fill(derrumbe ? color(21, 19, 26) : color(29, 36, 34));
    quad(0, 0, 47, 22, 39 - deformacion, 174, 0, 197);
    fill(derrumbe ? color(18, 15, 22) : color(27, 33, 32));
    quad(455 + deformacion, 153, 500, 0, 500, 201, 447, 184);
    fill(derrumbe ? color(24, 19, 23) : color(56, 49, 42));
    beginShape(); vertex(0, 197); vertex(39 - deformacion, 174); vertex(447, 184); vertex(500, 201); vertex(500, 240); vertex(0, 240); endShape(CLOSE);
    stroke(derrumbe ? color(90, 56, 75, 115) : color(113, 123, 106, 88));
    strokeWeight(1);
    line(47, 22, 39 - deformacion, 174); line(47, 22, 455 + deformacion, 153);
    line(455 + deformacion, 153, 447, 184); line(0, 215, 500, 222);
    line(170, 192, 160, 216); line(353, 189, 369, 216);
    noStroke();
    // Muebles desalineados, un duplicado fugaz y grietas heredadas del nivel 6.
    fill(6, 5, 9, 180);
    rect(98, 75, 52, 28); rect(155, 76, 46, 25);
    if (frameCount % 210 < 10) rect(204, 77, 42, 23);
    fill(6, 4, 8, 130); ellipse(304, 168, 78, 17);
    stroke(5, 3, 8, 205); strokeWeight(1.5);
    line(65, 42, 76, 54); line(76, 54, 68, 70); line(68, 70, 81, 83);
    line(395, 31, 384, 49); line(384, 49, 397, 64); line(397, 64, 388, 81);
    noStroke();
    if (ruta === "dudo" && frameCount % 160 < 4) {
        fill(214, 201, 225, 36); rect(0, 64, width, 3);
    }
    if (terminaOscuro) { fill(0, 0, 5, 115); rect(0, 0, width, height); }
}

function dibujarInsectosNivel7() {
    if (nivel7InsectosDetenidos) return;
    const cantidad = nivel7Fase === "anomalia-respuesta" ? 13 : 8;
    for (let i = 0; i < cantidad; i++) {
        const bx = 38 + (i * 61) % 420;
        const by = 37 + (i * 43) % 153;
        const velocidad = nivel7Fase === "vigilancia" ? 0.14 : 0.06;
        const x = bx + sin(frameCount * velocidad + i * 2.1) * (3 + i % 4 * 2);
        const y = by + cos(frameCount * velocidad * 1.3 + i) * 3;
        push(); translate(x, y); rotate(sin(frameCount * 0.08 + i) * 0.5);
        noStroke(); fill(3, 2, 5, 225); ellipse(0, 0, 5, 2.7);
        stroke(3, 2, 5, 205); strokeWeight(0.7);
        line(-1, 0, -3, -2); line(0, 0, 1, 2); line(1, 0, 3, -2); noStroke(); pop();
    }
}

function dibujarPuertaNivel7() {
    const abre = nivel7Fase === "final" && frameCount % 200 < 4;
    const golpe = nivel7Fase === "anomalia-respuesta" && frameCount % 95 < 3;
    const x = 407 + (golpe ? sin(frameCount * 3) * 4 : sin(frameCount * 0.016) * 1.2);
    noStroke(); fill(4, 3, 7, 242); quad(x, 68, 468, 73, 469, 187, x - 8, 180);
    fill(43, 31, 49, 230); quad(x + (abre ? -8 : 4), 75, 461, 79, 463, 179, x - 2, 174);
    stroke(129, 83, 148, 160); strokeWeight(2); noFill(); quad(x, 68, 468, 73, 469, 187, x - 8, 180);
    noStroke(); fill(196, 155, 211); circle(451, 131, 5);
}

function dibujarFiguraNivel7() {
    const miraEsquina = dist(mouseX, mouseY, 469, 39) < 66;
    const aparece = nivel7FiguraAparece || (Date.now() - nivel7TiempoInicio > 7500 && frameCount % 230 < 28);
    if (!aparece || miraEsquina || nivel7FiguraTocada) return;
    dibujarSiluetaNivel6(475, 153, nivel7Fase === "anomalia-respuesta" ? 0.82 : 0.58, nivel7Fase === "anomalia-respuesta");
}

function dibujarSombraPuertaNivel7() {
    noStroke(); fill(1, 1, 3, 230);
    beginShape(); vertex(407, 178); vertex(465, 179); vertex(454, 184); vertex(414, 183); endShape(CLOSE);
}

function dibujarEfectosInterfazNivel7() {
    const ruta = document.body.dataset.rutaNivel7 || "";
    if (ruta === "advierte" || nivel7Fase === "anomalia-respuesta") {
        if (frameCount % 29 < 2) { noStroke(); fill(229, 207, 239, 54); rect(0, 58 + frameCount % 121, width, 2); }
        if (frameCount % 127 < 4) { noStroke(); fill(0, 0, 0, 92); rect(0, 0, width, height); }
    }
    if (nivel7Fase === "final") { noStroke(); fill(0, 0, 0, 175); rect(0, 0, width, height); }
}

function dibujarPasilloNivel8() {
    if (nivel8Fase === "final" || nivel8Fase === "regreso") {
        dibujarHabitacion();
        dibujarDetallesAbandono();
        noStroke(); fill(35, 24, 39, 225); rect(150, 42, 200, 34);
        fill(229, 196, 232); textAlign(CENTER, CENTER); textSize(10);
        text("CINCO POSIBILIDADES. UNA SOLA SALIDA.", 250, 58);
        return;
    }
    const extender = nivel8Respuesta === "salir" || nivel8PuertaNueva;
    const profundidad = extender ? 0.78 : 1;
    const desplaza = sin(frameCount * 0.018) * 1.8;
    background(5, 5, 9);
    noStroke();
    fill(27, 27, 33); quad(0, 0, 500, 0, 420 + desplaza, 202, 80 - desplaza, 202);
    fill(19, 19, 25); quad(0, 0, 80 - desplaza, 202, 80, 240, 0, 240);
    fill(17, 17, 23); quad(500, 0, 420 + desplaza, 202, 420, 240, 500, 240);
    fill(42, 38, 38); quad(80 - desplaza, 202, 420 + desplaza, 202, 500, 240, 0, 240);
    // Perspectiva convergente para que el suelo parezca continuar más allá de la pantalla.
    stroke(82, 74, 70, 85); strokeWeight(1);
    line(0, 240, 250, 64); line(500, 240, 250, 64);
    line(35, 221, 465, 221); line(62, 211, 438, 211); line(107, 195, 393, 195);
    // Paneles de pared, grietas y manos oscuras como señales de antiguos ocupantes.
    stroke(5, 4, 8, 190); strokeWeight(1.6);
    line(25, 45, 42, 57); line(42, 57, 36, 71); line(36, 71, 52, 83);
    line(475, 30, 459, 44); line(459, 44, 468, 60); line(468, 60, 451, 73);
    noStroke(); fill(3, 3, 6, 115);
    ellipse(48, 112, 19, 31); ellipse(51, 94, 11, 12);
    for (let i = 0; i < 4; i++) rect(43 + i * 4, 120, 2, 16 + (i % 2) * 4);
    // Una fila de luces con apagado progresivo desde el fondo hacia adelante.
    for (let i = 0; i < 4; i++) {
        const x = 250 - 18 * i;
        const y = 43 + i * 39;
        const seApago = nivel8LucesApagandose && frameCount % 90 > 12 + i * 14;
        const corte = nivel8Fase === "anomalia" && frameCount % 220 < 120;
        if (!seApago && !corte && !(frameCount % (102 + i * 7) < 3)) {
            fill(197, 181, 140, 170 - i * 22); ellipse(x, y, 27 - i * 4, 5 - i * 0.6);
            fill(188, 161, 118, 12); ellipse(x, y + 8, 78 - i * 9, 26 - i * 2);
        }
    }
    // La computadora aparece empotrada en la pared del pasillo.
    if (nivel8IndicePista >= 3 && frameCount % 210 < 22) {
        fill(118, 180, 152, 230); rect(284, 68, 31, 19);
        fill(5, 8, 8); textAlign(CENTER, CENTER); textSize(4);
        text("1 2 3 4 5", 299, 77);
    }
    if (nivel8IndicePista >= 1) {
        fill(160, 148, 123, 190); rect(28, 199, 54, 17);
        fill(22, 18, 18); textAlign(CENTER, CENTER); textSize(4.2);
        text("LAS DEMÁS YA LO INTENTARON", 55, 207);
    }
    if (nivel8IndicePista >= 2) {
        fill(177, 160, 181, 135); textAlign(CENTER); textSize(6);
        text("UNA DE ELLAS TE DEJARÁ SALIR", 250, 174);
    }
    if (nivel8Fase === "anomalia") {
        fill(0, 0, 0, frameCount % 220 < 120 ? 237 : 18); rect(0, 0, width, height);
    }
    if (nivel8Fase === "transicion") {
        fill(0, 0, 0, 100 + (sin(frameCount * 0.4) + 1) * 70); rect(0, 0, width, height);
    }
}

function dibujarPuertasNivel8() {
    if (nivel8Fase === "final") {
        noStroke(); fill(8, 6, 12, 245); rect(365, 75, 75, 108);
        stroke(131, 89, 148); noFill(); rect(365, 75, 75, 108); noStroke(); return;
    }
    push();
    if (nivel8Fase === "regreso") drawingContext.globalAlpha = constrain(1 - (Date.now() - nivel8RegresoInicio) / 2200, 0, 1);
    // Las puertas laterales se proyectan sobre las paredes convergentes del pasillo.
    dibujarPuertaLateralNivel8({ numero: 1, lado: "izquierda", y: 126, alto: 82, fraccion: 0.72, posicion: 0.08 });
    dibujarPuertaLateralNivel8({ numero: 4, lado: "izquierda", y: 79, alto: 57, fraccion: 0.66, posicion: 0.12 });
    dibujarPuertaFrontalNivel8(3, 250, 69, 39, 59);
    dibujarPuertaLateralNivel8({ numero: 2, lado: "derecha", y: 82, alto: 57, fraccion: 0.66, posicion: 0.12 });
    dibujarPuertaLateralNivel8({ numero: 5, lado: "derecha", y: 125, alto: 82, fraccion: 0.72, posicion: 0.08 });
    if (nivel8PuertaNueva) {
        dibujarPuertaFrontalNivel8(6, 250, 42, 24, 35);
    }
    pop();
}

function dibujarPuertaLateralNivel8(config) {
    const numero = config.numero;
    const y1 = config.y;
    const y2 = config.y + config.alto;
    const xInterior1 = constrain(y1 / 202, 0, 1) * 80;
    const xInterior2 = constrain(y2 / 202, 0, 1) * 80;
    let puntos;
    if (config.lado === "izquierda") {
        puntos = {
            tl: { x: xInterior1 * config.posicion, y: y1 },
            tr: { x: xInterior1 * (config.posicion + config.fraccion), y: y1 },
            br: { x: xInterior2 * (config.posicion + config.fraccion), y: y2 },
            bl: { x: xInterior2 * config.posicion, y: y2 }
        };
    } else {
        puntos = {
            tl: { x: 500 - xInterior1 * (config.posicion + config.fraccion), y: y1 },
            tr: { x: 500 - xInterior1 * config.posicion, y: y1 },
            br: { x: 500 - xInterior2 * config.posicion, y: y2 },
            bl: { x: 500 - xInterior2 * (config.posicion + config.fraccion), y: y2 }
        };
    }
    dibujarMarcoPuertaNivel8(numero, puntos, config.lado);
}

function dibujarPuertaFrontalNivel8(numero, centro, y, ancho, alto) {
    const punto = {
        tl: { x: centro - ancho * 0.43, y: y },
        tr: { x: centro + ancho * 0.43, y: y },
        br: { x: centro + ancho * 0.5, y: y + alto },
        bl: { x: centro - ancho * 0.5, y: y + alto }
    };
    dibujarMarcoPuertaNivel8(numero, punto, "fondo");
}

function dibujarMarcoPuertaNivel8(numero, p, lado) {
    const abrir = (nivel8PuertaApertura === numero && nivel8PuertaCierra !== numero) || (nivel8FiguraPuerta && numero === 4);
    const escala = constrain((p.bl.y - 55) / 150, 0.34, 1);
    const interpolaPunto = function (a, b, t) {
        return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
    };
    const inset = function (punto, t) {
        return {
            tl: interpolaPunto(punto.tl, punto.br, t),
            tr: interpolaPunto(punto.tr, punto.bl, t),
            br: interpolaPunto(punto.br, punto.tl, t),
            bl: interpolaPunto(punto.bl, punto.tr, t)
        };
    };
    const dibujaQuad = function (q) {
        quad(q.tl.x, q.tl.y, q.tr.x, q.tr.y, q.br.x, q.br.y, q.bl.x, q.bl.y);
    };
    const marco = inset(p, 0.045);
    const vano = inset(p, 0.12);
    const hoja = inset(p, 0.16);
    const panel = inset(hoja, 0.20);
    const centro = interpolaPunto(hoja.tl, hoja.br, 0.5);
    const borde = lado === "derecha" ? hoja.tr : hoja.tl;
    const ladoBisagra = lado === "derecha" ? hoja.tl : hoja.tr;

    // Misma hoja sencilla violeta del nivel 1: sin textura ni tonos de madera.
    noStroke(); fill(0, 0, 0, 205); dibujaQuad(inset(p, 0.005));
    fill(17, 10, 23); dibujaQuad(p);
    fill(10, 7, 15); dibujaQuad(marco);
    fill(2, 2, 6, 245); dibujaQuad(vano);
    fill(48, 33, 58); dibujaQuad(hoja);
    stroke(135, 85, 150, 195); strokeWeight(max(1.1, escala * 1.8)); noFill(); dibujaQuad(p);
    stroke(23, 13, 32, 245); strokeWeight(max(1.2, escala * 2.1)); dibujaQuad(marco);
    stroke(135, 85, 150, 125); strokeWeight(max(0.7, escala)); noFill(); dibujaQuad(hoja); noStroke();

    // Un solo panel oscuro, sobrio, con el contorno característico de la puerta inicial.
    const panelSuperior = inset(panel, 0.04);
    fill(30, 20, 39); dibujaQuad(panelSuperior);
    stroke(82, 48, 101, 175); strokeWeight(max(0.65, escala)); noFill(); dibujaQuad(panelSuperior); noStroke();

    if (abrir) {
        // La hoja se abre desde las bisagras y deja ver una oscuridad profunda.
        const desplazamiento = lado === "derecha" ? -1 : 1;
        const hojaAbierta = {
            tl: { x: ladoBisagra.x, y: ladoBisagra.y },
            tr: { x: centro.x + desplazamiento * escala * 13, y: centro.y - escala * 3 },
            br: { x: centro.x + desplazamiento * escala * 13, y: p.br.y - escala * 3 },
            bl: { x: ladoBisagra.x, y: ladoBisagra.y + (p.bl.y - p.tl.y) }
        };
        fill(1, 1, 3, 250); dibujaQuad(vano);
        fill(38, 22, 49); dibujaQuad(hojaAbierta);
        stroke(135, 85, 150, 220); strokeWeight(max(0.8, escala)); noFill(); dibujaQuad(hojaAbierta); noStroke();
        fill(1, 1, 3, 240); ellipse(centro.x, p.bl.y - 8 * escala, 24 * escala, 32 * escala);
    } else {
        // Picaporte viejo común a las cinco puertas.
        const picaporte = interpolaPunto(hoja.tr, hoja.br, 0.57);
        fill(5, 3, 9, 220); ellipse(picaporte.x + escala, picaporte.y + escala, 6 * escala, 9 * escala);
        fill(172, 112, 197, 235); ellipse(picaporte.x, picaporte.y, max(2, 4 * escala), max(2, 4 * escala));
    }

    if (numero === 1) {
        // Arañazos: esta puerta pregunta si hay otras personas atrapadas.
        dibujarGrietasPuertaNivel8(hoja, interpolaPunto(hoja.tl, hoja.br, 0.43), escala, 5);
    } else if (numero === 2) {
        // Luz de habitación al otro lado: cálida, angosta e inestable.
        const brillo = (sin(frameCount * 0.11) + 1) * 0.5;
        const junta = lado === "derecha" ? vano.tl : vano.tr;
        stroke(215, 177, 126, 70 + brillo * 145); strokeWeight(max(1.2, 2.5 * escala));
        line(junta.x, junta.y + 5 * escala, lado === "derecha" ? vano.bl.x : vano.br.x, (lado === "derecha" ? vano.bl.y : vano.br.y) - 5 * escala);
        noStroke(); fill(203, 154, 98, 16 + brillo * 18); ellipse(centro.x, centro.y, 25 * escala, 34 * escala);
    } else if (numero === 3) {
        // Símbolo tachado: la pregunta de esta puerta pone en duda lo que se oyó.
        const cx = centro.x, cy = centro.y;
        stroke(151, 111, 128, 190); strokeWeight(max(0.8, 1.3 * escala)); noFill(); ellipse(cx, cy, 13 * escala, 19 * escala);
        line(cx - 5 * escala, cy - 8 * escala, cx + 5 * escala, cy + 8 * escala);
        line(cx + 5 * escala, cy - 8 * escala, cx - 5 * escala, cy + 8 * escala); noStroke();
    } else if (numero === 4) {
        // Marca de escucha y cadena envejecida: vinculada a la pregunta sobre oír.
        dibujarGrietasPuertaNivel8(hoja, interpolaPunto(hoja.tl, hoja.br, 0.55), escala, 3);
        stroke(112, 99, 88, 220); strokeWeight(max(1, 1.7 * escala));
        for (let i = 0; i < 4; i++) ellipse(centro.x, hoja.tl.y + 8 * escala + i * 4 * escala, 3 * escala, 2 * escala);
        noStroke(); fill(37, 30, 33); rect(centro.x - 3 * escala, hoja.bl.y - 8 * escala, 6 * escala, 7 * escala, 2);
    } else if (numero === 5) {
        const pantalla = inset(hoja, 0.28);
        noStroke(); fill(3, 5, 7, 255); dibujaQuad(pantalla);
        stroke(104, 156, 132, 160); strokeWeight(max(0.8, escala)); noFill(); dibujaQuad(pantalla); noStroke();
        fill(117, 185, 151, 230); textAlign(CENTER, CENTER); textSize(max(2.7, 4 * escala));
        text("¿HAY\nALGUIEN?", centro.x, centro.y);
        if (frameCount % 120 < 5) { fill(201, 205, 201, 125); rect(pantalla.tl.x, centro.y, max(2, pantalla.tr.x - pantalla.tl.x), 1.5 * escala); }
    }

    // Umbral apoyado en el piso: une visualmente la puerta con la fuga del pasillo.
    stroke(11, 9, 14, 210); strokeWeight(max(0.7, escala));
    line(p.bl.x, p.bl.y, p.bl.x - (lado === "izquierda" ? -7 : 7) * escala, p.bl.y + 6 * escala);
    line(p.br.x, p.br.y, p.br.x + (lado === "derecha" ? -7 : 7) * escala, p.br.y + 6 * escala);
    noStroke();
}

function dibujarGrietasPuertaNivel8(hoja, origen, escala, cantidad) {
    stroke(6, 3, 8, 235); strokeWeight(max(0.8, 1.3 * escala));
    for (let i = 0; i < cantidad; i++) {
        const x = origen.x + (i - (cantidad - 1) / 2) * 2.2 * escala;
        const y = origen.y - 8 * escala + (i % 2) * 5 * escala;
        line(x, y, x + 2.8 * escala, y + 4 * escala);
        line(x + 2.8 * escala, y + 4 * escala, x + 0.8 * escala, y + 8 * escala);
    }
    noStroke();
}

function dibujarFiguraPasilloNivel8() {
    if (nivel8Fase === "anomalia" || nivel8Fase === "final" || nivel8Fase === "regreso") return;
    const cruza = frameCount % 390 < 18;
    const aparece = nivel8FiguraPuerta || nivel8Respuesta === "buscar" && frameCount % 260 < 24 || cruza;
    if (aparece) dibujarSiluetaNivel6(cruza ? map(frameCount % 390, 0, 18, 82, 418) : 251, 100, 0.38, false);
}

function dibujarEfectosNivel8() {
    if (nivel8Fase === "final" || nivel8Fase === "regreso") return;
    if (nivel8Respuesta === "salir" || nivel8Fase === "anomalia") {
        if (frameCount % 41 < 2) { noStroke(); fill(220, 202, 230, 52); rect(0, 34 + frameCount % 170, width, 2); }
        if (frameCount % 160 < 3) { noStroke(); fill(0, 0, 0, 74); rect(0, 0, width, height); }
    }
    if (nivel8PuertaApertura > 0 && frameCount % 75 < 2) {
        noStroke(); fill(229, 214, 185, 46); rect(105, 80, 285, 105);
    }
}

function dibujarHabitacionNivel6() {
    const cierreParcial = nivel6Fase === "normalidad" || nivel6Fase === "cierre" || nivel6Fase === "final";
    const destruida = nivel6Ruta === "rechazo" || nivel6Ruta === "dudo";
    const desplazamientoContrario = constrain((250 - posicionJugadorNivel6.x) * 0.025, -5, 5);
    const deformacionTemporal = (nivel6Fase === "control-no" ? sin(frameCount * 0.075) * 4 : sin(frameCount * 0.018) * 1.2) + desplazamientoContrario;
    const angulo = (cierreParcial ? 2 : destruida ? 12 : 3) + deformacionTemporal;
    noStroke();
    background(destruida ? color(9, 6, 13) : color(15, 13, 18));
    fill(destruida ? color(26, 24, 31) : color(47, 53, 48));
    quad(0, 0, 500, 0, 455, 151 + angulo, 41, 172 - angulo);
    fill(destruida ? color(22, 19, 26) : color(39, 42, 39));
    quad(0, 0, 45, 21, 41, 172 - angulo, 0, 196);
    fill(destruida ? color(17, 15, 21) : color(35, 37, 34));
    quad(455, 151 + angulo, 500, 0, 500, 205, 447, 184);
    fill(destruida ? color(31, 25, 25) : color(62, 57, 47));
    beginShape();
    vertex(0, 196); vertex(41, 172 - angulo); vertex(447, 184);
    vertex(500, 205); vertex(500, 240); vertex(0, 240);
    endShape(CLOSE);
    stroke(destruida ? color(91, 57, 67, 115) : color(122, 130, 116, 90));
    strokeWeight(1);
    line(45, 21, 41, 172 - angulo);
    line(45, 21, 455, 151 + angulo);
    line(455, 151 + angulo, 447, 184);
    line(0, 213, 500, 222);
    line(84, 197, 75, 221);
    line(362, 190, 379, 220);
    noStroke();

    if (!destruida) {
        // La ruta de olvido borra el deterioro, pero deja proporciones imposibles.
        fill(97, 101, 88, 160);
        const cambioTamano = nivel6Fase === "control-no" && frameCount % 120 < 20 ? 1.35 : 1;
        rect(108, 72, 33 * cambioTamano, 27 * cambioTamano);
        rect(148, 73, 33, 27);
        fill(5, 4, 8, 105);
        rect(188, 72, 32, 27);
        rect(224, 72, 32, 27);
        fill(182, 168, 137, 75);
        ellipse(104, 182, 25, 12);
    } else {
        fill(4, 3, 7, 125);
        ellipse(129, 78, 61, 23);
        ellipse(307, 161, 79, 18);
        stroke(5, 4, 8, 210);
        strokeWeight(2);
        line(175, 26, 164, 54); line(164, 54, 181, 71);
        line(322, 150, 337, 163); line(337, 163, 327, 180);
        noStroke();
    }

    if (nivel6Ruta === "dudo") {
        // Conviven una parte casi limpia y otra dañada; ciertos restos cambian cuando no se los mira.
        fill(122, 125, 106, 104);
        quad(59, 33, 204, 39, 195, 151, 51, 159);
        if (frameCount % 230 < 115 || dist(mouseX, mouseY, 322, 139) < 70) {
            fill(12, 9, 15, 185);
            rect(frameCount % 230 < 115 ? 294 : 311, 136, 31, 12);
        }
    }

    if (nivel6Fase === "control-no" && frameCount % 120 < 20) {
        fill(6, 4, 9, 175);
        rect(300, 142, 43, 12);
        ellipse(351, 154, 11, 15);
    }

    if (!cierreParcial && nivel6Ruta !== "borro") {
        noStroke();
        fill(5, 3, 8, 115);
        ellipse(posicionJugadorNivel6.x - 10, 157 + posicionJugadorNivel6.y, 49, 22);
        ellipse(posicionJugadorNivel6.x + 13, 165 + posicionJugadorNivel6.y, 25, 12);
    }

    // Un marco pequeño dentro del cuarto repite la geometría del nivel anterior.
    fill(7, 5, 10, destruida ? 180 : 105);
    quad(181, 87, 250, 83, 260, 168, 177, 172);
    stroke(127, 93, 138, 100);
    noFill();
    quad(181, 87, 250, 83, 260, 168, 177, 172);
    noStroke();
}

function dibujarGrietasNivel6() {
    const intensidad = nivel6Ruta === "borro" ? 50 : nivel6Ruta === "dudo" ? 115 : 190;
    stroke(5, 3, 8, intensidad);
    strokeWeight(1.2);
    line(65, 45, 76, 57); line(76, 57, 71, 71); line(71, 71, 83, 81);
    line(411, 37, 398, 54); line(398, 54, 405, 65); line(405, 65, 393, 83);
    line(39, 191, 53, 184); line(53, 184, 60, 199);
    noStroke();
}

function dibujarInsectosNivel6() {
    if (respuestaNivel6 === "si" && Date.now() - nivel6RespuestaMs > 700 && Date.now() - nivel6RespuestaMs < 1500) return;
    const velocidad = nivel6Fase === "control-no" ? 0.19 : 0.065;
    const cantidad = nivel6Fase === "control-no" && frameCount % 170 < 85 ? 16 : 9;
    for (let i = 0; i < cantidad; i++) {
        const puntoX = 34 + (i * 57) % 440;
        const puntoY = 28 + (i * 37) % 176;
        const acercamiento = constrain((frameCount * velocidad + i * 21) % 95 / 95, 0, 1);
        const x = lerp(puntoX, constrain(mouseX, 0, width), acercamiento * 0.64);
        const y = lerp(puntoY, constrain(mouseY, 0, height), acercamiento * 0.5);
        push();
        translate(x, y);
        rotate(sin(frameCount * 0.12 + i) * 0.3);
        fill(4, 3, 6, 210);
        ellipse(0, 0, 4.5, 2.5);
        stroke(5, 4, 6, 190);
        strokeWeight(0.7);
        line(-1, 0, -3, -2); line(0, 0, 1, 2); line(1, 0, 3, -2);
        noStroke();
        pop();
    }
}

function dibujarPuertaNivel6() {
    const irregular = sin(frameCount * 0.038) > 0.985 && nivel6Fase !== "final";
    const x = 409 + sin(frameCount * 0.017) * 1.5;
    noStroke();
    fill(5, 3, 8, 240);
    quad(x, 69, 468, 75, 470, 186, x - 7, 179);
    fill(48, 34, 54, irregular ? 180 : 235);
    quad(x + 4, 76, 461, 80, irregular ? 454 : 463, 178, x - 2, 173);
    stroke(139, 93, 153, 165);
    strokeWeight(2);
    noFill();
    quad(x, 69, 468, 75, 470, 186, x - 7, 179);
    noStroke();
    fill(205, 167, 218);
    circle(452, 131, 5);
}

function dibujarFiguraObservadoraNivel6() {
    const mouseMiraEsquina = dist(mouseX, mouseY, 470, 25) < 82;
    const tiempo = Date.now() - inicioNivel6;
    const apareceAtras = tiempo > 12000 && frameCount % 210 < 40;
    const crecimiento = constrain((tiempo - 4800) / 3600, 0, 1);
    if (nivel6FiguraTocada) return;
    if (!mouseMiraEsquina && tiempo > 4800) dibujarSiluetaNivel6(474, 156, 0.7 * crecimiento, tiempo > 7000);
    if (apareceAtras) dibujarSiluetaNivel6(posicionJugadorNivel6.x + 3, 164 + posicionJugadorNivel6.y, 0.68);
}

function dibujarSiluetaNivel6(x, y, escala, mostrarOjos = true) {
    push();
    translate(x, y);
    scale(escala);
    noStroke();
    fill(2, 2, 5, 225);
    ellipse(0, -45, 20, 23);
    beginShape();
    vertex(-11, -34); vertex(10, -34); vertex(17, -5); vertex(12, 20);
    vertex(4, 14); vertex(0, 25); vertex(-5, 16); vertex(-14, 20); endShape(CLOSE);
    if (mostrarOjos) {
        fill(225, 211, 233, 175);
        ellipse(-4, -46, 2, 3); ellipse(4, -46, 2, 3);
    }
    pop();
}

function dibujarEfectosInterfazNivel6() {
    if (nivel6Ruta === "rechazo" || nivel6Fase === "control-no") {
        if (frameCount % 37 < 2) {
            noStroke();
            fill(224, 190, 233, 45);
            rect(0, 47 + frameCount % 92, width, 2);
        }
    }
    if (nivel6Fase === "control-si" && Date.now() - nivel6RespuestaMs > 700 && Date.now() - nivel6RespuestaMs < 1600) {
        noStroke();
        fill(0, 0, 4, 125);
        rect(0, 0, width, height);
    }
}

function mouseMoved() {
    if (estadoActual === "nivel6") {
        nivel6MovimientosMouse += 1;
        nivel6UltimoMovimiento = Date.now();
        nivel6MouseQuietoDesde = nivel6UltimoMovimiento;
        nivel6PausaMarcada = false;
        if (nivel6Fase !== "control-no" && !(nivel6Fase === "control-si" && Date.now() - nivel6RespuestaMs < 3500)) {
            nivel6AutonomiaMarcada = false;
        }
        registroNivel6.movimientosMouse = nivel6MovimientosMouse;
    } else if (estadoActual === "nivel7") {
        nivel7MovimientosMouse += 1;
        nivel7UltimoMovimientoMouse = Date.now();
        nivel7GiroAutonomoRegistrado = false;
        registroNivel7.movimientosMouse = nivel7MovimientosMouse;
    } else if (estadoActual === "nivel10" && nivel10Fase === "exploracion") {
        nivel10UltimoMovimientoMouse = Date.now();
        if (nivel10MiradaPersonaje === "jugador") nivel10MiradaPersonaje = "frente";
    }
    return true;
}

function dibujarHabitacionNivel5() {
    if (respuestaNivel3 === "si") {
        // La limpieza se siente sospechosamente perfecta: superficies ordenadas y luz calma.
        noStroke();
        fill(83, 91, 83, 48);
        rect(57, 27, 386, 158);
        fill(107, 99, 81, 95);
        rect(0, 195, width, 45);
        stroke(120, 113, 92, 75);
        strokeWeight(1);
        line(0, 207, 500, 207);
        line(0, 224, 500, 224);
        noStroke();
    } else {
        // Persisten pequeñas desalineaciones del nivel anterior.
        if (respuestaRecuerdosNivel5 !== "no" && frameCount % 137 < 2) {
            noStroke();
            fill(204, 180, 219, 24);
            rect(0, 65 + (frameCount % 137) * 5, width, 3);
        }
        push();
        translate(respuestaRecuerdosNivel5 === "no" ? 0 : sin(frameCount * 0.018) * 1.5, 0);
        stroke(101, 65, 112, 60);
        strokeWeight(1);
        line(55, 25, 61, 195);
        line(445, 25, 439, 195);
        noStroke();
        pop();
    }
}

function dibujarSombraNivel5() {
    const cuestiono = respuestaRecuerdosNivel5 === "si";
    const retraso = cuestiono ? 17 : 0;
    const seAleja = registroNivel5.clicsSombra > 0;
    const avance = faseNivel5 === "final" ? 0 : cuestiono && frameCount % 240 > 185 ? 9 : seAleja ? 12 : cuestiono ? 8 : respuestaRecuerdosNivel5 === "no" ? 0 : 8;
    const quieta = cuestiono && frameCount % 320 > 250;
    const levantaLaCabeza = quieta ? -3 : 0;
    push();
    translate(250 + avance + (quieta ? 0 : sin((frameCount - retraso) * 0.045) * 0.5), 0);
    scale(1, 1.02);
    noStroke();
    fill(4, 3, 7, faseNivel5 === "final" || respuestaRecuerdosNivel5 === "no" ? 75 : 145);
    ellipse(0, 114 + levantaLaCabeza, 20, 24);
    beginShape();
    vertex(-10, 126); vertex(9, 126); vertex(15, 150); vertex(11, 173);
    vertex(5, 169); vertex(2, 179); vertex(-2, 172); vertex(-8, 178);
    vertex(-12, 154); endShape(CLOSE);
    stroke(4, 3, 7, 220);
    strokeWeight(4);
    line(-8, 133, -19, 157); line(8, 133, 19, 155);
    if (cuestiono && frameCount % 420 > 392) {
        stroke(218, 204, 229, 170);
        strokeWeight(1.3);
        line(-4, 112, -1, 112); line(3, 112, 5, 112);
    }
    pop();
}

function dibujarEfectosNivel5() {
    if (respuestaRecuerdosNivel5 === "si" && frameCount % 240 < 2) {
        stroke(220, 190, 232, 80);
        line(0, 76, width, 76);
        line(0, 79, width, 79);
        noStroke();
    }
}

function dibujarReaccionNivel2() {
    if (estadoActual !== "nivel2") return;

    if (reaccionNivel2 === "destello") {
        const opacidad = 210 + (sin(frameCount * 0.9) + 1) * 22;
        noStroke();
        fill(244, 237, 255, opacidad);
        rect(0, 0, width, height);
        dibujarPersonaje(false, true, { x: 316, yOffset: -62, escala: 1.45, alterado: true, desfase: 15 });
        return;
    }

    if (reaccionNivel2 === "revelado") {
        noStroke();
        fill(46, 12, 34, 74 + (sin(frameCount * 0.08) + 1) * 18);
        rect(0, 0, width, height);
        stroke(112, 55, 103, 110);
        strokeWeight(1);
        line(35, 42, 70, 57);
        line(70, 57, 60, 77);
        line(60, 77, 82, 91);
    } else if (reaccionNivel2 === "oculto") {
        // Oscurece el cuarto y deja solo una luz débil alrededor del jugador.
        noStroke();
        fill(0, 0, 5, 186);
        rect(0, 0, width, height);
        const resplandor = drawingContext.createRadialGradient(348, 147, 8, 348, 147, 94);
        resplandor.addColorStop(0, "rgba(87, 67, 104, 0.30)");
        resplandor.addColorStop(1, "rgba(5, 3, 8, 0)");
        drawingContext.fillStyle = resplandor;
        drawingContext.fillRect(0, 0, width, height);
    }
}

function dibujarUmbralSalida() {
    background(5, 4, 9);
    noStroke();
    fill(13, 10, 20);
    quad(110, 24, 390, 24, 315, 196, 185, 196);
    fill(5, 4, 7);
    quad(150, 45, 350, 45, 292, 194, 208, 194);
    stroke(89, 62, 105, 95);
    strokeWeight(1);
    line(110, 24, 185, 196);
    line(390, 24, 315, 196);
    line(250, 24, 250, 194);
    noStroke();
}

function dibujarDobleEnEspejo() {
    push();
    noStroke();
    fill(42, 35, 50, 240);
    rect(265, 22, 76, 80, 3);
    fill(12, 15, 21, 245);
    rect(270, 27, 66, 70);

    const reflejo = drawingContext;
    reflejo.save();
    reflejo.beginPath();
    reflejo.rect(271, 28, 64, 68);
    reflejo.clip();
    reflejo.translate(606, 0);
    reflejo.scale(-1, 1);

    const fase = (frameCount - 18) % 420;
    const seAdelanta = fase > 300 && fase < 318;
    const movimientoAtrasado = sin((frameCount - 20) * 0.045) * 3;
    const xDoble = seAdelanta ? 319 : 301 + movimientoAtrasado;
    const escalaDoble = seAdelanta ? 0.59 : 0.42;
    dibujarPersonaje(false, true, {
        x: xDoble, yOffset: -18, escala: escalaDoble,
        alterado: seAdelanta, desfase: seAdelanta ? 10 : 0
    });
    reflejo.restore();

    // Brillos apagados y una marca vertical del vidrio viejo.
    stroke(153, 130, 170, 92);
    strokeWeight(1);
    line(273, 30, 273, 93);
    line(337, 28, 337, 95);
    stroke(105, 88, 124, 100);
    line(280, 91, 289, 84);
    noFill();
    stroke(102, 79, 117, 190);
    rect(265, 22, 76, 80, 3);
    pop();
}

function dibujarNotaNivel3() {
    const sobreNota = mouseX >= 113 && mouseX <= 149 && mouseY >= 196 && mouseY <= 222;
    push();
    translate(131, 209);
    rotate(-0.12);
    noStroke();
    fill(sobreNota ? 190 : 137, sobreNota ? 181 : 146, sobreNota ? 150 : 118, sobreNota ? 230 : 185);
    rect(-14, -8, 28, 16);
    fill(36, 31, 34, sobreNota ? 175 : 105);
    rect(-9, -3, 16, 1);
    rect(-9, 0, 12, 1);
    rect(-9, 3, 14, 1);
    if (sobreNota && !notaEncontrada) {
        noFill();
        stroke(211, 190, 220, 100);
        strokeWeight(1);
        rect(-17, -11, 34, 22);
    }
    pop();
}

function dibujarSombraBajoPuerta() {
    const pulso = (sin(frameCount * 0.08) + 1) / 2;
    noStroke();
    fill(2, 1, 5, 220);
    beginShape();
    vertex(372, 181);
    vertex(432, 181);
    vertex(446, 189);
    vertex(359, 189);
    endShape(CLOSE);
    fill(89, 42, 101, 35 + pulso * 35);
    ellipse(403, 185, 55, 4);
}

function dibujarMarcaPuertaDesaparecida() {
    noStroke();
    fill(31, 39, 37);
    rect(365, 75, 75, 108);
    fill(40, 43, 39, 100);
    rect(372, 81, 61, 96);
    stroke(17, 19, 18, 165);
    strokeWeight(1.3);
    line(376, 88, 381, 96);
    line(381, 96, 375, 104);
    line(375, 104, 385, 112);
    line(428, 135, 420, 141);
    line(420, 141, 426, 149);
    noStroke();
}

function dibujarObjetosDesplazadosNivel4() {
    const movimiento = sin(frameCount * 0.023) * 1.4;
    noStroke();
    fill(11, 8, 15, 85);
    quad(139 + movimiento, 207, 158 + movimiento, 206, 161 + movimiento, 214, 142 + movimiento, 216);
    stroke(16, 13, 20, 95);
    strokeWeight(1);
    line(217, 82, 208 + movimiento, 91);
    line(208 + movimiento, 91, 216, 99);
    noStroke();
}

function dibujarInsectosNivel4() {
    const rutas = [
        { x: 94, y: 82, dx: 1, dy: 0.12 }, { x: 191, y: 183, dx: 1, dy: 0.02 },
        { x: 375, y: 58, dx: -1, dy: 0.10 }, { x: 449, y: 164, dx: -1, dy: 0.05 },
        { x: 65, y: 195, dx: 1, dy: 0 }, { x: 294, y: 188, dx: -1, dy: 0.03 },
        { x: 405, y: 91, dx: -1, dy: 0.14 }
    ];
    rutas.forEach(function (ruta, indice) {
        const paso = (frameCount * (0.13 + indice * 0.012) + indice * 31) % 44;
        const x = ruta.x + paso * ruta.dx;
        const y = ruta.y + paso * ruta.dy + sin(frameCount * 0.11 + indice) * 1.2;
        push();
        translate(x, y);
        rotate(ruta.dx < 0 ? PI : 0);
        noStroke();
        fill(5, 4, 6, 225);
        ellipse(0, 0, 4.5, 2.6);
        ellipse(2.7, -0.2, 2, 1.8);
        stroke(7, 5, 8, 210);
        strokeWeight(0.7);
        line(-1, 1, -2, 2.5);
        line(0, 1, 0, 2.7);
        line(1, 1, 2, 2.4);
        line(-1, -1, -2, -2.2);
        line(0, -1, 0, -2.5);
        line(1, -1, 2, -2.1);
        pop();
    });
}

function dibujarSombrasProfundasNivel4() {
    const ctx = drawingContext;
    ctx.save();
    const alivio = reaccionNivel4Finalizada ? min(1, (Date.now() - tiempoFinalNivel4) / 2200) : 0;
    const sombra = ctx.createRadialGradient(250, 120, 42, 250, 120, 290);
    sombra.addColorStop(0, "rgba(0, 0, 0, 0.08)");
    sombra.addColorStop(0.54, `rgba(0, 0, 0, ${0.40 - alivio * 0.09})`);
    sombra.addColorStop(1, `rgba(0, 0, 0, ${0.83 - alivio * 0.15})`);
    ctx.fillStyle = sombra;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}

function dibujarFallaLuzNivel4() {
    const fase = frameCount % 173;
    if (!((fase >= 3 && fase <= 5) || (fase >= 47 && fase <= 49) || (fase >= 122 && fase <= 123))) return;
    noStroke();
    fill(0, 0, 2, fase >= 122 ? 165 : 105);
    rect(0, 0, width, height);
    if (fase >= 47 && fase <= 49) {
        fill(192, 148, 209, 22);
        rect(0, 96 + fase, width, 2);
    }
}

function dibujarInscripcionPuertaNivel4() {
    const leida = registroNivel4.leyoInscripcion;
    const sobre = mouseX >= 372 && mouseX <= 435 && mouseY >= 88 && mouseY <= 150;
    const visibilidadBase = respuestaNivel3 === "si" ? 28 : 155;
    const alpha = leida ? 220 : sobre ? min(190, visibilidadBase + 55) : visibilidadBase;
    noStroke();
    fill(157, 143, 153, alpha);
    textAlign(CENTER, CENTER);
    textLeading(7);
    textSize(5.5);
    text("SI PODÉS LEER\nESTO, NO CONFÍES\nHUÍ SI PODÉS", 402, 119);
    if (respuestaNivel3 === "si" && !leida) {
        fill(21, 17, 22, 68);
        ellipse(402, 118, 39, 22);
    }
}

function dibujarMarcasUñasNivel4() {
    const cantidad = min(registroNivel4.clicksMarcas || 0, 6);
    const cerca = ((mouseX >= 348 && mouseX <= 367) || (mouseX >= 439 && mouseX <= 458)) && mouseY >= 84 && mouseY <= 185;
    const alpha = (respuestaNivel3 === "si" ? 34 : 54) + cantidad * 22 + (cerca ? 38 : 0);
    stroke(9, 7, 10, min(210, alpha));
    strokeWeight(1.4);
    // Marcas antiguas casi fundidas con el marco.
    line(359, 91, 355, 103);
    line(355, 103, 360, 110);
    line(445, 112, 450, 124);
    line(450, 124, 445, 131);
    if (cerca && cantidad < 3) {
        line(353, 137, 349, 132);
        line(354, 139, 349, 139);
        line(354, 141, 350, 146);
        line(447, 153, 452, 148);
        line(447, 155, 453, 156);
        line(446, 157, 451, 162);
    }
    if (cantidad >= 2) {
        line(357, 126, 352, 137);
        line(352, 137, 358, 145);
        line(443, 145, 449, 153);
        line(449, 153, 444, 161);
    }
    if (cantidad >= 3) {
        line(353, 135, 349, 131);
        line(353, 137, 348, 138);
        line(353, 140, 349, 145);
        line(447, 151, 452, 147);
        line(447, 154, 453, 155);
        line(447, 157, 451, 162);
    }
    if (cantidad >= 4) {
        line(360, 160, 367, 168);
        line(367, 168, 373, 176);
        line(443, 161, 436, 169);
        line(436, 169, 430, 177);
        line(365, 99, 370, 105);
    }
    noStroke();
}

function dibujarManoDesdePuertaNivel4(progreso) {
    const puntaX = 433 - progreso * 91;
    const puntaY = 153 + sin(frameCount * 0.11) * 2;
    push();
    noStroke();
    fill(4, 3, 7, 235);
    beginShape();
    vertex(440, 143);
    vertex(422, 146);
    vertex(puntaX + 13, puntaY - 8);
    vertex(puntaX - 3, puntaY - 8);
    vertex(puntaX - 9, puntaY - 2);
    vertex(puntaX - 2, puntaY + 7);
    vertex(puntaX + 13, puntaY + 8);
    vertex(440, 163);
    endShape(CLOSE);
    stroke(3, 2, 6, 240);
    strokeWeight(2.6);
    line(puntaX - 4, puntaY - 5, puntaX - 21, puntaY - 12 - progreso * 3);
    line(puntaX - 6, puntaY - 2, puntaX - 24, puntaY - 5);
    line(puntaX - 5, puntaY + 2, puntaX - 22, puntaY + 4);
    line(puntaX - 1, puntaY + 5, puntaX - 17, puntaY + 12);
    pop();
}

function dibujarReaccionNivel4(tiempo) {
    if (!respuestaNivel4 || reaccionNivel4Finalizada) return;

    const texto = respuestaNivel4 === "si"
        ? "SABÍA QUE ENCONTRARÍAMOS\nUNA SOLUCIÓN"
        : "TODAVÍA NO ENTENDÉS\nCÓMO FUNCIONA ESTO";
    const alpha = 190 + (sin(frameCount * 0.7) + 1) * 30;
    push();
    textAlign(CENTER, CENTER);
    textLeading(23);
    textSize(20);
    noStroke();
    fill(62, 217, 218, alpha * 0.75);
    text(texto, 253 + sin(frameCount * 1.7) * 3, 43);
    fill(respuestaNivel4 === "si" ? color(239, 183, 235, alpha) : color(245, 124, 158, alpha));
    text(texto, 250 - sin(frameCount * 1.4) * 3, 42);
    pop();
}

function dibujarHabitacion() {

    // PARED DEL FONDO
    noStroke();
    fill(35, 43, 42);
    rect(0, 0, width, 195);

    // Pared lateral izquierda: crea sensación de profundidad.
    fill(25, 33, 33);
    quad(0, 0, 55, 25, 55, 195, 0, 195);

    // Pared lateral derecha.
    fill(22, 29, 30);
    quad(445, 25, 500, 0, 500, 195, 445, 195);

    // Divisiones de la pared.
    stroke(65, 76, 68, 100);
    strokeWeight(1);
    line(55, 25, 445, 25);
    line(55, 25, 55, 195);
    line(445, 25, 445, 195);
    line(250, 25, 250, 195);

    // Zócalo de la habitación.
    noStroke();
    fill(48, 55, 48);
    rect(0, 187, width, 8);

    // PISO
    fill(48, 43, 37);
    quad(0, 195, 500, 195, 500, 240, 0, 240);

    // Separaciones de los tablones.
    stroke(83, 69, 53, 130);
    strokeWeight(1);

    line(0, 207, 500, 207);
    line(0, 224, 500, 224);

    line(75, 195, 75, 207);
    line(190, 195, 190, 207);
    line(320, 195, 320, 207);
    line(430, 195, 430, 207);

    line(135, 207, 135, 224);
    line(280, 207, 280, 224);
    line(410, 207, 410, 224);

    // Borde frontal del piso.
    stroke(100, 79, 59, 150);
    line(0, 239, 500, 239);

    noStroke();
}

function dibujarDetallesAbandono() {
    dibujarManchasPared();
    dibujarGrietas();
    dibujarFotoDeteriorada();
    dibujarCableSuelto();
    dibujarPapelesTirados();
}

function dibujarHabitacionDelOtroLado() {
    const escucho = respuestaActual === "si";
    const respiracion = sin(frameCount * 0.035) * 2;

    // Un velo frío separa esta vista de la habitación que quedó atrás.
    noStroke();
    fill(escucho ? 20 : 63, escucho ? 11 : 29, escucho ? 28 : 58, escucho ? 72 : 34);
    rect(0, 0, width, height);

    // Líneas convergentes y un umbral bajo dan la sensación de haber cruzado
    // al mismo lugar desde un ángulo imposible, sin crear otra habitación.
    stroke(escucho ? 110 : 91, 72, 118, escucho ? 90 : 42);
    strokeWeight(1);
    line(0, 194, 208, 176 + respiracion * 0.2);
    line(500, 194, 292, 176 - respiracion * 0.2);
    line(0, 0, 208, 26);
    line(500, 0, 292, 26);

    if (escucho) {
        // Deterioro estilizado: humedad, grietas y manchas, sin gore.
        noStroke();
        fill(8, 4, 12, 70 + (sin(frameCount * 0.08) + 1) * 16);
        ellipse(190, 88, 130, 48);
        ellipse(382, 109, 92, 62);
        fill(80, 20, 44, 50);
        ellipse(177, 96, 62, 15);
        ellipse(388, 112, 48, 18);
        stroke(10, 5, 13, 170);
        strokeWeight(2);
        line(118, 29, 126, 39);
        line(126, 39, 119, 49);
        line(119, 49, 132, 59);
        line(396, 31, 389, 42);
        line(389, 42, 399, 53);
    } else {
        noStroke();
        fill(120, 106, 132, 16 + (sin(frameCount * 0.03) + 1) * 5);
        rect(0, 0, width, height);
    }
    noStroke();
}

function dibujarManchasPared() {
    const desgaste = min(nivelInterferencia, 6);

    manchasHabitacion.forEach(function (mancha) {
        push();
        translate(mancha.x, mancha.y);
        rotate(mancha.giro);
        noStroke();
        fill(12, 18, 17, 35 + desgaste * 5);
        ellipse(0, 0, mancha.ancho, mancha.alto);
        fill(65, 65, 47, 22 + desgaste * 3);
        ellipse(-3, -1, mancha.ancho * 0.68, mancha.alto * 0.62);
        pop();
    });
}

function dibujarGrietas() {
    const opacidad = 115 + min(nivelInterferencia, 6) * 12;

    stroke(12, 16, 16, opacidad);
    strokeWeight(1.5);
    line(222, 35, 218, 43);
    line(218, 43, 222, 49);
    line(222, 49, 215, 57);
    line(215, 57, 217, 65);
    line(218, 44, 210, 47);
    line(215, 57, 207, 59);

    stroke(90, 91, 77, 45);
    strokeWeight(0.7);
    line(224, 36, 220, 43);
    line(220, 43, 224, 49);
    noStroke();
}

function dibujarFotoDeteriorada() {
    push();
    translate(305, 59);
    rotate(0.07);

    stroke(67, 59, 52, 210);
    strokeWeight(3);
    noFill();
    rect(-13, -17, 26, 34);

    noStroke();
    fill(13, 17, 18, 235);
    rect(-10, -14, 20, 28);
    fill(41, 47, 43, 170);
    ellipse(0, -5, 8, 9);
    ellipse(0, 6, 14, 14);
    fill(9, 12, 13, 170);
    rect(-10, 8, 20, 7);

    // Una esquina rota deja ver el yeso detrás del marco.
    fill(45, 44, 38, 190);
    triangle(7, -14, 10, -14, 10, -9);
    pop();
}

function dibujarCableSuelto() {
    const balanceo = sin(frameCount * 0.025) * 1.2;

    push();
    noFill();
    stroke(9, 11, 12, 230);
    strokeWeight(5);
    beginShape();
    vertex(342, 25);
    bezierVertex(342, 38, 352, 39, 347 + balanceo, 49);
    bezierVertex(344 + balanceo, 55, 336 + balanceo, 53, 339 + balanceo, 62);
    endShape();

    stroke(93, 76, 62, 130);
    strokeWeight(1);
    line(339 + balanceo, 62, 337 + balanceo, 67);
    line(339 + balanceo, 62, 342 + balanceo, 66);
    noStroke();
    pop();
}

function dibujarPapelesTirados() {
    papelesHabitacion.forEach(function (papel) {
        push();
        translate(papel.x, papel.y);
        rotate(papel.giro);
        scale(papel.escala);

        noStroke();
        fill(156, 148, 122, 125);
        beginShape();
        vertex(-13, -7);
        vertex(10, -8);
        vertex(14, 5);
        vertex(-10, 7);
        endShape(CLOSE);

        stroke(55, 51, 44, 100);
        strokeWeight(0.7);
        line(-8, -3, 7, -4);
        line(-7, 0, 8, -1);
        line(-5, 3, 4, 3);
        noStroke();
        pop();
    });
}

function dibujarIluminacion(esComputadora, pulso) {
    const terror = obtenerNivelTerror();
    const ctx = drawingContext;
    const centroX = estadoActual === "nivel6" || estadoActual === "nivel7" ? 125 : estadoActual === "nivel8" ? 51 : esComputadora ? 232 : 107;
    const centroY = estadoActual === "nivel6" || estadoActual === "nivel7" ? 112 : estadoActual === "nivel8" ? 64 : esComputadora ? 114 : 132;
    let radioLuz = estadoActual === "nivel6" || estadoActual === "nivel7" ? 182 : estadoActual === "nivel8" ? 205 : esComputadora ? 150 : 105;
    let brillo = max(0.015, 0.17 + pulso * 0.07 - terror * 0.022);
    if (estadoActual === "nivel6" && nivel6Ruta === "rechazo") brillo *= 0.62;
    if (estadoActual === "nivel7") {
        if (nivel7Fase === "anomalia-respuesta") brillo *= 0.56;
        if (nivel7Fase === "reaccion" && nivel7Respuesta === "silencio") brillo *= 0.64;
        if (nivel7Fase === "final") brillo *= 0.22;
    }
    if (estadoActual === "nivel8" && (nivel8LucesApagandose || nivel8Fase === "anomalia")) brillo *= 0.24;
    if (estadoActual === "nivel4" && respuestaNivel3 === "si") {
        const alivio = reaccionNivel4Finalizada ? min(1, (Date.now() - tiempoFinalNivel4) / 2200) : 0;
        radioLuz *= 0.72 + alivio * 0.08;
        brillo *= 0.48 + alivio * 0.15;
    }

    ctx.save();

    // Halo suave alrededor de la pantalla y sobre la pared cercana.
    let luz = ctx.createRadialGradient(centroX, centroY, 3, centroX, centroY, radioLuz);
    luz.addColorStop(0, `rgba(155, 205, 220, ${brillo})`);
    luz.addColorStop(0.38, `rgba(105, 160, 180, ${brillo * 0.48})`);
    luz.addColorStop(1, "rgba(70, 120, 145, 0)");
    ctx.fillStyle = luz;
    ctx.fillRect(0, 0, width, height);

    // Viñeta: reduce la luz hacia el marco para concentrar la mirada.
    const radioVigneta = 290 - terror * 17;
    const vigneta = ctx.createRadialGradient(250, 112, 35, 250, 112, radioVigneta);
    vigneta.addColorStop(0, "rgba(0, 0, 0, 0)");
    vigneta.addColorStop(0.48, "rgba(0, 0, 0, 0.12)");
    vigneta.addColorStop(0.78, "rgba(0, 0, 0, 0.48)");
    vigneta.addColorStop(1, "rgba(0, 0, 0, 0.78)");
    ctx.fillStyle = vigneta;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
}

function dibujarCierreHabitacion(terror) {
    if (terror < 1) return;

    const ctx = drawingContext;
    const ancho = 12 + terror * 7;
    const oscuridad = 0.38 + terror * 0.055;
    ctx.save();

    let borde = ctx.createLinearGradient(0, 0, ancho, 0);
    borde.addColorStop(0, `rgba(0, 0, 0, ${oscuridad})`);
    borde.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = borde;
    ctx.fillRect(0, 0, ancho, height);

    borde = ctx.createLinearGradient(width, 0, width - ancho, 0);
    borde.addColorStop(0, `rgba(0, 0, 0, ${oscuridad})`);
    borde.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = borde;
    ctx.fillRect(width - ancho, 0, ancho, height);

    borde = ctx.createLinearGradient(0, 0, 0, ancho * 0.55);
    borde.addColorStop(0, `rgba(0, 0, 0, ${oscuridad * 0.75})`);
    borde.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = borde;
    ctx.fillRect(0, 0, width, ancho * 0.55);

    ctx.restore();
}

// Comparte con CSS el estado y cuánto se ha intensificado la presencia.
function actualizarAmbienteInterfaz() {
    if (document.body.dataset.estado !== estadoActual) {
        document.body.dataset.estado = estadoActual;
    }

    const nivelTerror = obtenerNivelTerror();
    if (document.body.dataset.terror !== String(nivelTerror)) {
        document.body.dataset.terror = String(nivelTerror);
        document.body.style.setProperty("--presencia-terror", (nivelTerror * 0.025).toFixed(3));
        document.body.style.setProperty("--ritmo-terror", Math.max(0.8, 2.8 - nivelTerror * 0.16).toFixed(2) + "s");
    }

    const accionesObservadas = comportamiento.demoras + comportamiento.presiones +
        comportamiento.cambiosRespuesta + comportamiento.intentosSalida +
        comportamiento.mensajesIgnorados + comportamiento.respuestasRapidas +
        intentosCodigoFallidos;
    const intensidad = Math.min(6, Math.max(nivelInterferencia, clicksFueraDeLugar, accionesObservadas));
    const nivelVisible = intensidad > 0 ? String(intensidad) : "";

    if (nivelVisible && document.body.dataset.interferencia !== nivelVisible) {
        document.body.dataset.interferencia = nivelVisible;
    } else if (!nivelVisible && document.body.hasAttribute("data-interferencia")) {
        delete document.body.dataset.interferencia;
    }
}

function obtenerNivelTerror() {
    return Math.min(12, Math.max(0, intentosCodigoFallidos - 2));
}


function crearParticulaRara() {
    const terror = obtenerNivelTerror();
    particulasRaras.push({
        x: random(25, width - 25),
        y: random(35, height - 35),
        tamano: random(12, 27) + terror * 0.7,
        velocidad: random(0.25, 0.8) * (1 + terror * 0.14),
        fase: random(TWO_PI),
        vida: 0,
        vidaMaxima: random(110, 220)
    });

    if (particulasRaras.length > 18) particulasRaras.shift();
}

function dibujarParticulasRaras(terror) {
    noStroke();
    for (let i = particulasRaras.length - 1; i >= 0; i--) {
        const sombra = particulasRaras[i];
        sombra.x += sin(frameCount * (0.035 + terror * 0.018) + sombra.fase) * terror * 0.12;
        sombra.y -= sombra.velocidad * (1 + terror * 0.16);
        sombra.vida += 1;
        const desvanecer = min(1, (sombra.vidaMaxima - sombra.vida) / 35);
        const opacidad = min(220, (75 + (sin(frameCount * (0.06 + terror * 0.025) + sombra.fase) + 1) * 45 + terror * 7) * max(0, desvanecer));

        push();
        translate(sombra.x, sombra.y);
        rotate(sin(frameCount * (0.035 + terror * 0.022) + sombra.fase) * (0.12 + terror * 0.035));
        scale(sombra.tamano / 20);
        noStroke();
        fill(5, 3, 9, opacidad);
        beginShape();
        vertex(-7, -8);
        vertex(-4, -13);
        vertex(-1, -9);
        vertex(3, -14);
        vertex(5, -8);
        vertex(8, -5);
        vertex(6, 2);
        vertex(9, 9);
        vertex(3, 7);
        vertex(0, 13);
        vertex(-3, 7);
        vertex(-9, 10);
        vertex(-6, 2);
        endShape(CLOSE);
        fill(215, 198, 219, opacidad * 0.9);
        ellipse(-3, -3, 2, 4);
        ellipse(4, -4, 1.5, 3);
        pop();

        if (sombra.vida >= sombra.vidaMaxima || sombra.y < -20) particulasRaras.splice(i, 1);
    }
}

function dibujarEntidadSombra(visible) {
    const terror = obtenerNivelTerror();
    const fuerza = map(visible, 0.23, 1, 0, 1);
    const opacidad = min(230, 25 + fuerza * 155 + terror * 7);
    const frecuencia = 0.045 + terror * 0.022;
    const balanceo = sin(frameCount * frecuencia) * (2.5 + terror * 1.2);
    const tiron = sin(frameCount * (0.17 + terror * 0.06)) * terror * 0.35;

    push();
    translate(330 + balanceo + tiron, 147 + sin(frameCount * (0.03 + terror * 0.02)) * (1.5 + terror * 0.55));
    scale(1 + sin(frameCount * (0.035 + terror * 0.02)) * terror * 0.006);

    // Halo oscuro y brazos largos, detrás del cuerpo.
    noStroke();
    fill(92, 58, 112, opacidad * 0.2);
    ellipse(0, -16, 54, 82);
    stroke(8, 6, 12, opacidad);
    strokeWeight(7);
    line(-9, -25, -20, -12);
    line(-20, -12, -27, 5);
    line(9, -25, 21, -12);
    line(21, -12, 28, 6);

    // Manos desparejas, como raíces que intentan apoyarse en el suelo.
    strokeWeight(1.5);
    line(-27, 5, -33, 10);
    line(-27, 5, -27, 14);
    line(-27, 5, -21, 11);
    line(28, 6, 34, 10);
    line(28, 6, 28, 15);
    line(28, 6, 22, 11);

    // Torso angosto y desgarrado.
    noStroke();
    fill(5, 3, 9, opacidad);
    beginShape();
    vertex(-11, -29);
    vertex(-15, -20);
    vertex(-10, -10);
    vertex(-17, 1);
    vertex(-9, 3);
    vertex(-8, 18);
    vertex(-2, 11);
    vertex(1, 25);
    vertex(7, 12);
    vertex(13, 21);
    vertex(14, 3);
    vertex(18, -4);
    vertex(11, -15);
    vertex(13, -24);
    vertex(7, -31);
    endShape(CLOSE);

    // Capucha puntiaguda y rostro casi vacío.
    beginShape();
    vertex(-12, -31);
    vertex(-15, -43);
    vertex(-10, -51);
    vertex(-12, -59);
    vertex(-4, -55);
    vertex(1, -65);
    vertex(6, -55);
    vertex(14, -59);
    vertex(11, -49);
    vertex(16, -42);
    vertex(10, -31);
    endShape(CLOSE);

    fill(1, 1, 3, opacidad);
    ellipse(1, -43, 18, 16);
    fill(213, 190, 222, opacidad * 0.85);
    ellipse(-4, -44, 2.5, 5);
    ellipse(5, -42, 2, 4);
    stroke(161, 113, 161, opacidad * 0.75);
    strokeWeight(1.2);
    line(-4, -35, 0, -32);
    line(0, -32, 5, -35);

    pop();
}

function dibujarInterferenciaCanvas(pulso) {
    const terror = obtenerNivelTerror();
    const clicksInquietantes = max(clicksFueraDeLugar, intentosPuerta + intentosCodigoFallidos);
    if (clicksInquietantes < 2) return;

    // Cada intento insistente suma líneas y hace más visible la interferencia.
    const cantidadLineas = min(16, max(clicksInquietantes - 1, terror * 2));
    for (let i = 0; i < cantidadLineas; i++) {
        const y = (frameCount * (0.45 + i * 0.04 + terror * 0.055) + i * 37) % height;
        stroke(217, 135, 226, min(220, 35 + pulso * 25 + clicksInquietantes * 3 + terror * 12));
        line(0, y, width, y);
    }

    if (clicksInquietantes >= 3) {
        noStroke();
        fill(238, 185, 224, min(190, 85 + pulso * 65 + clicksInquietantes * 4));
        textAlign(CENTER);
        textSize(10);
        const frases = ["NO ERA ESA PARTE", "TE VI", "VOLVÉ A MIRAR"];
        text(frases[(clicksInquietantes - 3) % frases.length], 250, 42 + sin(frameCount * 0.035) * 8);
    }
}

function dibujarApagonRapido() {
    const terror = obtenerNivelTerror();
    if (terror < 1) return;

    const intervalo = max(16, 64 - terror * 6);
    const duracion = min(6, terror);
    if (frameCount % intervalo >= duracion) return;

    push();
    noStroke();
    fill(0, 0, 0, 205);
    rect(0, 0, width, height);
    pop();
}

function dibujarComputadora(enfocada, pulso) {
    const estaEnNivel6 = estadoActual === "nivel6";
    const estaEnNivel7 = estadoActual === "nivel7";
    const estaEnNivel8 = estadoActual === "nivel8";
    const x = estaEnNivel8 ? 20 : estaEnNivel6 || estaEnNivel7 ? 74 : enfocada ? 175 : 65;
    const y = estaEnNivel8 ? 42 : estaEnNivel6 || estaEnNivel7 ? 79 : enfocada ? 74 : 110;
    const escala = estaEnNivel8 ? 0.66 : estaEnNivel6 || estaEnNivel7 ? 1.38 : enfocada ? 1.45 : 1;
    const intentos = min(intentosPuerta + intentosCodigoFallidos, 10);
    const sacudida = intentos >= 4
        ? sin(frameCount * 1.4) * min(2.5, (intentos - 3) * 0.35)
        : 0;

    push();
    translate(x + sacudida, y);
    scale(escala);
    noStroke();
    fill(65, 48, 76);
    rect(0, 0, 85, 55);

    if (enfocada) {
        const colorPantalla = comportamiento.demoras > 0 ? 155 : comportamiento.respuestasRapidas > 0 ? 205 : respuestaActual === "no" ? 185 : 112;
        fill(colorPantalla + pulso * 35, respuestaActual === "no" ? 105 : 184, respuestaActual === "no" ? 150 : 170, 225);
        rect(10, 10, 65, 35);
        fill(9, 17, 18);
        textAlign(CENTER, CENTER);
        textSize(13);
        text(pistaEntregada ? codigoPista.textContent : "LOCKED", 42, 27);
    } else if (estadoActual === "nivel6") {
        const apagada = nivel6Fase === "final" || nivel6Fase === "cierre";
        fill(apagada ? color(25, 22, 28) : nivel6Fase === "control-no" ? color(194, 133, 153) : color(113 + pulso * 25, 172, 148));
        rect(10, 10, 65, 35);
        if (!apagada) {
            fill(5, 12, 12);
            textAlign(CENTER, CENTER);
            textLeading(8);
            textSize(6.4);
            const mensajePantalla = nivel6Fase === "pregunta" ? "¿ESTÁS ELIGIENDO?"
                : nivel6Fase === "control-si" ? "NUNCA DIJE LO CONTRARIO"
                    : nivel6Fase === "control-no" && Date.now() - nivel6RespuestaMs >= 1800 ? "ENTONCES, ¿POR QUÉ?"
                        : nivel6Fase === "control-no" ? ""
                        : "SESIÓN OBSERVADA";
            text(mensajePantalla, 42, 27);
            if (nivel6Fase === "mensajes" && frameCount % 130 < 2) {
                stroke(224, 233, 229, 140);
                line(11, 25, 74, 25);
                noStroke();
            }
            if (nivel6Fase === "mensajes" && frameCount % 181 < 3) {
                fill(5, 12, 12);
                textSize(6.4);
                text("SESI_N OBSERVADA", 42, 27);
            }
        }
    } else if (estaEnNivel7) {
        const apagada = nivel7Fase === "final" || nivel7Fase === "cierre-final";
        fill(apagada ? color(18, 16, 21) : nivel7Fase === "anomalia-respuesta" ? color(191, 134, 159) : color(111 + pulso * 20, 166, 148));
        rect(10, 10, 65, 35);
        if (!apagada) {
            fill(5, 12, 12); textAlign(CENTER, CENTER); textLeading(7); textSize(5.2);
            const estadoPantalla = nivel7Fase === "consentimiento" ? "COMPROBANDO\nPRESENCIA"
                : nivel7Fase === "prueba-presencia" ? "¿HAY ALGUIEN\nAHÍ?"
                    : nivel7Fase === "anomalia-respuesta" ? "YO NO FUI."
                        : nivel7Fase === "pregunta" ? "¿QUÉ DIRÍAS?"
                            : nivel7Fase === "cierre" ? "HAY ALGO\nMÁS ACÁ"
                                : nivel7Fase === "reaccion" ? "TE ESTOY\nESCUCHANDO"
                                    : nivel7Fase === "vigilancia" ? "SESIÓN\nABIERTA" : "";
            text(estadoPantalla, 42, 27);
            if ((nivel7Fase === "vigilancia" || nivel7Fase === "anomalia-respuesta") && frameCount % 81 < 3) {
                stroke(230, 218, 237, 150); line(11, 25, 74, 25); noStroke();
            }
        }
    } else if (estaEnNivel8) {
        const apagada = nivel8Fase === "final";
        fill(apagada ? color(20, 18, 22) : nivel8Fase === "anomalia" ? color(181, 125, 148) : color(105 + pulso * 22, 158, 139));
        rect(10, 10, 65, 35);
        if (!apagada) {
            fill(4, 12, 10); textAlign(CENTER, CENTER); textLeading(7); textSize(5.2);
        const texto = nivel8Fase === "anomalia" ? "NO ESCUCHASTE\nNADA"
                : nivel8Fase === "regreso" ? "LISTO PARA VERLAS"
                : nivel8Fase === "final" ? "CINCO\nPOSIBILIDADES"
                    : nivel8Respuesta === "buscar" ? "NO SOS EL\nPRIMERO"
                        : nivel8Respuesta === "salir" ? "NO MIRES A\nLOS COSTADOS"
                            : nivel8Respuesta === "dudar" ? "A VECES ES\nMEJOR NO SABER"
                                : nivel8Fase === "pregunta" ? "¿HAY ALGUIEN?"
                                    : "NO HAY NADIE";
            text(texto, 42, 27);
        }
    } else if (estadoActual === "nivel5") {
        const brillante = faseNivel5 === "fragmentos" || faseNivel5 === "pregunta1" || faseNivel5 === "reaccion1" || faseNivel5 === "pregunta2";
        fill(brillante ? color(118, 177, 153) : color(55, 54, 66));
        rect(10, 10, 65, 35);
        fill(7, 16, 15);
        textAlign(CENTER, CENTER);
        textLeading(6);
        textSize(5.2);
        const textoRecuerdo = faseNivel5 === "fragmentos"
            ? "ARCHIVO DE\nRECUERDOS\nREPRODUCIENDO"
            : faseNivel5 === "pregunta1"
                ? "¿ESTÁS SEGURO\nDE RECORDAR?"
                : faseNivel5 === "pregunta2"
                    ? "¿BORRARÍAS\nUN RECUERDO?"
                    : faseNivel5 === "final"
                        ? "MEMORIA\nGUARDADA"
                        : "NO HAY\nREGISTRO";
        text(textoRecuerdo, 42, 27);
    } else if (estadoActual === "nivel4" && mensajeComputadoraNivel4) {
        fill(respuestaNivel4 === "si" ? color(121, 197, 158) : color(189, 157, 196));
        rect(10, 10, 65, 35);
        fill(7, 16, 15);
        textAlign(CENTER, CENTER);
        textLeading(6);
        textSize(5.2);
        let textoPantalla;
        if (!reaccionNivel4Finalizada && respuestaNivel4 === "si") {
            textoPantalla = "SABÍA QUE\nACEPTARÍAS\nPERDER ALGO";
        } else if (!reaccionNivel4Finalizada && respuestaNivel4 === "no") {
            textoPantalla = "MANTUVISTE\nTUS LÍMITES.\nBUSCARÉ OTRA VÍA";
        } else {
            textoPantalla = mensajeComputadoraNivel4.indexOf("NO TODOS LOS") === 0
                ? "NO TODOS LOS\nCAMINOS LLEVAN\nA DONDE QUERÉS"
                : mensajeComputadoraNivel4.indexOf("TE GUSTA BUSCAR") === 0
                    ? "TE GUSTA BUSCAR\nRESPUESTAS, ¿NO?"
                    : "A VECES ES MEJOR\nNO HACER\nPREGUNTAS";
        }
        text(textoPantalla, 42, 27);
    } else if (estadoActual === "nivel3" && mensajeFinalNivel3) {
        fill(respuestaNivel3 === "si" ? color(91, 202, 164) : color(191, 154, 198));
        rect(10, 10, 65, 35);
        fill(7, 16, 15);
        textAlign(CENTER, CENTER);
        textLeading(6);
        textSize(5.3);
        const mensajeCorto = sombraPuertaTocada
            ? "ENCONTRASTE LO\nESCONDIDO.\nTAMBIÉN VISTE ESO."
            : respuestaNivel3 === "si"
                ? "ENCONTRASTE LO\nQUE ESTABA\nESCONDIDO. SALIDA →"
                : "ENCONTRASTE LO\nQUE ESTABA\nESCONDIDO.";
        text(mensajeCorto, 42, 27);
    } else {
        fill(145, 90, 170);
        rect(10, 10, 65, 35);
        fill(210, 165, 235, 100);
        rect(15, 15, 55, 25);
    }
    fill(52, 40, 62);
    rect(30, 55, 25, 9);
    pop();
}

function dibujarPuerta(abierta, rechazo, pulso) {
    if (abierta) {
        noStroke();
        fill(3, 3, 7, 245);
        rect(365, 75, 75, 108);
        fill(99, 59, 124, 28 + pulso * 24);
        triangle(368, 77, 438, 77, 438, 181);

        push();
        translate(367, 76);
        rotate(-0.48);
        fill(39, 29, 45);
        stroke(135, 85, 150);
        strokeWeight(2);
        rect(0, 0, 68, 105);
        noStroke();
        fill(195, 155, 210);
        circle(56, 54, 5);
        pop();

        noFill();
        stroke(135, 85, 150);
        strokeWeight(2);
        rect(365, 75, 75, 108);
        noStroke();
        return;
    }

    const intentos = min(intentosPuerta + intentosCodigoFallidos, 10);
    const golpeReciente = estadoActual === "nivel3" && golpeNivel3Reproducido && Date.now() - tiempoGolpeNivel3 < 420;
    const amplitudBase = rechazo ? 2 + intentos * 0.35 : intentos >= 4 ? (intentos - 3) * 0.3 : 0;
    const amplitud = golpeReciente ? max(amplitudBase, 4) : amplitudBase;
    const temblor = amplitud > 0 ? sin(frameCount * (0.9 + intentos * 0.08)) * amplitud : 0;
    push();
    translate(temblor, 0);
    fill(rechazo ? 83 + pulso * 20 : 48, 33, 58);
    rect(365, 75, 75, 108);
    stroke(rechazo ? color(210, 95, 170) : color(135, 85, 150));
    noFill();
    rect(365, 75, 75, 108);
    noStroke();
    fill(195, 155, 210);
    circle(425, 130, 6);
    pop();
}

function dibujarPersonaje(enfocado, interferencia, opciones = {}) {
    const x = opciones.x ?? (enfocado ? 270 : 250);
    const terror = obtenerNivelTerror();
    const frecuencia = 0.045 + terror * 0.07;
    const quieto = opciones.quieto === true;
    const sacudida = sin(frameCount * frecuencia) * terror * 0.32 +
        cos(frameCount * frecuencia * 1.7) * terror * 0.16;
    const balanceo = quieto ? 0 : sin(frameCount * 0.045) * (interferencia ? 1.5 : 0.45) + sacudida;
    const parpadeo = (sin(frameCount * (0.12 + terror * 0.18)) + 1) / 2;

    push();
    const desfasado = opciones.alterado ? sin(frameCount * 0.19) * 3 : 0;
    translate(x + balanceo, (opciones.yOffset || 0) + desfasado + (terror > 0 ? sin(frameCount * frecuencia * 1.3) * terror * 0.18 : 0));
    if (opciones.giro) rotate(opciones.giro);
    if (opciones.escala) scale(opciones.escala);
    if (opciones.alterado) rotate(0.10 + sin(frameCount * 0.19) * 0.035);

    // Sombra de contacto para que la figura parezca apoyada en el piso.
    noStroke();
    fill(0, 0, 0, 110);
    ellipse(0, 186, 31, 7);

    // Piernas largas y finas bajo el abrigo.
    stroke(16, 15, 21, 235);
    strokeWeight(5);
    line(-5, 160, -8, 181);
    line(5, 160, 8, 181);
    strokeWeight(2);
    line(-8, 181, -13, 183);
    line(8, 181, 13, 183);

    // Abrigo irregular con hombros demasiado altos.
    noStroke();
    fill(opciones.alterado ? 22 : interferencia ? 31 : 39, opciones.alterado ? 19 : 32, opciones.alterado ? 31 : 43, 250);
    beginShape();
    vertex(-7, 119);
    vertex(-13, 126);
    vertex(-10, 139);
    vertex(-15, 160);
    vertex(-7, 156);
    vertex(0, 163);
    vertex(6, 156);
    vertex(14, 161);
    vertex(10, 139);
    vertex(13, 126);
    vertex(6, 119);
    endShape(CLOSE);

    // Capucha grande, cara oscura y ojos pequeños que aparecen con la interferencia.
    fill(24, 22, 31, 255);
    beginShape();
    vertex(-10, 126);
    vertex(-13, 111);
    vertex(-9, 99);
    vertex(-3, 96);
    vertex(2, 99);
    vertex(9, 97);
    vertex(13, 109);
    vertex(10, 125);
    vertex(0, 132);
    endShape(CLOSE);

    fill(5, 5, 9, 245);
    ellipse(0, 114, 17, 20);
    fill(opciones.alterado ? 237 : 203, opciones.alterado ? 72 : 179, opciones.alterado ? 95 : 214,
        opciones.alterado ? 175 + parpadeo * 65 : interferencia ? 90 + parpadeo * 115 : 65);
    ellipse(opciones.alterado ? -5 : -4, 112 + (opciones.desfase || 0) * 0.08, opciones.alterado ? 4 : 2.5, opciones.alterado ? 6 : 4);
    ellipse(4, 113 - (opciones.desfase || 0) * 0.08, opciones.alterado ? 3.5 : 2, opciones.alterado ? 5 : 3);

    // Brazos desiguales y dedos angulosos.
    stroke(28, 25, 36, 245);
    strokeWeight(5);
    if (!opciones.brazoAusente) {
        line(-9, 128, -15, 145);
        line(-15, 145, -13, 157);
    }
    line(9, 128, 16, 144);
    line(16, 144, 19, 158);
    strokeWeight(1.4);
    if (!opciones.brazoAusente) {
        line(-13, 157, -17, 162);
        line(-13, 157, -12, 164);
    }
    line(19, 158, 22, 163);
    line(19, 158, 16, 164);

    if (opciones.alterado) {
        // Manchas oscuras en manos y mangas para una silueta perturbadora,
        // manteniendo el diseño abstracto y sin detalle gráfico.
        noStroke();
        fill(74, 18, 34, 205);
        ellipse(-14, 155, 8, 11);
        ellipse(19, 158, 7, 10);
        fill(9, 5, 12, 210);
        ellipse(-8, 137, 5, 13);
        ellipse(10, 145, 4, 11);
    }

    pop();
}

function dibujarIndicaciones() {
    const enNivel2 = estadoActual === "nivel2";
    const enNivel3 = estadoActual === "nivel3";
    const enNivel4 = estadoActual === "nivel4";
    const enNivel6 = estadoActual === "nivel6";
    const enNivel7 = estadoActual === "nivel7";
    const enNivel8 = estadoActual === "nivel8";
    const enNivel9 = estadoActual === "nivel9";
    const enNivel10 = estadoActual === "nivel10";
    const enHabitacion = estadoActual === "habitacion" || estadoActual === "puerta" || enNivel2;
    const sobreComputadora = !enNivel2 && (enHabitacion
        ? mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178
        : mouseX > 170 && mouseX < 305 && mouseY > 68 && mouseY < 165);
    const sobrePuerta = mouseX > 360 && mouseX < 445 && mouseY > 70 && mouseY < 190;
    const sobreNota = mouseX >= 113 && mouseX <= 149 && mouseY >= 196 && mouseY <= 222;
    if (enNivel8) {
        const sobreComputadora8 = mouseX >= 16 && mouseX <= 77 && mouseY >= 39 && mouseY <= 81;
        const puertaLateral = mouseY > 75 && mouseY < 211 && (mouseX < 66 || mouseX > 435);
        const puertaFondo = mouseX > 210 && mouseX < 290 && mouseY > 65 && mouseY < 135;
        const sobrePuerta8 = puertaLateral || puertaFondo;
        const sobrePista8 = mouseY > 190 && mouseX < 95;
        cursor(sobreComputadora8 || sobrePuerta8 || sobrePista8 ? HAND : ARROW);
        textAlign(CENTER); textSize(9); noStroke(); fill(205, 165, 220, 205);
        text(nivel8Fase === "final" ? "TOCÁ LA PUERTA PARA AVANZAR" : sobrePista8 ? "LEER MENSAJE" : sobrePuerta8 ? "OBSERVAR ESTA PUERTA" : "EL PASILLO NO TERMINA", 250, 231);
        return;
    }
    if (enNivel9) {
        const sobreComp9 = mouseX >= 220 && mouseX <= 275 && mouseY >= 101 && mouseY <= 143;
        const sobreCarpeta9 = mouseX >= 15 && mouseX <= 82 && mouseY >= 80 && mouseY <= 181;
        const sobreHoja9 = mouseX >= 174 && mouseX <= 211 && mouseY >= 144 && mouseY <= 170;
        const sobrePapelSuelo9 = mouseX >= 82 && mouseX <= 121 && mouseY >= 205 && mouseY <= 233;
        const sobrePromesa9 = mouseX >= 400 && mouseX <= 442 && mouseY >= 215 && mouseY <= 237;
        const sobreSilla9 = mouseX >= 352 && mouseX <= 400 && mouseY >= 135 && mouseY <= 197;
        const sobrePuerta9 = mouseX >= 210 && mouseX <= 290 && mouseY >= 54 && mouseY <= 100;
        const interactuable9 = sobreComp9 || sobreCarpeta9 || sobreHoja9 || sobrePapelSuelo9 || sobrePromesa9 || sobreSilla9 || sobrePuerta9;
        cursor(interactuable9 ? HAND : ARROW);
        textAlign(CENTER); textSize(9); noStroke(); fill(215, 188, 202, 220);
        const pista = sobreComp9 ? "REVISAR COMPUTADORA" : sobreCarpeta9 ? "ABRIR ARCHIVADOR" : sobreHoja9 ? "LEER HOJA" : sobrePapelSuelo9 ? "LEER PAPEL INCOMPLETO" : sobrePromesa9 ? "LEER PROMESA" : sobreSilla9 ? "EXAMINAR SILLA" : sobrePuerta9 ? "PROBAR LA PUERTA" : "BUSCÁ LOS RASTROS DE QUIENES ESTUVIERON ANTES";
        text(pista, 250, 231);
        return;
    }
    if (enNivel10) {
        const equipoBajoCursor = nivel10Fase === "exploracion" ? equipoNivel10BajoCursor(mouseX, mouseY) : null;
        const pistaBajoCursor = nivel10Fase === "exploracion" ? pistaNivel10BajoCursor(mouseX, mouseY) : 0;
        cursor(equipoBajoCursor || pistaBajoCursor ? HAND : ARROW);
        textAlign(CENTER); textSize(9); noStroke(); fill(203, 184, 207, 205);
        text(nivel10Fase === "transicion" ? "ESPERÁ" : nivel10Fase === "encendido" ? "LA LUZ ESTÁ VOLVIENDO" : nivel10Fase === "terminal" ? "LA PANTALLA TE DEVUELVE LA MIRADA" : pistaBajoCursor ? "LEER INSCRIPCIÓN" : equipoBajoCursor ? "REVISAR ESTA COMPUTADORA" : "CINCO PANTALLAS. NINGUNA EXPLICA POR QUÉ.", 250, 231);
        return;
    }
    if (enNivel7) {
        const sobreComp7 = mouseX >= 54 && mouseX <= 198 && mouseY >= 70 && mouseY <= 162;
        const sobrePuerta7 = mouseX >= 400 && mouseX <= 480 && mouseY >= 65 && mouseY <= 190;
        const sobreFigura7 = mouseX >= 448 && mouseX <= 499 && mouseY >= 105 && mouseY <= 203;
        cursor(sobreComp7 || sobrePuerta7 || sobreFigura7 ? HAND : ARROW);
        textAlign(CENTER); textSize(9); noStroke(); fill(205, 165, 220, 205);
        text(nivel7Finalizada ? "TOCÁ LA PUERTA PARA AVANZAR" : sobreFigura7 ? "¿HAY ALGUIEN AHÍ?" : "LA HABITACIÓN ESTÁ ESCUCHANDO", 250, 231);
        return;
    }
    if (enNivel6) {
        const sobreComp6 = mouseX >= 55 && mouseX <= 205 && mouseY >= 70 && mouseY <= 165;
        const sobrePuerta6 = mouseX >= 402 && mouseX <= 480 && mouseY >= 65 && mouseY <= 190;
        const sobreFigura6 = mouseX >= 458 && mouseX <= 499 && mouseY >= 100 && mouseY <= 205;
        cursor(sobreComp6 || sobrePuerta6 || sobreFigura6 ? HAND : ARROW);
        textAlign(CENTER);
        textSize(10);
        noStroke();
        fill(205, 165, 220, 205);
        text(nivel6Fase === "final" ? "TOCÁ LA PUERTA PARA AVANZAR" : sobreFigura6 ? "¿HAY ALGO AHÍ?" : "EL CURSOR NO SIEMPRE TE OBEDECE", 250, 231);
        return;
    }
    if (enNivel4) {
        const sobreInscripcion = mouseX >= 372 && mouseX <= 435 && mouseY >= 88 && mouseY <= 150;
        const sobreMarcas = ((mouseX >= 348 && mouseX <= 367) || (mouseX >= 439 && mouseX <= 458)) && mouseY >= 84 && mouseY <= 185;
        const sobreComputadoraNivel4 = mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178;
        cursor(sobreInscripcion || sobreMarcas || sobreComputadoraNivel4 || sobrePuerta ? HAND : ARROW);
        textAlign(CENTER);
        textSize(10);
        noStroke();
        fill(205, 165, 220, 205);
        if (sobreInscripcion) text("LEER INSCRIPCIÓN", 402, 207);
        else if (sobreMarcas) text("MIRAR LAS MARCAS", 402, 207);
        else text(respuestaNivel4 ? "LA COMPUTADORA SIGUE OBSERVANDO" : "ELEGÍ QUÉ ESTÁS DISPUESTO A PERDER", 250, 231);
        return;
    }
    if (estadoActual === "nivel5") {
        const sobreSombra = mouseX >= 248 && mouseX <= 302 && mouseY >= 78 && mouseY <= 185;
        const sobreComputadora5 = mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178;
        cursor(sobreSombra || sobreComputadora5 || sobrePuerta ? HAND : ARROW);
        textAlign(CENTER);
        textSize(10);
        noStroke();
        fill(205, 165, 220, 205);
        text(faseNivel5 === "final" ? "TOCÁ LA PUERTA PARA AVANZAR" : sobreSombra ? "OBSERVAR LA SOMBRA" : "REVISAR LOS RECUERDOS", 250, 231);
        return;
    }
    if (enNivel3) {
        const sobreComputadoraNivel3 = respuestaNivel3 === "si" && mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178;
        const puertaInteractiva = respuestaNivel3 === "no" && sobrePuerta || !respuestaNivel3 && sobrePuerta;
        cursor((!notaEncontrada && sobreNota) || sobreComputadoraNivel3 || puertaInteractiva ? HAND : ARROW);
        textAlign(CENTER);
        textSize(10);
        noStroke();
        fill(sobreNota && !notaEncontrada ? color(236, 215, 242) : color(205, 165, 220, 190));
        if (!notaEncontrada) text(sobreNota ? "REVISAR NOTA" : "HAY ALGO ESCONDIDO", sobreNota ? 131 : 250, 231);
        else if (!respuestaNivel3) text("LEÉ LA NOTA", 250, 231);
        else if (respuestaNivel3 === "si") text("REVISÁ LA COMPUTADORA", 250, 231);
        else text(sombraPuertaVisible ? "TOCÁ LA SOMBRA O AVANZÁ" : "TOCÁ LA PUERTA PARA AVANZAR", 250, 231);
        return;
    }
    if (estadoActual === "nivel4") return;
    if (!enHabitacion && estadoActual !== "computadora") return;
    cursor(sobreComputadora || sobrePuerta ? HAND : ARROW);

    textAlign(CENTER);
    textSize(10);
    noStroke();
    fill(205, 165, 220, 210);
    if (enNivel2) {
        text(respuestaNivel2 ? "TOCÁ LA PUERTA PARA AVANZAR" : "RESPONDÉ LA PREGUNTA", 250, 207);
    } else {
        text(enHabitacion ? "TOCÁ LA COMPUTADORA" : "TOCÁ PARA REVISAR", enHabitacion ? 108 : 236, enHabitacion ? 181 : 174);
        text("TOCÁ LA PUERTA", 402, 207);
    }
}

function dibujarTextoEstado(pulso) {
    textAlign(CENTER);
    noStroke();
    textSize(11);

    if (estadoActual === "menu") {
        fill(205, 165, 220);
        text("WAITING FOR PLAYER...", 250, 229);
    } else if (estadoActual === "computadora") {
        fill(comportamiento.demoras > 0 ? color(240, 150, 190) : color(151 + pulso * 60, 215, 190));
        if (comportamiento.demoras > 0 && estadoPregunta === "esperando") {
            text("¿SEGUÍS AHÍ?", 250, 229);
        } else if (comportamiento.presiones > 0) {
            text("YA TE ESCUCHÉ", 250, 229);
        } else if (comportamiento.respuestasRapidas > 0) {
            text("RESPUESTA RECIBIDA", 250, 229);
        } else if (respuestaActual === "si") {
            text("EL SISTEMA TAMBIÉN LO ESCUCHÓ", 250, 229);
        } else if (respuestaActual === "no") {
            text("EL SENSOR DICE OTRA COSA", 250, 229);
        } else {
            text("CONNECTION ESTABLISHED", 250, 229);
        }
    } else if (estadoActual === "nivel2") {
        fill(respuestaNivel2 === "no" ? color(185, 145, 195) : color(151 + pulso * 40, 215, 190));
        text(respuestaNivel2 ? "LA PUERTA SIGUE DISPONIBLE" : "LA HABITACIÓN ESPERA TU RESPUESTA", 250, 229);
    } else if (estadoActual === "nivel3") {
        fill(195, 153, 207);
        text(notaEncontrada ? "LA NOTA CAMBIÓ ALGO" : "BUSCÁ ENTRE LOS OBJETOS", 250, 229);
    } else if (estadoActual === "nivel4") {
        fill(respuestaNivel4 ? color(205, 165, 220) : color(225, 196, 230));
        text(respuestaNivel4 ? "DECISIÓN REGISTRADA" : "¿QUÉ ESTÁS DISPUESTO A PERDER?", 250, 229);
    } else if (estadoActual === "nivel5") {
        fill(195, 153, 207);
        text("LEVEL 05 — ¿QUÉ RECORDÁS?", 250, 229);
    } else if (estadoActual === "nivel6") {
        fill(195, 153, 207);
        text("LEVEL 06 — MÁS ALLÁ DE TUS RECUERDOS", 250, 229);
    } else if (estadoActual === "nivel8") {
        fill(nivel8Fase === "anomalia" ? color(226, 162, 187) : color(195, 153, 207));
        text(nivel8Fase === "final" ? "UNA SALIDA. CINCO POSIBILIDADES." : "LEVEL 08 — DETRÁS DE LAS PAREDES", 250, 229);
    } else if (estadoActual === "nivel9") {
        fill(195, 153, 207);
        text("LEVEL 09 — LOS QUE INTENTARON SALIR", 250, 229);
    } else if (estadoActual === "nivel10") {
        fill(195, 153, 207);
        text(nivel10Fase === "transicion" ? "" : "LEVEL 10 — LA ÚLTIMA ELECCIÓN", 250, 229);
    } else if (estadoActual === "nivel7") {
        fill(nivel7Fase === "anomalia-respuesta" ? color(224, 162, 189) : color(195, 153, 207));
        text(nivel7Fase === "final" ? "LA PANTALLA QUEDÓ VACÍA" : "LEVEL 07 — ¿HAY ALGUIEN AHÍ?", 250, 229);
    } else if (estadoActual === "puertaAbierta") {
        fill(151 + pulso * 40, 215, 190);
        text("ACCESS GRANTED", 250, 229);
    } else if (estadoActual === "puerta") {
        fill(225, 125 + pulso * 45, 180);
        text(comportamiento.intentosSalida > 0 ? "¿A DÓNDE PENSÁS IR?" : "ACCESO DENEGADO", 250, 229);
    } else if (comportamiento.intentosSalida > 0) {
        fill(225, 165, 195);
        text("¿A DÓNDE PENSÁS IR?", 250, 229);
    } else if (comportamiento.mensajesIgnorados > 0) {
        fill(225, 165, 195);
        text("RESPUESTA NO ENTREGADA", 250, 229);
    } else if (comportamiento.demoras > 0) {
        fill(225, 165, 195);
        text("EL SILENCIO TAMBIÉN CUENTA", 250, 229);
    } else if (comportamiento.cambiosRespuesta > 0) {
        fill(225, 165, 195);
        text("REGISTRO INCONSISTENTE", 250, 229);
    } else if (comportamiento.presiones > 0) {
        fill(225, 165, 195);
        text("YA TE ESCUCHÉ", 250, 229);
    } else if (comportamiento.respuestasRapidas > 0) {
        fill(205, 165, 220);
        text("RESPUESTA DEMASIADO RÁPIDA", 250, 229);
    } else if (respuestaActual === "si") {
        fill(205, 165, 220);
        text("EL SISTEMA TAMBIÉN LO ESCUCHÓ", 250, 229);
    } else if (respuestaActual === "no") {
        fill(225, 165, 195);
        text("EL SISTEMA NO TE CREE", 250, 229);
    } else if (comportamiento.respuestas > 0) {
        fill(205, 165, 220);
        text("RESPUESTA REGISTRADA", 250, 229);
    } else if (nivelInterferencia > 0) {
        fill(205, 165, 220);
        text("¿ESA SOMBRA ESTABA AHÍ?", 250, 229);
    } else {
        fill(205, 165, 220);
        text("YOU ARE NOT ALONE", 250, 229);
    }
}

// El canvas también es una entrada: el clic en los objetos llama a la lógica
// de JavaScript para cambiar el estado del juego.
function mousePressed() {
    if (estadoActual === "puertaAbierta") return false;

    if (estadoActual === "nivel10") {
        if (nivel10Fase === "terminal") return false;
        if (nivel10Fase !== "exploracion") return false;
        const pista = pistaNivel10BajoCursor(mouseX, mouseY);
        if (pista) { descubrirPistaNivel10(pista); return false; }
        const equipo = equipoNivel10BajoCursor(mouseX, mouseY);
        if (equipo) abrirComputadoraNivel10(equipo);
        return false;
    }

    if (estadoActual === "nivel9") {
        if (!documentoNivel9.hidden) return false;
        if (mouseX >= 220 && mouseX <= 275 && mouseY >= 101 && mouseY <= 143) {
            interactuarConComputadora();
        } else if (mouseX >= 15 && mouseX <= 82 && mouseY >= 80 && mouseY <= 181) {
            abrirDocumentoNivel9("carpeta");
        } else if (mouseX >= 174 && mouseX <= 211 && mouseY >= 144 && mouseY <= 170) {
            abrirDocumentoNivel9("eleccion");
        } else if (mouseX >= 82 && mouseX <= 121 && mouseY >= 205 && mouseY <= 233) {
            abrirDocumentoNivel9("advertencia");
        } else if (mouseX >= 400 && mouseX <= 442 && mouseY >= 215 && mouseY <= 237) {
            abrirDocumentoNivel9("promesa");
        } else if (mouseX >= 352 && mouseX <= 400 && mouseY >= 135 && mouseY <= 197) {
            if (nivel9FiguraSentada) {
                nivel9FiguraSentada = false;
                mostrarMensajeNivel9("LA SILLA ESTÁ VACÍA. EN EL ESCRITORIO QUEDÓ UNA NOTA: «ME DIJO QUE ESTABA HACIENDO TODO BIEN».");
                sonidoEventoNivel8("interferencia");
            } else {
                abrirDocumentoNivel9("silla");
            }
        } else if (mouseX >= 210 && mouseX <= 290 && mouseY >= 54 && mouseY <= 100) {
            interactuarConPuerta();
        }
        return false;
    }

    if (estadoActual === "nivel7") {
        if (mouseX >= 448 && mouseX <= 499 && mouseY >= 105 && mouseY <= 203 && nivel7FiguraAparece) {
            nivel7FiguraTocada = true;
            registroNivel7.interaccionesFigura += 1;
            mensajeComputadoraNivel7.textContent = "DESAPARECIÓ CUANDO LA MIRASTE.";
            setTimeout(function () {
                if (estadoActual === "nivel7" && nivel7Fase !== "final") nivel7FiguraTocada = false;
            }, 1500);
            return false;
        }
        if (mouseX >= 54 && mouseX <= 198 && mouseY >= 70 && mouseY <= 162) {
            interactuarConComputadora();
            return false;
        }
        if (mouseX >= 400 && mouseX <= 480 && mouseY >= 65 && mouseY <= 190) {
            interactuarConPuerta();
            return false;
        }
        return false;
    }

    if (estadoActual === "nivel8") {
        if (mouseY > 190 && mouseX < 95) {
            registroNivel8.interactuoPistas += 1;
            mensajeComputadoraNivel8.textContent = "CINCO POSIBILIDADES. NO TODAS SON SALIDAS.";
            return false;
        }
        if (mouseX >= 16 && mouseX <= 77 && mouseY >= 39 && mouseY <= 81) {
            interactuarConComputadora();
            return false;
        }
        if (nivel8Fase === "final" && mouseX >= 360 && mouseX <= 445 && mouseY >= 70 && mouseY <= 185) {
            interactuarConPuerta();
            return false;
        }
        if ((mouseX < 66 || mouseX > 435) && mouseY > 75 && mouseY < 211) {
            const puerta = mouseX < 66 ? mouseY > 126 ? 1 : 4 : mouseY > 118 ? 5 : 2;
            investigarPuertaNivel8(puerta);
            return false;
        }
        if (mouseX > 210 && mouseX < 290 && mouseY > 65 && mouseY < 135) {
            const puerta = 3;
            investigarPuertaNivel8(puerta);
            return false;
        }
        return false;
    }

    if (estadoActual === "nivel6") {
        if (mouseX >= 458 && mouseX <= 499 && mouseY >= 100 && mouseY <= 205) {
            nivel6FiguraTocada = true;
            registroNivel6.interaccionesFigura += 1;
            mensajeComputadoraNivel6.textContent = "NO ERA UNA MANCHA. DESAPARECIÓ CUANDO LA MIRASTE.";
            setTimeout(function () {
                if (estadoActual === "nivel6" && nivel6Fase !== "final") nivel6FiguraTocada = false;
            }, 1800);
            return false;
        }
        if (mouseX >= 55 && mouseX <= 205 && mouseY >= 70 && mouseY <= 165) {
            interactuarConComputadora();
            return false;
        }
        if (mouseX >= 402 && mouseX <= 480 && mouseY >= 65 && mouseY <= 190) {
            interactuarConPuerta();
            return false;
        }
        return false;
    }

    if (estadoActual === "nivel5") {
        if (mouseX >= 248 && mouseX <= 302 && mouseY >= 78 && mouseY <= 185) {
            registroNivel5.investigoSombra = true;
            registroNivel5.clicsSombra += 1;
            mensajeNivel5.textContent = registroNivel5.clicsSombra === 1
                ? "LA SOMBRA NO ESTÁ DONDE DEBERÍA."
                : "SE QUEDÓ QUIETA CUANDO VOS TE MOVISTE.";
            return false;
        }
        if (mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178) {
            interactuarConComputadora();
            return false;
        }
        if (mouseX > 360 && mouseX < 445 && mouseY > 70 && mouseY < 190) {
            interactuarConPuerta();
            return false;
        }
        registroNivel5.comprobaciones += 1;
        registroNivel5.intentosVerificar = (registroNivel5.intentosVerificar || 0) + 1;
        return false;
    }

    if (estadoActual === "nivel4") {
        const sobreInscripcion = mouseX >= 372 && mouseX <= 435 && mouseY >= 88 && mouseY <= 150;
        const sobreMarcas = ((mouseX >= 348 && mouseX <= 367) || (mouseX >= 439 && mouseX <= 458)) && mouseY >= 84 && mouseY <= 185;
        if (sobreInscripcion) {
            leerInscripcionNivel4();
            return false;
        }
        if (sobreMarcas) {
            investigarMarcasNivel4();
            return false;
        }
        if (mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178) {
            interactuarConComputadora();
            return false;
        }
        if (mouseX > 365 && mouseX < 440 && mouseY > 75 && mouseY < 182) {
            interactuarConPuerta();
            return false;
        }
        return false;
    }

    if (estadoActual === "nivel3") {
        if (respuestaNivel3 === "no" && sombraPuertaVisible && mouseX > 360 && mouseX < 445 && mouseY >= 178 && mouseY < 200) {
            tocarSombraPuertaNivel3();
            return false;
        }
        if (respuestaNivel3 === "si" && mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178) {
            interactuarConComputadora();
            return false;
        }
        if (!notaEncontrada && mouseX >= 113 && mouseX <= 149 && mouseY >= 196 && mouseY <= 222) {
            encontrarNotaNivel3();
            return false;
        }
        if (respuestaNivel3 !== "si" && mouseX > 360 && mouseX < 445 && mouseY > 70 && mouseY < 178) {
            interactuarConPuerta();
            return false;
        }
        return false;
    }

    if (estadoActual === "nivel2") {
        if (mouseX > 360 && mouseX < 445 && mouseY > 70 && mouseY < 190) {
            interactuarConPuerta();
            return false;
        }
        registrarClickFueraDeLugar();
        return false;
    }

    if (estadoActual === "computadora") {
        if (mouseX > 170 && mouseX < 305 && mouseY > 68 && mouseY < 165) {
            interactuarConComputadora();
            return false;
        }
        if (mouseX > 360 && mouseX < 445 && mouseY > 70 && mouseY < 190) {
            interactuarConPuerta();
            return false;
        }
        registrarClickFueraDeLugar();
        return false;
    }

    if (estadoActual !== "habitacion" && estadoActual !== "puerta") {
        registrarClickFueraDeLugar();
        return false;
    }

    if (mouseX > 60 && mouseX < 155 && mouseY > 105 && mouseY < 178) {
        interactuarConComputadora();
        return false;
    }

    if (mouseX > 360 && mouseX < 445 && mouseY > 70 && mouseY < 190) {
        interactuarConPuerta();
        return false;
    }

    registrarClickFueraDeLugar();
    return false;
}
