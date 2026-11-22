// ESTADO DEL JUEGO
// JavaScript guarda lo que ocurre; sketch.js usa este estado para dibujar.
let estadoActual = "menu";
let nivelInterferencia = 0;
let clicksFueraDeLugar = 0;
let intentosPuerta = 0;
let intentosCodigoFallidos = 0;
let sustoPuertaActivado = false;
let temporizadorSusto;
let temporizadorPregunta;
let inicioPregunta = 0;
let estadoPregunta = "esperando";
let respuestaActual = null;
let pistaEntregada = false;
let respuestaNivel2 = null;
let reaccionNivel2 = "";
let respuestaNivel3 = null;
let notaEncontrada = false;
let sombraPuertaVisible = false;
let sombraPuertaTocada = false;
let mensajeFinalNivel3 = "";
let golpeNivel3Reproducido = false;
let tiempoGolpeNivel3 = 0;
let tiempoEntradaNivel3 = 0;
let temporizadorGolpeNivel3;
let respuestaNivel4 = null;
let reaccionNivel4 = "";
let tiempoRespuestaNivel4 = 0;
let inicioNivel4 = 0;
let tiempoFinalNivel4 = 0;
let reaccionNivel4Finalizada = false;
let ambienteNivel4Alterado = true;
let mensajeComputadoraNivel4 = "";
let mensajeFinalNivel4 = "";
let mensajeMarcasHasta = 0;
let temporizadorReaccionNivel4;
let temporizadorNormalizacionNivel4;
let temporizadorInterfazNivel4;
let registroNivel4 = {};
let respuestaRecuerdosNivel5 = null;
let respuestaBorrarNivel5 = null;
let faseNivel5 = "";
let registroNivel5 = {};
let fragmentosNivel5 = [];
let temporizadorFragmentosNivel5;
let inicioNivel5 = 0;
let respuestaNivel6 = null;
let inicioNivel6 = 0;
let nivel6Fase = "";
let nivel6IndiceInstruccion = -1;
let nivel6Temporizador;
let nivel6TemporizadorFinal;
let nivel6Ruta = "";
let nivel6RespuestaMs = 0;
let nivel6TiempoQuietoMs = 0;
let nivel6MovimientosMouse = 0;
let nivel6IntentosInteraccion = 0;
let nivel6PerdidasControl = 0;
let nivel6InstruccionesSeguidas = 0;
let nivel6InstruccionesContadas = {};
let nivel6UltimoMovimiento = 0;
let nivel6UltimaMuestra = 0;
let nivel6MouseQuietoDesde = 0;
let nivel6PosicionInicial = { x: 250, y: 0 };
let nivel6FiguraTocada = false;
let registroNivel6 = {};
let nivel6PausaMarcada = false;
let nivel6UltimoAvisoPausa = 0;
let nivel6AutonomiaMarcada = false;
let nivel6PosicionAlterada = false;
let nivel6InversionRegistrada = false;
let nivel7Fase = "";
let nivel7MensajeIndice = 0;
let nivel7Temporizador;
let nivel7SecuenciaTemporizador;
let nivel7AudioTemporizador;
let nivel7SonidosDetector;
let nivel7EscrituraIntervalo;
let nivel7TextoPendiente = "";
let nivel7Escribiendo = false;
let nivel7StreamMicrofono = null;
let nivel7AnalizadorMicrofono = null;
let nivel7FuenteMicrofono = null;
let nivel7Permiso = "sin-responder";
let nivel7Respuesta = null;
let nivel7TiempoInicio = 0;
let nivel7UltimoSonido = 0;
let nivel7UltimoMensajeSonido = 0;
let nivel7UltimoMomentoSilencioso = 0;
let nivel7SilencioAcumuladoMs = 0;
let nivel7UltimaMuestraMic = 0;
let nivel7MuestrasMicrofono = 0;
let nivel7TipoUltimoSonido = "";
let nivel7RespuestaPresencia = false;
let nivel7FiguraTocada = false;
let nivel7FiguraAparece = false;
let nivel7FiguraDetras = false;
let nivel7SombraPuerta = false;
let nivel7InsectosDetenidos = false;
let nivel7Finalizada = false;
let nivel7ErroresMic = "";
let registroNivel7 = {};
let nivel8Fase = "";
let nivel8Temporizador;
let nivel8AmbienteTemporizador;
let nivel8IndicePista = 0;
let nivel8Respuesta = null;
let nivel8GolpesEscuchados = false;
let nivel8ConteoSonidosSeguidos = 0;
let nivel8UltimoSonido = 0;
let nivel8UltimoRespiro = 0;
let nivel8PuertaObservada = 0;
let nivel8InicioObservacionPuerta = 0;
let nivel8PuertaApertura = 0;
let nivel8PuertaCierra = 0;
let nivel8LucesApagandose = false;
let nivel8PuertaNueva = false;
let nivel8FiguraPuerta = false;
let nivel8RegresoInicio = 0;
let nivel8SonidosBase = 0;
let nivel8VocesBase = 0;
let nivel8RuidosBase = 0;
let registroNivel8 = {};
let nivel9InicioTransicion = 0;
let nivel9Fase = "";
let nivel9PerfilAnterior = "indeciso";
let nivel9FiguraSentada = false;
let nivel9LuzParpadeaHasta = 0;
let nivel9Timer;
let registroNivel9 = {};
let nivel10Fase = "";
let nivel10InicioTransicion = 0;
let nivel10Temporizador;
let nivel10Perfil = "indeciso";
let nivel10HistorialDecisiones = {};
let nivel10Distribucion = null;
let nivel10DistribucionAnterior = "";
let nivel10ComputadoraActual = null;
let nivel10DestinoSeleccionado = null;
let nivel10TerminalSubfase = "";
let nivel10PistasEncontradas = [];
let nivel10EvaluacionPreguntas = [];
let nivel10EvaluacionRespuestas = [];
let nivel10PantallaDespierta = null;
let nivel10PantallaDespiertaHasta = 0;
let nivel10UltimoEquipoCerca = null;
let nivel10UltimaActividad = 0;
let nivel10UltimoMovimientoMouse = 0;
let nivel10EventoEscena = "";
let nivel10EventoEscenaHasta = 0;
let nivel10UltimoEventoEscena = 0;
let nivel10MiradaPersonaje = "frente";
let nivel10MovimientoAutonomoHasta = 0;
let nivel10CantidadMovimientosAutonomos = 0;
let nivel10ProximaReaccionQuietud = 0;
let nivel10PasoAutonomoX = 0;
let nivel10UltimoEventoMs = 0;
let nivel10EventoIndice = 0;
let nivel10MensajesRechazo = [];
let nivel10IndiceRechazo = 0;
let nivel10CortesLuzMeh = 0;
let nivel10SubfaseNormalidad = "luz";
let nivel10IndiceEvaluacion = 0;
const experienciasComputadorasNivel10 = {
    1: { destino: "final-bueno", terminaPartida: true },
    2: { destino: "final-malo", terminaPartida: true },
    3: { destino: "final-meh", terminaPartida: true },
    4: { destino: "evaluacion", terminaPartida: false },
    5: { destino: "reinicio", terminaPartida: false }
};
const pistasPasilloNivel8 = [
    "NO TODAS LAS SALIDAS SON SALIDAS.",
    "UNA DE ELLAS TE DEJARÁ SALIR.",
    "LAS DEMÁS YA LO INTENTARON.",
    "CINCO POSIBILIDADES. UNA SOLA SALIDA."
];
const mensajesVigilanciaNivel7 = [
    "¿HAY ALGUIEN AHÍ?",
    "SÉ QUE ESTÁS DEL OTRO LADO.",
    "NO HACE FALTA QUE ME RESPONDAS.",
    "PUEDO ESPERAR.",
    "¿ESTÁS SOLO?"
];

// Señales observables de esta partida; no representan lo que siente la persona.
const comportamiento = {
    demoras: 0,
    presiones: 0,
    clicsVacios: 0,
    intentosSalida: 0,
    mensajesIgnorados: 0,
    respuestas: 0,
    cambiosRespuesta: 0,
    respuestasRapidas: 0
};

// PANTALLAS
const menu = document.getElementById("menu");
const habitacion = document.getElementById("habitacion");
const computadora = document.getElementById("computadora");
const textoHistoria = document.getElementById("textoHistoria");
const panelAcceso = document.getElementById("panelAcceso");
const formularioAcceso = document.getElementById("formularioAcceso");
const mensajeAcceso = document.getElementById("mensajeAcceso");
const inputCodigoAcceso = document.getElementById("inputCodigoAcceso");
const btnCerrarAcceso = document.getElementById("btnCerrarAcceso");

// BOTONES
const btnStart = document.getElementById("btnStart");
const btnComputadora = document.getElementById("btnComputadora");
const btnPuerta = document.getElementById("btnPuerta");
const btnVolver = document.getElementById("btnVolver");
const btnAudio = document.getElementById("btnAudio");
const mensajeInterferencia = document.getElementById("mensajeInterferencia");
const codigoPista = document.getElementById("codigoPista");
const susto = document.getElementById("susto");
const mensajeSistema = document.getElementById("mensajeSistema");
const registroPista = document.getElementById("registroPista");
const btnRespuestaSi = document.getElementById("btnRespuestaSi");
const btnRespuestaNo = document.getElementById("btnRespuestaNo");
const btnConsultarPista = document.getElementById("btnConsultarPista");
const panelNivel2 = document.getElementById("panelNivel2");
const panelNivel3 = document.getElementById("panelNivel3");
const panelNivel4 = document.getElementById("panelNivel4");
const panelNivel5 = document.getElementById("panelNivel5");
const panelNivel6 = document.getElementById("panelNivel6");
const panelNivel7 = document.getElementById("panelNivel7");
const panelNivel8 = document.getElementById("panelNivel8");
const panelNivel9 = document.getElementById("panelNivel9");
const panelNivel10 = document.getElementById("panelNivel10");
const avisoNivel10 = document.getElementById("avisoNivel10");
const mensajeComputadoraNivel10 = document.getElementById("mensajeComputadoraNivel10");
const terminalNivel10 = document.getElementById("terminalNivel10");
const textoTerminalNivel10 = document.getElementById("textoTerminalNivel10");
const opcionesTerminalNivel10 = document.getElementById("opcionesTerminalNivel10");
const accionesFinalNivel10 = document.getElementById("accionesFinalNivel10");
const btnSeguirExplorandoNivel10 = document.getElementById("btnSeguirExplorandoNivel10");
const btnReiniciarNivel10 = document.getElementById("btnReiniciarNivel10");
const mensajeCuartaParedNivel10 = document.getElementById("mensajeCuartaParedNivel10");
const mensajeComputadoraNivel9 = document.getElementById("mensajeComputadoraNivel9");
const preguntaNivel9 = document.getElementById("preguntaNivel9");
const textoPreguntaNivel9 = document.getElementById("textoPreguntaNivel9");
const documentoNivel9 = document.getElementById("documentoNivel9");
const tituloDocumentoNivel9 = document.getElementById("tituloDocumentoNivel9");
const textoDocumentoNivel9 = document.getElementById("textoDocumentoNivel9");
const btnCerrarDocumentoNivel9 = document.getElementById("btnCerrarDocumentoNivel9");
const mensajeComputadoraNivel8 = document.getElementById("mensajeComputadoraNivel8");
const puertasNivel8 = document.getElementById("puertasNivel8");
const preguntaNivel8 = document.getElementById("preguntaNivel8");
const btnEscucharGolpesNivel8 = document.getElementById("btnEscucharGolpesNivel8");
const permisoMicrofonoNivel7 = document.getElementById("permisoMicrofonoNivel7");
const btnPermitirMicrofonoNivel7 = document.getElementById("btnPermitirMicrofonoNivel7");
const btnRechazarMicrofonoNivel7 = document.getElementById("btnRechazarMicrofonoNivel7");
const preguntaNivel7 = document.getElementById("preguntaNivel7");
const mensajeComputadoraNivel7 = document.getElementById("mensajeComputadoraNivel7");
const mensajeComputadoraNivel6 = document.getElementById("mensajeComputadoraNivel6");
const preguntaNivel6 = document.getElementById("preguntaNivel6");
const btnNivel6Si = document.getElementById("btnNivel6Si");
const btnNivel6No = document.getElementById("btnNivel6No");
const fragmentoNivel5 = document.getElementById("fragmentoNivel5");
const preguntaRecuerdosNivel5 = document.getElementById("preguntaRecuerdosNivel5");
const preguntaBorrarNivel5 = document.getElementById("preguntaBorrarNivel5");
const btnNivel5RecuerdoSi = document.getElementById("btnNivel5RecuerdoSi");
const btnNivel5RecuerdoNo = document.getElementById("btnNivel5RecuerdoNo");
const btnNivel5BorrarSi = document.getElementById("btnNivel5BorrarSi");
const btnNivel5BorrarNo = document.getElementById("btnNivel5BorrarNo");
const mensajeNivel2 = document.getElementById("mensajeNivel2");
const btnNivel2Si = document.getElementById("btnNivel2Si");
const btnNivel2No = document.getElementById("btnNivel2No");
const avisoExplorar = document.getElementById("avisoExplorar");
const preguntaNivel3 = document.getElementById("preguntaNivel3");
const mensajeNivel3 = document.getElementById("mensajeNivel3");
const btnNivel3Si = document.getElementById("btnNivel3Si");
const btnNivel3No = document.getElementById("btnNivel3No");
const btnNivel4Si = document.getElementById("btnNivel4Si");
const btnNivel4No = document.getElementById("btnNivel4No");
const avisoNivel4 = document.getElementById("avisoNivel4");
const mensajeNivel4 = document.getElementById("mensajeNivel4");
const tituloNivel = document.getElementById("tituloNivel");
const tituloHabitacion = document.getElementById("tituloHabitacion");

const codigosPista = ["1987", "0713", "2049", "0316", "1987"];

const mensajesRaros = [
    "NO ERA ESA PARTE.",
    "TE VI MIRANDO.",
    "NO TOQUES AHÍ.",
    "¿POR QUÉ VOLVISTE A HACERLO?",
    "ESA SOMBRA TAMBIÉN TE ESTÁ MIRANDO.",
    "NO HAY NADA DETRÁS TUYO."
];

function registrarClickFueraDeLugar() {
    clicksFueraDeLugar += 1;
    comportamiento.clicsVacios += 1;
    nivelInterferencia = Math.max(nivelInterferencia, Math.min(6, Math.ceil(clicksFueraDeLugar / 2)));

    document.body.dataset.interferencia = Math.min(clicksFueraDeLugar, 6);
    mensajeInterferencia.textContent = mensajesRaros[(clicksFueraDeLugar - 1) % mensajesRaros.length];
    mensajeInterferencia.classList.remove("visible");
    void mensajeInterferencia.offsetWidth;
    mensajeInterferencia.classList.add("visible");

    if (typeof crearParticulaRara === "function") crearParticulaRara();
}

// Clics sobre botones y controles son acciones del juego. Los clics en otras
// zonas de la página cuentan como intentos de encontrar algo que no está ahí.
document.addEventListener("click", function (event) {
    if (event.target.closest("button, a, input, select, textarea, #canvas-container")) return;
    registrarClickFueraDeLugar();
});

function cambiarPantalla(nuevaPantalla) {
    menu.classList.remove("activa");
    habitacion.classList.remove("activa");
    computadora.classList.remove("activa");
    nuevaPantalla.classList.add("activa");
}

function mostrarHabitacion(mensaje) {
    estadoActual = "habitacion";
    panelAcceso.hidden = true;
    if (mensaje) textoHistoria.textContent = mensaje;
    cambiarPantalla(habitacion);
}

// AUDIO: se inicia con una acción del usuario, como requieren los navegadores.
let contextoAudio;
let volumenGeneral;
let audioActivo = false;
let osciladoresAmbiente = [];
let gananciasAmbiente = [];
let moduladorAmbiente;
let profundidadModulacionAmbiente;

function iniciarAudio() {
    if (!contextoAudio) {
        contextoAudio = new AudioContext();
        volumenGeneral = contextoAudio.createGain();
        volumenGeneral.gain.value = 0;
        volumenGeneral.connect(contextoAudio.destination);

        const tono1 = contextoAudio.createOscillator();
        const volumen1 = contextoAudio.createGain();
        tono1.type = "sine";
        tono1.frequency.value = 55;
        volumen1.gain.value = 0.16;
        tono1.connect(volumen1);
        volumen1.connect(volumenGeneral);
        tono1.start();

        const tono2 = contextoAudio.createOscillator();
        const volumen2 = contextoAudio.createGain();
        tono2.type = "triangle";
        tono2.frequency.value = 110;
        volumen2.gain.value = 0.10;
        tono2.connect(volumen2);
        volumen2.connect(volumenGeneral);
        tono2.start();

        const tono3 = contextoAudio.createOscillator();
        const volumen3 = contextoAudio.createGain();
        tono3.type = "sine";
        tono3.frequency.value = 164.81;
        volumen3.gain.value = 0.035;
        tono3.connect(volumen3);
        volumen3.connect(volumenGeneral);
        tono3.start();

        osciladoresAmbiente = [tono1, tono2, tono3];
        gananciasAmbiente = [volumen1, volumen2, volumen3];

        const vibracion = contextoAudio.createOscillator();
        const intensidad = contextoAudio.createGain();
        vibracion.frequency.value = 0.18;
        intensidad.gain.value = 4;
        vibracion.connect(intensidad);
        intensidad.connect(tono2.frequency);
        vibracion.start();
        moduladorAmbiente = vibracion;
        profundidadModulacionAmbiente = intensidad;
    }

    if (contextoAudio.state === "suspended") contextoAudio.resume();
    audioActivo = true;
    volumenGeneral.gain.setTargetAtTime(0.9, contextoAudio.currentTime, 0.5);
    btnAudio.textContent = "♪ AUDIO: ON";
    actualizarMusicaTerror();
}

function actualizarMusicaTerror() {
    if (!contextoAudio || osciladoresAmbiente.length === 0) return;

    const nivel = Math.min(12, Math.max(0, intentosCodigoFallidos - 2));
    const ahora = contextoAudio.currentTime;
    const frecuencias = [55 - nivel * 0.9, 110 + nivel * 2.8, 164.81 - nivel * 4];
    const ganancias = [0.16, 0.10 + nivel * 0.004, 0.035 + nivel * 0.004];

    osciladoresAmbiente.forEach(function (oscilador, indice) {
        oscilador.frequency.setTargetAtTime(frecuencias[indice], ahora, 0.35);
        gananciasAmbiente[indice].gain.setTargetAtTime(ganancias[indice], ahora, 0.35);
    });

    moduladorAmbiente.frequency.setTargetAtTime(0.18 + nivel * 0.16, ahora, 0.4);
    profundidadModulacionAmbiente.gain.setTargetAtTime(4 + nivel * 2, ahora, 0.4);
}

function sonidoErrorCodigo() {
    if (!audioActivo || !contextoAudio) return;

    const nivel = Math.min(12, Math.max(1, intentosCodigoFallidos - 2));
    const ahora = contextoAudio.currentTime;

    // Golpe grave que se hunde, acompañado por un chirrido metálico breve.
    const golpe = contextoAudio.createOscillator();
    const filtroGolpe = contextoAudio.createBiquadFilter();
    const volumenGolpe = contextoAudio.createGain();
    golpe.type = "triangle";
    golpe.frequency.setValueAtTime(72 - nivel * 2, ahora);
    golpe.frequency.exponentialRampToValueAtTime(28, ahora + 0.42);
    filtroGolpe.type = "lowpass";
    filtroGolpe.frequency.value = 240 + nivel * 85;
    volumenGolpe.gain.setValueAtTime(0.001, ahora);
    volumenGolpe.gain.linearRampToValueAtTime(0.12 + nivel * 0.022, ahora + 0.025);
    volumenGolpe.gain.exponentialRampToValueAtTime(0.001, ahora + 0.5);
    golpe.connect(filtroGolpe);
    filtroGolpe.connect(volumenGolpe);
    volumenGolpe.connect(volumenGeneral);
    golpe.start(ahora);
    golpe.stop(ahora + 0.52);

    const chirrido = contextoAudio.createOscillator();
    const filtroChirrido = contextoAudio.createBiquadFilter();
    const volumenChirrido = contextoAudio.createGain();
    chirrido.type = "sawtooth";
    chirrido.frequency.setValueAtTime(430 + nivel * 70, ahora);
    chirrido.frequency.exponentialRampToValueAtTime(150 + nivel * 12, ahora + 0.28);
    filtroChirrido.type = "bandpass";
    filtroChirrido.frequency.value = 680 + nivel * 65;
    filtroChirrido.Q.value = 2.2;
    volumenChirrido.gain.setValueAtTime(0.001, ahora);
    volumenChirrido.gain.linearRampToValueAtTime(0.018 + nivel * 0.004, ahora + 0.02);
    volumenChirrido.gain.exponentialRampToValueAtTime(0.001, ahora + 0.32);
    chirrido.connect(filtroChirrido);
    filtroChirrido.connect(volumenChirrido);
    volumenChirrido.connect(volumenGeneral);
    chirrido.start(ahora);
    chirrido.stop(ahora + 0.34);
}

function sonidoGolpePuertaNivel3() {
    tiempoGolpeNivel3 = Date.now();
    if (!audioActivo || !contextoAudio) return;

    const ahora = contextoAudio.currentTime;
    const golpe = contextoAudio.createOscillator();
    const filtro = contextoAudio.createBiquadFilter();
    const volumen = contextoAudio.createGain();
    golpe.type = "triangle";
    golpe.frequency.setValueAtTime(68, ahora);
    golpe.frequency.exponentialRampToValueAtTime(31, ahora + 0.34);
    filtro.type = "lowpass";
    filtro.frequency.value = 190;
    volumen.gain.setValueAtTime(0.001, ahora);
    volumen.gain.linearRampToValueAtTime(0.42, ahora + 0.018);
    volumen.gain.exponentialRampToValueAtTime(0.001, ahora + 0.48);
    golpe.connect(filtro);
    filtro.connect(volumen);
    volumen.connect(volumenGeneral);
    golpe.start(ahora);
    golpe.stop(ahora + 0.5);
}

function sonidoPuertaRechazoNivel4() {
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;
    [0, 0.82, 1.47].forEach(function (retraso, indice) {
        const golpe = contextoAudio.createOscillator();
        const filtro = contextoAudio.createBiquadFilter();
        const volumen = contextoAudio.createGain();
        const inicio = ahora + retraso;
        golpe.type = indice === 1 ? "sawtooth" : "triangle";
        golpe.frequency.setValueAtTime(indice === 1 ? 92 : 58, inicio);
        golpe.frequency.exponentialRampToValueAtTime(26, inicio + 0.3);
        filtro.type = "lowpass";
        filtro.frequency.value = indice === 1 ? 340 : 170;
        volumen.gain.setValueAtTime(0.001, inicio);
        volumen.gain.linearRampToValueAtTime(indice === 1 ? 0.07 : 0.30, inicio + 0.018);
        volumen.gain.exponentialRampToValueAtTime(0.001, inicio + 0.38);
        golpe.connect(filtro);
        filtro.connect(volumen);
        volumen.connect(volumenGeneral);
        golpe.start(inicio);
        golpe.stop(inicio + 0.4);
    });
}

function silenciarAudio() {
    if (!contextoAudio) return;
    audioActivo = false;
    volumenGeneral.gain.setTargetAtTime(0, contextoAudio.currentTime, 0.2);
    btnAudio.textContent = "♪ AUDIO: OFF";
}

function sonidoScream() {
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;

    // Barrido áspero y agudo con vibración rápida para un grito sintético breve.
    const grito = contextoAudio.createOscillator();
    const tonoVibrato = contextoAudio.createOscillator();
    const profundidad = contextoAudio.createGain();
    const volumen = contextoAudio.createGain();
    const filtro = contextoAudio.createBiquadFilter();

    grito.type = "sawtooth";
    grito.frequency.setValueAtTime(920, ahora);
    grito.frequency.exponentialRampToValueAtTime(270, ahora + 0.72);
    tonoVibrato.frequency.value = 23;
    profundidad.gain.value = 42;
    tonoVibrato.connect(profundidad);
    profundidad.connect(grito.frequency);

    filtro.type = "bandpass";
    filtro.frequency.value = 1450;
    filtro.Q.value = 0.7;
    volumen.gain.setValueAtTime(0.001, ahora);
    volumen.gain.linearRampToValueAtTime(0.34, ahora + 0.035);
    volumen.gain.setTargetAtTime(0.001, ahora + 0.52, 0.11);
    grito.connect(filtro);
    filtro.connect(volumen);
    volumen.connect(volumenGeneral);

    tonoVibrato.start(ahora);
    grito.start(ahora);
    tonoVibrato.stop(ahora + 0.9);
    grito.stop(ahora + 0.9);
}

function mostrarSusto() {
    susto.classList.remove("activo");
    void susto.offsetWidth;
    susto.classList.add("activo");
    susto.setAttribute("aria-hidden", "false");
    clearTimeout(temporizadorSusto);

    temporizadorSusto = setTimeout(function () {
        susto.classList.remove("activo");
        susto.setAttribute("aria-hidden", "true");
    }, 950);

    sonidoScream();
}

function revisarSustoPorInsistencia() {
    const intentosDeAcceso = intentosPuerta + intentosCodigoFallidos;
    if (intentosDeAcceso >= 10 && !sustoPuertaActivado) {
        sustoPuertaActivado = true;
        mostrarSusto();
    }
}

function sonidoDecision() {
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;

    const golpe = contextoAudio.createOscillator();
    const volumenGolpe = contextoAudio.createGain();
    golpe.type = "sine";
    golpe.frequency.setValueAtTime(95, ahora);
    golpe.frequency.exponentialRampToValueAtTime(32, ahora + 0.55);
    volumenGolpe.gain.setValueAtTime(0.001, ahora);
    volumenGolpe.gain.linearRampToValueAtTime(0.65, ahora + 0.025);
    volumenGolpe.gain.exponentialRampToValueAtTime(0.001, ahora + 0.8);
    golpe.connect(volumenGolpe);
    volumenGolpe.connect(volumenGeneral);
    golpe.start(ahora);
    golpe.stop(ahora + 0.85);

    const metal = contextoAudio.createOscillator();
    const volumenMetal = contextoAudio.createGain();
    metal.type = "triangle";
    metal.frequency.setValueAtTime(420, ahora);
    metal.frequency.exponentialRampToValueAtTime(115, ahora + 0.45);
    volumenMetal.gain.setValueAtTime(0.001, ahora);
    volumenMetal.gain.linearRampToValueAtTime(0.12, ahora + 0.03);
    volumenMetal.gain.exponentialRampToValueAtTime(0.001, ahora + 0.55);
    metal.connect(volumenMetal);
    volumenMetal.connect(volumenGeneral);
    metal.start(ahora);
    metal.stop(ahora + 0.6);
}

btnAudio.addEventListener("click", function () {
    if (audioActivo) silenciarAudio();
    else iniciarAudio();
});

function iniciarJuego() {
    iniciarAudio();
    sonidoDecision();
    clearTimeout(nivel10Temporizador);
    nivel10Distribucion = null;
    nivel10Perfil = "indeciso";
    nivel10HistorialDecisiones = {};
    nivel10ComputadoraActual = null;
    nivel10DestinoSeleccionado = null;
    nivel10Fase = "";
    nivel10TerminalSubfase = "";
    nivel10PistasEncontradas = [];
    nivel10EvaluacionPreguntas = [];
    nivel10EvaluacionRespuestas = [];
    nivel10PantallaDespierta = null;
    nivel10EventoEscena = "";
    nivel10EventoEscenaHasta = 0;
    nivel10UltimoEventoEscena = 0;
    nivel10MiradaPersonaje = "frente";
    nivel10MovimientoAutonomoHasta = 0;
    nivel10CantidadMovimientosAutonomos = 0;
    nivel10ProximaReaccionQuietud = 0;
    nivel10PasoAutonomoX = 0;
    nivel10UltimoMovimientoMouse = Date.now();
    mensajeCuartaParedNivel10.hidden = true;
    accionesFinalNivel10.hidden = true;
    nivelInterferencia = 0;
    clicksFueraDeLugar = 0;
    intentosPuerta = 0;
    intentosCodigoFallidos = 0;
    sustoPuertaActivado = false;
    actualizarMusicaTerror();
    Object.assign(comportamiento, {
        demoras: 0,
        presiones: 0,
        clicsVacios: 0,
        intentosSalida: 0,
        mensajesIgnorados: 0,
        respuestas: 0,
        cambiosRespuesta: 0,
        respuestasRapidas: 0
    });
    delete document.body.dataset.interferencia;
    delete document.body.dataset.rutaNivel4;
    delete document.body.dataset.reaccionNivel4;
    delete document.body.dataset.rutaNivel5;
    delete document.body.dataset.rutaNivel6;
    delete document.body.dataset.rutaNivel7;
    mensajeInterferencia.textContent = "";
    estadoPregunta = "esperando";
    respuestaActual = null;
    respuestaNivel2 = null;
    reaccionNivel2 = "";
    respuestaNivel3 = null;
    notaEncontrada = false;
    sombraPuertaVisible = false;
    sombraPuertaTocada = false;
    mensajeFinalNivel3 = "";
    golpeNivel3Reproducido = false;
    clearTimeout(temporizadorGolpeNivel3);
    respuestaNivel4 = null;
    reaccionNivel4 = "";
    reaccionNivel4Finalizada = false;
    ambienteNivel4Alterado = true;
    mensajeComputadoraNivel4 = "";
    mensajeFinalNivel4 = "";
    mensajeMarcasHasta = 0;
    clearTimeout(temporizadorReaccionNivel4);
    clearTimeout(temporizadorNormalizacionNivel4);
    clearInterval(temporizadorInterfazNivel4);
    pistaEntregada = false;
    btnRespuestaSi.classList.remove("seleccionada");
    btnRespuestaNo.classList.remove("seleccionada");
    registroPista.hidden = true;
    btnConsultarPista.hidden = false;
    codigoPista.textContent = codigosPista[0];
    panelAcceso.hidden = true;
    formularioAcceso.hidden = false;
    inputCodigoAcceso.value = "";
    mensajeAcceso.textContent = "";
    btnCerrarAcceso.textContent = "CANCELAR";
    btnPuerta.disabled = false;
    btnPuerta.textContent = "ABRIR PUERTA";
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    btnPuerta.hidden = false;
    panelNivel2.hidden = true;
    panelNivel3.hidden = true;
    panelNivel4.hidden = true;
    panelNivel5.hidden = true;
    panelNivel6.hidden = true;
    panelNivel7.hidden = true;
    panelNivel8.hidden = true;
    panelNivel9.hidden = true;
    panelNivel10.hidden = true;
    terminalNivel10.hidden = true;
    opcionesTerminalNivel10.replaceChildren();
    clearTimeout(nivel8Temporizador);
    clearTimeout(nivel8AmbienteTemporizador);
    nivel8Fase = "";
    registroNivel8 = {};
    clearTimeout(nivel7Temporizador);
    clearTimeout(nivel7AudioTemporizador);
    clearInterval(nivel7SonidosDetector);
    clearInterval(nivel7EscrituraIntervalo);
    finalizarMicrofonoNivel7();
    nivel7Fase = "";
    nivel7Permiso = "sin-responder";
    nivel7Respuesta = null;
    nivel7FiguraAparece = false;
    nivel7FiguraTocada = false;
    nivel7Finalizada = false;
    registroNivel7 = {};
    tituloNivel.textContent = "LEVEL 01";
    tituloHabitacion.textContent = "HABITACIÓN DESCONOCIDA";
    btnNivel2Si.disabled = false;
    btnNivel2No.disabled = false;
    btnNivel2Si.classList.remove("seleccionada");
    btnNivel2No.classList.remove("seleccionada");
    mensajeNivel2.textContent = "";
    avisoExplorar.textContent = "Explorá la habitación. Hay algo que el sistema quiere que encuentres.";
    preguntaNivel3.hidden = true;
    mensajeNivel3.textContent = "";
    document.getElementById("instruccionCanvas").textContent = "También podés tocar la computadora o la puerta dentro de la escena.";
    btnNivel3Si.disabled = false;
    btnNivel3No.disabled = false;
    btnNivel3Si.classList.remove("seleccionada");
    btnNivel3No.classList.remove("seleccionada");
    btnNivel4Si.disabled = false;
    btnNivel4No.disabled = false;
    btnNivel4Si.classList.remove("seleccionada");
    btnNivel4No.classList.remove("seleccionada");
    avisoNivel4.textContent = "Llegaste a la habitación. La computadora ya está esperando tu decisión.";
    mensajeNivel4.textContent = "";
    respuestaRecuerdosNivel5 = null;
    respuestaBorrarNivel5 = null;
    faseNivel5 = "";
    registroNivel5 = {};
    fragmentosNivel5 = [];
    clearInterval(temporizadorFragmentosNivel5);
    clearTimeout(nivel6Temporizador);
    clearTimeout(nivel6TemporizadorFinal);
    respuestaNivel6 = null;
    nivel6Fase = "";
    registroNivel6 = {};
    mensajeSistema.textContent = "SE REGISTRARÁ TU RESPUESTA.";
    document.getElementById("saludoSistema").innerHTML = '<span class="saludo-principal">BIENVENIDO, JUGADOR.</span><span class="saludo-instruccion">Respondé la pregunta o leé el registro para descubrir qué pasó y encontrar el código de la puerta.</span>';
    textoHistoria.textContent = "Despertás en una habitación desconocida. Hay una computadora y una puerta. ¿Qué querés hacer?";
    estadoActual = "computadora";
    cambiarPantalla(computadora);
    iniciarTemporizadorPregunta();
}

function iniciarTemporizadorPregunta() {
    clearTimeout(temporizadorPregunta);
    if (estadoPregunta !== "esperando") return;
    inicioPregunta = Date.now();
    temporizadorPregunta = setTimeout(function () {
        if (estadoActual !== "computadora" || estadoPregunta !== "esperando") return;
        comportamiento.demoras += 1;
        nivelInterferencia = Math.max(nivelInterferencia, 1);
        mensajeSistema.textContent = "¿SEGUÍS AHÍ?";
    }, 8000);
}

function seleccionarRespuesta(respuesta) {
    if (estadoActual !== "computadora") return;
    sonidoDecision();

    if (estadoPregunta === "esperando") {
        const segundos = (Date.now() - inicioPregunta) / 1000;
        clearTimeout(temporizadorPregunta);
        estadoPregunta = "respondida";
        respuestaActual = respuesta;
        comportamiento.respuestas += 1;
        if (segundos < 3) comportamiento.respuestasRapidas += 1;
        mensajeSistema.textContent = comportamiento.demoras
            ? respuesta === "si"
                ? "TE TOMASTE TU TIEMPO. SÍ, YO TAMBIÉN LO ESCUCHÉ."
                : "LA PAUSA QUEDÓ REGISTRADA. EL SENSOR DETECTÓ ALGO."
            : segundos < 3
                ? "QUÉ RÁPIDO. ¿NI SIQUIERA LO PENSASTE?"
                : respuesta === "si"
                    ? "SÍ. YO TAMBIÉN LO ESCUCHÉ."
                    : "EL SENSOR DICE OTRA COSA.";
    } else if (respuesta === respuestaActual) {
        comportamiento.presiones += 1;
        mensajeSistema.textContent = comportamiento.presiones === 1
            ? "NO ES NECESARIO QUE PRESIONES TANTAS VECES."
            : "YA TE ESCUCHÉ. DEJÁ DE PRESIONAR.";
        if (comportamiento.presiones % 2 === 0 && typeof crearParticulaRara === "function") crearParticulaRara();
    } else {
        comportamiento.cambiosRespuesta += 1;
        comportamiento.respuestas += 1;
        respuestaActual = respuesta;
        mensajeSistema.textContent = "CAMBIASTE TU RESPUESTA. EL REGISTRO ANTERIOR NO COINCIDE.";
        nivelInterferencia = Math.min(6, nivelInterferencia + 1);
        if (typeof crearParticulaRara === "function") crearParticulaRara();
    }

    btnRespuestaSi.classList.toggle("seleccionada", respuestaActual === "si");
    btnRespuestaNo.classList.toggle("seleccionada", respuestaActual === "no");
}

function consultarPista() {
    if (estadoActual !== "computadora" || pistaEntregada) return;

    sonidoDecision();
    pistaEntregada = true;
    registroPista.hidden = false;
    btnConsultarPista.hidden = true;
    mensajeSistema.textContent = "ARCHIVO RECUPERADO. GUARDÁ LA SECUENCIA PARA MÁS ADELANTE.";
}

function interactuarConComputadora() {
    if (estadoActual === "nivel9") {
        sonidoDecision();
        registroNivel9.interaccionesComputadora += 1;
        if (nivel9Fase === "exploracion") {
            const saludo = nivel9PerfilAnterior === "confiado"
                ? "ESTUVISTE HACIENDO UN GRAN TRABAJO. QUIERO QUE ESTA VEZ SALGAS BIEN."
                : nivel9PerfilAnterior === "desconfiado"
                    ? "NO SÉ POR QUÉ SEGUÍS DESCONFIANDO. DESPUÉS DE TODO LO QUE PASAMOS, MERECÉS AYUDA."
                    : "SUPONGO QUE YA SÉ QUÉ VAS A DECIR. DESPUÉS DE TODO LO QUE PASAMOS, MERECÉS AYUDA.";
            mostrarMensajeNivel9(saludo);
            iniciarPreguntaNivel9("ayuda");
        } else if (nivel9Fase === "busqueda") {
            mostrarMensajeNivel9(nivel9PerfilAnterior === "desconfiado"
                ? "BUSCÁ POR TU CUENTA. NO VOY A DECIRTE DÓNDE."
                : nivel9PerfilAnterior === "indeciso"
                    ? "CREO QUE EL PAPEL ESTÁ EN EL SUELO. O TAL VEZ YA NO."
                    : "EL PAPEL INCOMPLETO ESTÁ CERCA DEL SUELO. ESTA VEZ SÍ QUIERO AYUDAR.");
        } else if (nivel9Fase === "final") {
            mostrarMensajeNivel9("ESTÁ BIEN. CREO QUE YA TENEMOS TODO LO QUE NECESITAMOS.");
        } else if (nivel9Fase === "terminado") {
            mostrarMensajeNivel9("LA PUERTA SIGUE ABIERTA. EL SISTEMA NO RESPONDE.");
        } else {
            mostrarMensajeNivel9("YA TE ESCUCHÉ. LA PANTALLA SIGUE REGISTRANDO.");
        }
        return;
    }
    if (estadoActual === "nivel8") {
        sonidoDecision();
        registroNivel8.interaccionesComputadora += 1;
        mensajeComputadoraNivel8.textContent = nivel8Fase === "final"
            ? "CREO QUE YA ESTÁS LISTO PARA VERLAS."
            : "NO HAY NADIE. NO DEBERÍA HABER NADIE.";
        return;
    }
    if (estadoActual === "nivel7") {
        sonidoDecision();
        registroNivel7.interaccionesComputadora += 1;
        if (nivel7Fase === "final") mensajeComputadoraNivel7.textContent = "LA PANTALLA ESTÁ APAGADA.";
        else if (nivel7Fase === "consentimiento") mensajeComputadoraNivel7.textContent = "EL SISTEMA ESPERA TU DECISIÓN.";
        else mensajeComputadoraNivel7.textContent = "NO HACE FALTA QUE ME RESPONDAS. PUEDO ESPERAR.";
        return;
    }
    if (estadoActual === "nivel6") {
        sonidoDecision();
        nivel6IntentosInteraccion += 1;
        registroNivel6.intentosComputadora += 1;
        if (nivel6Fase === "final") {
            mensajeComputadoraNivel6.textContent = "LA PANTALLA ESTÁ APAGADA.";
        } else if (nivel6Fase === "control-si") {
            mensajeComputadoraNivel6.textContent = "ME ALEGRA QUE ESTÉS TAN SEGURO.";
        } else if (nivel6Fase === "control-no") {
            mensajeComputadoraNivel6.textContent = "NO TE PREOCUPES. TODAVÍA PODEMOS HACER ALGO CON ESO.";
        } else {
            mensajeComputadoraNivel6.textContent = nivel6Mensajes[Math.max(0, nivel6IndiceInstruccion)] || "LA COMPUTADORA PARECE ESTAR ELIGIENDO POR VOS.";
        }
        return;
    }
    if (estadoActual === "nivel3") {
        sonidoDecision();
        if (respuestaNivel3 === "si") {
            iniciarNivel4("computadora");
        } else {
            mensajeNivel3.textContent = mensajeFinalNivel3 || "La pantalla permanece en silencio.";
        }
        return;
    }
    if (estadoActual === "nivel4") {
        sonidoDecision();
        if (respuestaNivel4 && reaccionNivel4Finalizada) {
            mensajeNivel4.textContent = mensajeComputadoraNivel4 || mensajeFinalNivel4;
        } else if (respuestaNivel4 === "no") {
            mensajeNivel4.textContent = "EL SISTEMA REGISTRÓ QUE MANTUVISTE TUS LÍMITES. LA COMPUTADORA BUSCARÁ OTRA MANERA.";
            mensajeComputadoraNivel4 = mensajeNivel4.textContent;
        } else {
            mensajeNivel4.textContent = "LA COMPUTADORA ESPERA TU RESPUESTA.";
        }
        return;
    }
    if (estadoActual === "nivel5") {
        sonidoDecision();
        registroNivel5.comprobaciones += 1;
        if (faseNivel5 === "fragmentos") {
            fragmentoNivel5.textContent = fragmentosNivel5.join("\n");
            mensajeNivel5.textContent = "LA COMPUTADORA NO DISTINGUE ENTRE LO QUE PASÓ Y LO QUE RECUERDA.";
        } else if (faseNivel5 === "pregunta1" || faseNivel5 === "reaccion1") {
            mensajeNivel5.textContent = !respuestaRecuerdosNivel5
                ? "LA COMPUTADORA ESPERA TU RESPUESTA."
                : respuestaRecuerdosNivel5 === "si"
                ? "QUÉ INTERESANTE. ESTÁS MUY SEGURO DE ALGO QUE NO PODÉS COMPROBAR."
                : "NO TE PREOCUPES. YO PUEDO RECORDAR POR VOS.";
        } else if (faseNivel5 === "pregunta2") {
            mensajeNivel5.textContent = respuestaBorrarNivel5
                ? "TU DECISIÓN QUEDÓ REGISTRADA. NO VAS A VER TODAS SUS CONSECUENCIAS AHORA."
                : "LA COMPUTADORA ESPERA UNA RESPUESTA.";
        } else if (faseNivel5 === "final" || faseNivel5 === "finalPendiente") {
            mensajeNivel5.textContent = registroNivel5.mensajeFinal;
        }
        return;
    }
    if (estadoActual === "computadora") {
        if (!pistaEntregada) {
            consultarPista();
            return;
        }

        // Si la pista ya fue leída, volver a pulsar la pantalla inquieta al sistema.
        sonidoDecision();
        comportamiento.presiones += 1;
        mensajeSistema.textContent = comportamiento.presiones === 1
            ? "NO ES NECESARIO QUE PRESIONES TANTAS VECES."
            : "YA TE ESCUCHÉ. DEJÁ DE PRESIONAR.";
        if (typeof crearParticulaRara === "function") crearParticulaRara();
        return;
    }
    if (estadoActual !== "habitacion" && estadoActual !== "puerta") return;
    sonidoDecision();
    panelAcceso.hidden = true;
    estadoActual = "computadora";
    nivelInterferencia = Math.max(nivelInterferencia, 1);
    document.getElementById("saludoSistema").innerHTML = '<span class="saludo-principal">BIENVENIDO DE NUEVO.</span><span class="saludo-instruccion">SEGUÍS EN LA SESIÓN.</span>';
    if (estadoPregunta === "ignorada") {
        estadoPregunta = "esperando";
        mensajeSistema.textContent = "VOLVAMOS A INTENTARLO. ¿QUÉ ESCUCHASTE?";
    }
    cambiarPantalla(computadora);
    iniciarTemporizadorPregunta();
}

function interactuarConPuerta() {
    if (estadoActual === "nivel9") {
        sonidoDecision();
        registroNivel9.intentosPuerta += 1;
        if (nivel9Fase === "final") {
            nivel9Fase = "terminado";
            iniciarNivel10();
        } else if (nivel9Fase === "terminado") {
            return;
        } else {
            mostrarMensajeNivel9("LA PUERTA NO SE ABRE. TODAVÍA HAY ALGO QUE TENÉS QUE ENCONTRAR.");
        }
        return;
    }
    if (estadoActual === "nivel8") {
        sonidoDecision();
        registroNivel8.intentosPuerta += 1;
        if (nivel8Fase === "final") iniciarNivel9();
        else mensajeComputadoraNivel8.textContent = "TODAVÍA NO. EL PASILLO SIGUE OBSERVÁNDOTE.";
        return;
    }
    if (estadoActual === "nivel7") {
        sonidoDecision();
        registroNivel7.intentosPuerta += 1;
        if (nivel7Finalizada) iniciarNivel8();
        else mensajeComputadoraNivel7.textContent = "LA PUERTA TODAVÍA NO SE ABRE.";
        return;
    }
    if (estadoActual === "nivel6") {
        sonidoDecision();
        nivel6IntentosInteraccion += 1;
        registroNivel6.intentosPuerta += 1;
        if (nivel6Fase === "final") iniciarNivel7();
        else mensajeComputadoraNivel6.textContent = "LA PUERTA TODAVÍA NO CEDE. LA COMPUTADORA SIGUE HABLANDO.";
        return;
    }
    if (estadoActual === "nivel7") return;
    if (estadoActual === "nivel4") {
        sonidoDecision();
        registroNivel4.intentosPuerta += 1;
        if (!respuestaNivel4) {
            mensajeNivel4.textContent = "La puerta no responde. La computadora espera una decisión.";
        } else if (!reaccionNivel4Finalizada) {
            mensajeNivel4.textContent = "La puerta sigue cerrada por ahora. El sistema continúa observando.";
        } else {
            iniciarNivel5();
        }
        return;
    }
    if (estadoActual === "nivel5") {
        sonidoDecision();
        registroNivel5.intentosPuerta += 1;
        if (faseNivel5 === "final") iniciarNivel6();
        else mensajeNivel5.textContent = "LA PUERTA SIGUE CERRADA. TODAVÍA FALTA ALGO.";
        return;
    }
    if (estadoActual === "nivel3") {
        sonidoDecision();
        if (!notaEncontrada) {
            avisoExplorar.textContent = "La puerta no responde. Explorá la habitación: el sistema quiere que encuentres algo.";
        } else if (!respuestaNivel3) {
            mensajeNivel3.textContent = "Leé la nota y respondé la pregunta antes de salir.";
        } else if (respuestaNivel3 === "si") {
            mensajeNivel3.textContent = "La puerta ya no está. La computadora señala otra salida.";
        } else {
            iniciarNivel4("puerta");
        }
        return;
    }
    if (estadoActual === "nivel2") {
        sonidoDecision();
        if (!respuestaNivel2) {
            mensajeNivel2.textContent = "La puerta sigue ahí. Primero respondé la pregunta.";
            return;
        }
        if (reaccionNivel2 === "destello") {
            mensajeNivel2.textContent = "Esperá a que la luz vuelva.";
            return;
        }
        iniciarNivel3();
        return;
    }
    if (estadoActual === "menu" || estadoActual === "puertaAbierta" || estadoActual === "nivel3") return;
    sonidoDecision();
    comportamiento.intentosSalida += 1;
    if (estadoActual === "computadora") {
        clearTimeout(temporizadorPregunta);
        if (estadoPregunta === "esperando") {
            comportamiento.mensajesIgnorados += 1;
            mensajeSistema.textContent = "VEO QUE NO TE GUSTA RESPONDER.";
            estadoPregunta = "ignorada";
        }
        cambiarPantalla(habitacion);
    }
    estadoActual = "puerta";
    intentosPuerta += 1;
    nivelInterferencia = Math.max(nivelInterferencia, Math.min(6, Math.ceil(intentosPuerta / 2)));
    textoHistoria.textContent = comportamiento.intentosSalida === 1
        ? "La puerta tiene un teclado. El sistema pide una secuencia de acceso."
        : "El teclado sigue esperando la secuencia. La computadora registra cada intento.";

    panelAcceso.hidden = false;
    formularioAcceso.hidden = !pistaEntregada;
    mensajeAcceso.textContent = pistaEntregada
        ? "INGRESÁ LA SECUENCIA DEL REGISTRO."
        : "NO HAY NINGUNA SECUENCIA CARGADA. VOLVÉ A LA COMPUTADORA Y LEÉ EL REGISTRO.";
    btnCerrarAcceso.textContent = "CANCELAR";
    if (pistaEntregada) {
        inputCodigoAcceso.value = "";
        inputCodigoAcceso.focus();
    }

    // Cuenta tanto tocar la puerta como enviar un código incorrecto.
    revisarSustoPorInsistencia();
}

function validarCodigoAcceso(evento) {
    evento.preventDefault();
    if (estadoActual !== "puerta" || !pistaEntregada) return;

    sonidoDecision();
    const codigoIngresado = inputCodigoAcceso.value.trim();
    if (codigoIngresado !== codigoPista.textContent.trim()) {
        intentosCodigoFallidos += 1;
        actualizarMusicaTerror();
        mensajeAcceso.textContent = "CÓDIGO INCORRECTO. EL SISTEMA NO ABRE LA PUERTA.";
        inputCodigoAcceso.value = "";
        nivelInterferencia = Math.min(6, nivelInterferencia + 1);
        if (typeof crearParticulaRara === "function") {
            crearParticulaRara();
            const criaturasExtra = Math.min(5, Math.max(0, intentosCodigoFallidos - 2));
            for (let i = 0; i < criaturasExtra; i++) crearParticulaRara();
        }
        if (intentosCodigoFallidos >= 3) sonidoErrorCodigo();
        revisarSustoPorInsistencia();
        return;
    }

    iniciarNivel2();
}

function iniciarNivel2() {
    estadoActual = "nivel2";
    respuestaNivel2 = null;
    reaccionNivel2 = "esperando";
    panelAcceso.hidden = true;
    panelNivel2.hidden = false;
    panelNivel3.hidden = true;
    formularioAcceso.hidden = true;
    btnComputadora.hidden = true;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "RESPONDER PARA AVANZAR";
    tituloNivel.textContent = "LEVEL 02";
    tituloHabitacion.textContent = "LA HABITACIÓN QUE TE DEVUELVE LA MIRADA";
    textoHistoria.textContent = respuestaActual === "si"
        ? "La puerta se abre y volvés a la misma habitación desde el otro lado. La figura junto a la computadora está torcida, con manchas oscuras en las manos."
        : respuestaActual === "no"
            ? "La puerta se abre y volvés a la misma habitación desde el otro lado. Todo parece casi igual. Tu doble permanece inmóvil, mirando hacia un lugar que no podés ver."
            : "La puerta se abre y volvés a la misma habitación desde el otro lado. Hay alguien junto a la computadora. Tiene tu misma forma.";
    cambiarPantalla(habitacion);
}

function responderNivel2(respuesta) {
    if (estadoActual !== "nivel2" || respuestaNivel2) return;
    sonidoDecision();
    respuestaNivel2 = respuesta;
    btnNivel2Si.disabled = true;
    btnNivel2No.disabled = true;
    btnNivel2Si.classList.toggle("seleccionada", respuesta === "si");
    btnNivel2No.classList.toggle("seleccionada", respuesta === "no");

    if (respuesta === "si") {
        reaccionNivel2 = "destello";
        btnPuerta.textContent = "ESPERÁ QUE VUELVA LA LUZ";
        mensajeNivel2.textContent = "Un destello te muestra al doble demasiado cerca.";
        setTimeout(function () {
            if (estadoActual !== "nivel2" || reaccionNivel2 !== "destello") return;
            reaccionNivel2 = "revelado";
            btnPuerta.textContent = "AVANZAR AL NIVEL 3";
            mensajeNivel2.textContent = "La luz vuelve. El doble ya no está ahí. La habitación quedó distinta.";
        }, 650);
    } else {
        reaccionNivel2 = "oculto";
        btnPuerta.textContent = "AVANZAR AL NIVEL 3";
        mensajeNivel2.textContent = "ENTONCES, ¿POR QUÉ SEGUÍS MIRANDO?";
    }
}

function iniciarNivel3() {
    clearTimeout(temporizadorGolpeNivel3);
    estadoActual = "nivel3";
    respuestaNivel3 = null;
    notaEncontrada = false;
    sombraPuertaVisible = false;
    sombraPuertaTocada = false;
    mensajeFinalNivel3 = "";
    golpeNivel3Reproducido = false;
    tiempoGolpeNivel3 = 0;
    tiempoEntradaNivel3 = Date.now();
    panelNivel2.hidden = true;
    panelNivel3.hidden = false;
    panelNivel4.hidden = true;
    preguntaNivel3.hidden = true;
    btnNivel3Si.disabled = false;
    btnNivel3No.disabled = false;
    btnNivel3Si.classList.remove("seleccionada");
    btnNivel3No.classList.remove("seleccionada");
    mensajeNivel3.textContent = "";
    avisoExplorar.textContent = "Explorá la habitación. Hay algo que el sistema quiere que encuentres.";
    tituloNivel.textContent = "LEVEL 03";
    tituloHabitacion.textContent = "LA NOTA Y LA SALIDA";
    textoHistoria.textContent = respuestaNivel2 === "si"
        ? "La puerta te devuelve a la misma habitación. En el espejo, tu doble parece moverse con un pequeño retraso."
        : "La puerta te devuelve a la misma habitación. Está más oscura; no ves al doble por ninguna parte.";
    document.getElementById("instruccionCanvas").textContent = "Explorá la escena y pasá el mouse por los objetos para encontrar algo escondido.";
    btnComputadora.hidden = true;
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "REVISAR LA PUERTA";
    cambiarPantalla(habitacion);

    temporizadorGolpeNivel3 = setTimeout(function () {
        if (estadoActual !== "nivel3" || golpeNivel3Reproducido) return;
        golpeNivel3Reproducido = true;
        sonidoGolpePuertaNivel3();
    }, 4200);
}

function encontrarNotaNivel3() {
    if (estadoActual !== "nivel3" || notaEncontrada) return;
    notaEncontrada = true;
    preguntaNivel3.hidden = false;
    avisoExplorar.textContent = "La nota estaba escondida entre los papeles. Leé lo que dice:";
    document.getElementById("instruccionCanvas").textContent = "La nota ya fue encontrada.";
}

function responderNivel3(respuesta) {
    if (estadoActual !== "nivel3" || !notaEncontrada || respuestaNivel3) return;
    sonidoDecision();
    respuestaNivel3 = respuesta;
    btnNivel3Si.disabled = true;
    btnNivel3No.disabled = true;
    btnNivel3Si.classList.toggle("seleccionada", respuesta === "si");
    btnNivel3No.classList.toggle("seleccionada", respuesta === "no");

    if (respuesta === "si") {
        sombraPuertaVisible = false;
        btnPuerta.hidden = true;
        btnComputadora.hidden = false;
        btnComputadora.textContent = "SALIR POR LA COMPUTADORA";
        document.getElementById("instruccionCanvas").textContent = "La puerta desapareció. Revisá la computadora para encontrar otra salida.";
        mensajeFinalNivel3 = "ENCONTRASTE LO QUE ESTABA ESCONDIDO. EL SISTEMA SEÑALA OTRA SALIDA.";
        mensajeNivel3.textContent = mensajeFinalNivel3;
    } else {
        sombraPuertaVisible = true;
        btnPuerta.hidden = false;
        btnPuerta.textContent = "AVANZAR AL NIVEL 4";
        btnComputadora.hidden = true;
        document.getElementById("instruccionCanvas").textContent = "La puerta sigue ahí. Podés tocar la sombra debajo o avanzar.";
        actualizarMensajeFinalNivel3();
    }
}

function tocarSombraPuertaNivel3() {
    if (estadoActual !== "nivel3" || !sombraPuertaVisible) return;
    sombraPuertaVisible = false;
    sombraPuertaTocada = true;
    sonidoDecision();
    actualizarMensajeFinalNivel3();
}

function actualizarMensajeFinalNivel3() {
    mensajeFinalNivel3 = "ENCONTRASTE LO QUE ESTABA ESCONDIDO.";
    if (sombraPuertaTocada) mensajeFinalNivel3 += " TAMBIÉN VISTE ESO.";
    mensajeNivel3.textContent = mensajeFinalNivel3;
}

function iniciarNivel4(salida) {
    if (estadoActual === "nivel3" && !golpeNivel3Reproducido) {
        clearTimeout(temporizadorGolpeNivel3);
        golpeNivel3Reproducido = true;
        sonidoGolpePuertaNivel3();
    }
    estadoActual = "nivel4";
    respuestaNivel4 = null;
    reaccionNivel4 = "";
    reaccionNivel4Finalizada = false;
    ambienteNivel4Alterado = true;
    mensajeComputadoraNivel4 = "";
    mensajeFinalNivel4 = "";
    mensajeMarcasHasta = 0;
    inicioNivel4 = Date.now();
    tiempoRespuestaNivel4 = 0;
    tiempoFinalNivel4 = 0;
    registroNivel4 = {
        respuesta: null,
        demoraMs: null,
        leyoInscripcion: false,
        inspeccionoMarcas: false,
        clicksMarcas: 0,
        intentosPuerta: 0,
        cambioRespuesta: false,
        insistenciasRespuesta: 0
    };
    clearTimeout(temporizadorReaccionNivel4);
    clearTimeout(temporizadorNormalizacionNivel4);
    clearInterval(temporizadorInterfazNivel4);
    document.body.dataset.rutaNivel4 = respuestaNivel3 === "si" ? "confio" : "no-confio";
    panelNivel3.hidden = true;
    panelNivel4.hidden = false;
    panelNivel5.hidden = true;
    panelNivel2.hidden = true;
    tituloNivel.textContent = "LEVEL 04";
    tituloHabitacion.textContent = "LO QUE ESTÁS DISPUESTO A PERDER";
    textoHistoria.textContent = salida === "computadora"
        ? "La computadora te dejó en la misma habitación. Algo cambió desde la última vez."
        : "La puerta te devolvió a la habitación. El sistema ya está esperando tu respuesta.";
    avisoNivel4.textContent = respuestaNivel3 === "si"
        ? "La habitación conserva su forma, pero está más oscura y deteriorada."
        : "La luz y la interfaz fallan por momentos. La habitación parece respirar.";
    mensajeNivel4.textContent = "";
    btnNivel4Si.disabled = false;
    btnNivel4No.disabled = false;
    btnNivel4Si.classList.remove("seleccionada");
    btnNivel4No.classList.remove("seleccionada");
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "PROBAR LA PUERTA";
    document.getElementById("instruccionCanvas").textContent = "Respondé y explorá la inscripción y las marcas del marco.";
    cambiarPantalla(habitacion);
    if (respuestaNivel3 === "no") activarTextoRotoNivel4();
}

function activarTextoRotoNivel4() {
    clearInterval(temporizadorInterfazNivel4);
    const pregunta = document.getElementById("preguntaNivel4");
    const textoOriginal = pregunta.textContent;
    temporizadorInterfazNivel4 = setInterval(function () {
        if (estadoActual !== "nivel4" || !ambienteNivel4Alterado) {
            pregunta.textContent = textoOriginal;
            clearInterval(temporizadorInterfazNivel4);
            return;
        }
        const indices = [];
        for (let i = 0; i < textoOriginal.length; i++) {
            if (/[a-záéíóúñ]/i.test(textoOriginal[i])) indices.push(i);
        }
        const indice = indices[Math.floor(Math.random() * indices.length)];
        const roto = textoOriginal.slice(0, indice) + "_" + textoOriginal.slice(indice + 1);
        pregunta.textContent = roto;
        setTimeout(function () {
            if (estadoActual === "nivel4" && pregunta.textContent === roto) pregunta.textContent = textoOriginal;
        }, 180);
    }, 1750);
}

function responderNivel4(respuesta) {
    if (estadoActual !== "nivel4" || reaccionNivel4Finalizada) return;
    sonidoDecision();
    if (respuestaNivel4 === respuesta) {
        registroNivel4.insistenciasRespuesta += 1;
        mensajeNivel4.textContent = "LA COMPUTADORA YA REGISTRÓ ESA RESPUESTA.";
        return;
    }

    if (respuestaNivel4 && respuestaNivel4 !== respuesta) registroNivel4.cambioRespuesta = true;
    if (!respuestaNivel4) registroNivel4.demoraMs = Date.now() - inicioNivel4;
    respuestaNivel4 = respuesta;
    registroNivel4.respuesta = respuesta;
    tiempoRespuestaNivel4 = Date.now();
    tiempoFinalNivel4 = 0;
    reaccionNivel4Finalizada = false;
    ambienteNivel4Alterado = true;
    clearTimeout(temporizadorReaccionNivel4);
    clearTimeout(temporizadorNormalizacionNivel4);
    btnNivel4Si.classList.toggle("seleccionada", respuesta === "si");
    btnNivel4No.classList.toggle("seleccionada", respuesta === "no");
    document.body.dataset.reaccionNivel4 = respuesta;

    if (respuesta === "si") {
        reaccionNivel4 = "sacrificio";
        mensajeComputadoraNivel4 = "SABÍA QUE ENCONTRARÍAMOS UNA SOLUCIÓN.";
        mensajeNivel4.textContent = "La habitación acepta tu decisión. La computadora parece satisfecha.";
    } else {
        reaccionNivel4 = "rechazo";
        mensajeComputadoraNivel4 = "EL SISTEMA REGISTRÓ QUE MANTUVISTE TUS LÍMITES.";
        mensajeNivel4.textContent = "La habitación rechaza tu decisión. Algo golpea y se mueve detrás de la puerta.";
        sonidoPuertaRechazoNivel4();
    }

    temporizadorReaccionNivel4 = setTimeout(finalizarReaccionNivel4, 4200);
}

function finalizarReaccionNivel4() {
    if (estadoActual !== "nivel4" || !respuestaNivel4) return;
    reaccionNivel4Finalizada = true;
    reaccionNivel4 = "finalizada";
    tiempoFinalNivel4 = Date.now();
    btnNivel4Si.disabled = true;
    btnNivel4No.disabled = true;
    btnPuerta.textContent = "AVANZAR AL NIVEL 5";
    delete document.body.dataset.reaccionNivel4;
    actualizarResultadoNivel4();

    if (respuestaNivel3 === "no") {
        temporizadorNormalizacionNivel4 = setTimeout(function () {
            if (estadoActual !== "nivel4") return;
            ambienteNivel4Alterado = false;
            delete document.body.dataset.rutaNivel4;
            clearInterval(temporizadorInterfazNivel4);
            document.getElementById("preguntaNivel4").textContent = "Si perder una parte de vos fuera la única manera de escapar, ¿lo harías?";
        }, 1800);
    }
}

function actualizarResultadoNivel4() {
    mensajeFinalNivel4 = registroNivel4.intentosPuerta >= 3
        ? "NO TODOS LOS CAMINOS LLEVAN A DONDE QUERÉS"
        : registroNivel4.clicksMarcas > 0
            ? "TE GUSTA BUSCAR RESPUESTAS, ¿NO?"
            : "A VECES ES MEJOR NO HACER PREGUNTAS";
    const registroDecision = respuestaNivel4 === "si"
        ? "SABÍA QUE ENCONTRARÍAMOS UNA SOLUCIÓN."
        : "EL SISTEMA REGISTRÓ QUE MANTUVISTE TUS LÍMITES.";
    mensajeComputadoraNivel4 = registroDecision + " " + mensajeFinalNivel4;
    mensajeNivel4.textContent = mensajeFinalNivel4;
}

function leerInscripcionNivel4() {
    registroNivel4.leyoInscripcion = true;
    mensajeNivel4.textContent = "SI PODÉS LEER ESTO, TODAVÍA ESTÁS A TIEMPO. NO CONFÍES EN LO QUE TE MUESTRA. HUÍ SI PODÉS. Nadie sabe quién lo escribió.";
}

function investigarMarcasNivel4() {
    registroNivel4.inspeccionoMarcas = true;
    registroNivel4.clicksMarcas += 1;
    const clicks = registroNivel4.clicksMarcas;
    if (clicks >= 4 && mensajeMarcasHasta < Date.now()) {
        mensajeMarcasHasta = Date.now() + 1900;
        mensajeNivel4.textContent = "QUÉ FÁCIL ES CONSEGUIR QUE BUSQUES ALGO QUE NO EXISTE";
        setTimeout(function () {
            if (estadoActual !== "nivel4" || Date.now() < mensajeMarcasHasta) return;
            if (reaccionNivel4Finalizada) actualizarResultadoNivel4();
            else mensajeNivel4.textContent = "La habitación vuelve a quedarse en silencio.";
        }, 1950);
        return;
    }
    if (reaccionNivel4Finalizada) {
        actualizarResultadoNivel4();
    } else {
        mensajeNivel4.textContent = clicks === 1
            ? "Los arañazos parecen seguir alrededor del marco."
            : "Las marcas cambian cuando las mirás. No hay nada que confirme de qué lado vinieron.";
    }
}

function iniciarNivel5() {
    estadoActual = "nivel5";
    panelNivel4.hidden = true;
    panelNivel5.hidden = false;
    panelNivel6.hidden = true;
    tituloNivel.textContent = "LEVEL 05";
    tituloHabitacion.textContent = "LO QUE RECORDÁS NO NECESARIAMENTE PASÓ";
    textoHistoria.textContent = "La habitación parece ordenada de nuevo. La computadora se enciende sola.";
    document.getElementById("avisoNivel5").textContent = respuestaNivel3 === "si"
        ? "Todo parece limpio y tranquilo. La luz es tenue, pero estable. Tu sombra tarda un instante en seguirte."
        : "Algunos objetos están fuera de lugar. La luz falla y quedan errores en la interfaz. Tu sombra no coincide del todo.";
    fragmentoNivel5.textContent = "";
    mensajeNivel5.textContent = "";
    preguntaRecuerdosNivel5.hidden = true;
    preguntaBorrarNivel5.hidden = true;
    respuestaRecuerdosNivel5 = null;
    respuestaBorrarNivel5 = null;
    faseNivel5 = "fragmentos";
    inicioNivel5 = Date.now();
    fragmentosNivel5 = crearFragmentosNivel5();
    registroNivel5 = {
        respuestaNivel2: respuestaNivel2,
        respuestaNivel1: respuestaActual,
        respuestaNivel3: respuestaNivel3,
        respuestaNivel4: respuestaNivel4,
        respuestaPreguntaMemoria: null,
        aceptoBorrarRecuerdo: null,
        contradicciones: 1,
        demoraMs: null,
        demoraNivel4Ms: registroNivel4.demoraMs,
        investigoSombra: false,
        clicsSombra: 0,
        comprobaciones: 0,
        intentosPuerta: 0,
        fragmentosMostrados: fragmentosNivel5.slice(),
        mensajeFinal: ""
    };
    document.body.dataset.rutaNivel5 = respuestaNivel3 === "si" ? "confio" : "dudo";
    document.getElementById("instruccionCanvas").textContent = "Leé los recuerdos. También podés tocar la sombra y revisar la computadora.";
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "PROBAR LA PUERTA";
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    clearInterval(temporizadorInterfazNivel4);
    clearTimeout(temporizadorReaccionNivel4);
    clearTimeout(temporizadorNormalizacionNivel4);
    delete document.body.dataset.rutaNivel4;
    delete document.body.dataset.reaccionNivel4;
    reproducirFragmentosNivel5();
    cambiarPantalla(habitacion);
}

function crearFragmentosNivel5() {
    const respuestaInicial = respuestaActual === "si" ? "DIJISTE QUE SÍ ESCUCHASTE ALGO." : "DIJISTE QUE NO ESCUCHASTE NADA.";
    const respuestaRegistrada = respuestaNivel2 === "si" ? "SÍ, DIJISTE QUE QUERÍAS SABERLO." : "NO, DIJISTE QUE PREFERÍAS NO SABERLO.";
    const respuestaMemoria = respuestaNivel3 === "si" ? "DIJISTE QUE IBAS A CONFIAR EN EL CAMINO." : "DIJISTE QUE NO CONFIABAS EN EL CAMINO.";
    const respuestaUltima = respuestaNivel4 === "si" ? "ACEPTASTE PERDER UNA PARTE DE VOS." : "TE NEGASTE A PERDER UNA PARTE DE VOS.";
    const fraseAlterada = respuestaNivel2 === "si"
        ? "REGISTRO: DIJISTE QUE NO QUERÍAS SABERLO."
        : "REGISTRO: DIJISTE QUE SÍ QUERÍAS SABERLO.";
    const lista = [
        "REGISTRO 01: " + respuestaInicial,
        "REGISTRO 02: " + respuestaRegistrada,
        "REGISTRO 03: " + respuestaMemoria,
        "REGISTRO 04: " + respuestaUltima,
        fraseAlterada
    ];
    if ((registroNivel4.demoraMs || 0) > 8000) lista.push("REGISTRO DE ESPERA: ESPERASTE MUCHO MÁS DE LO QUE RECORDÁS.");
    if (registroNivel4.intentosPuerta > 0) lista.push("REGISTRO DE PUERTA: INTENTASTE ESCAPAR " + registroNivel4.intentosPuerta + " VECES.");
    else lista.push("REGISTRO DE PUERTA: INTENTASTE ABRIRLA 3 VECES.");
    return lista;
}

function reproducirFragmentosNivel5() {
    clearInterval(temporizadorFragmentosNivel5);
    fragmentoNivel5.textContent = "";
    let indice = 0;
    temporizadorFragmentosNivel5 = setInterval(function () {
        if (estadoActual !== "nivel5" || faseNivel5 !== "fragmentos") {
            clearInterval(temporizadorFragmentosNivel5);
            return;
        }
        fragmentoNivel5.textContent += (indice ? "\n" : "") + fragmentosNivel5[indice];
        indice += 1;
        if (indice >= fragmentosNivel5.length) {
            clearInterval(temporizadorFragmentosNivel5);
            faseNivel5 = "pregunta1";
            document.getElementById("preguntaRecuerdosNivel5").hidden = false;
        }
    }, 1700);
}

function responderRecuerdosNivel5(respuesta) {
    if (estadoActual !== "nivel5" || faseNivel5 !== "pregunta1") return;
    sonidoDecision();
    respuestaRecuerdosNivel5 = respuesta;
    registroNivel5.respuestaPreguntaMemoria = respuesta;
    registroNivel5.demoraMs = Date.now() - inicioNivel5;
    if (respuesta === "si") {
        fragmentoNivel5.textContent = "";
        mensajeNivel5.textContent = "QUÉ INTERESANTE. ESTÁS MUY SEGURO DE ALGO QUE NO PODÉS COMPROBAR.";
        faseNivel5 = "reaccion1";
    } else {
        fragmentoNivel5.textContent = fragmentosNivel5.join("\n");
        mensajeNivel5.textContent = "NO TE PREOCUPES. YO PUEDO RECORDAR POR VOS.";
        document.body.dataset.rutaNivel5 = "estable";
        faseNivel5 = "reaccion1";
    }
    setTimeout(function () {
        if (estadoActual !== "nivel5" || faseNivel5 !== "reaccion1") return;
        faseNivel5 = "pregunta2";
        preguntaBorrarNivel5.hidden = false;
        mensajeNivel5.textContent = "¿QUÉ ESTÁS DISPUESTO A ENTREGAR PARA ESCAPAR?";
    }, 4200);
}

function responderBorrarNivel5(respuesta) {
    if (estadoActual !== "nivel5" || faseNivel5 !== "pregunta2") return;
    sonidoDecision();
    respuestaBorrarNivel5 = respuesta;
    registroNivel5.aceptoBorrarRecuerdo = respuesta === "si";
    if (respuesta === "si") registroNivel5.contradicciones += 1;
    preguntaBorrarNivel5.hidden = true;
    faseNivel5 = "finalPendiente";
    if (respuestaRecuerdosNivel5 === "no") {
        registroNivel5.mensajeFinal = "CADA VEZ NECESITÁS MENOS DE TU PROPIA MEMORIA";
    } else if (respuestaNivel3 === "si") {
        registroNivel5.mensajeFinal = "NO TENÉS QUE RECORDARLO TODO. PARA ESO ESTOY YO";
    } else {
        registroNivel5.mensajeFinal = "NO PODÉS ESTAR SEGURO DE NADA SI NO PODÉS CONFIAR EN TU PROPIA MEMORIA";
    }
    mensajeNivel5.textContent = respuesta === "si"
        ? "EL SISTEMA REGISTRA QUE ESTÁS DISPUESTO A ENTREGAR PARTE DE TU IDENTIDAD."
        : "EL SISTEMA REGISTRA QUE TODAVÍA INTENTÁS CONSERVAR EL CONTROL.";
    setTimeout(function () {
        if (estadoActual !== "nivel5" || faseNivel5 !== "finalPendiente") return;
        faseNivel5 = "final";
        mensajeNivel5.textContent = registroNivel5.mensajeFinal;
        btnPuerta.textContent = "AVANZAR AL NIVEL 6";
        fragmentoNivel5.textContent = "";
    }, 2600);
}

function iniciarNivel6() {
    estadoActual = "nivel6";
    panelNivel5.hidden = true;
    panelNivel6.hidden = false;
    panelNivel7.hidden = true;
    tituloNivel.textContent = "LEVEL 06";
    tituloHabitacion.textContent = "EL LUGAR QUE NO DEBERÍA EXISTIR";
    textoHistoria.textContent = "La puerta se cierra. El cuarto se estira hacia un lugar que no debería existir.";
    document.getElementById("avisoNivel6").textContent = respuestaRecuerdosNivel5 === "no"
        ? "La habitación mezcla sectores limpios con otros deteriorados. Los objetos cambian cuando dejás de mirarlos."
        : respuestaBorrarNivel5
            ? "Todo parece limpio y ordenado, aunque las proporciones no coinciden. Hay objetos duplicados y otros que faltan."
            : "La habitación está oscura y torcida. Las grietas, manchas y arañazos de antes vuelven a aparecer.";
    mensajeComputadoraNivel6.textContent = "";
    preguntaNivel6.hidden = true;
    btnNivel6Si.disabled = false;
    btnNivel6No.disabled = false;
    btnNivel6Si.classList.remove("seleccionada");
    btnNivel6No.classList.remove("seleccionada");
    respuestaNivel6 = null;
    inicioNivel6 = Date.now();
    nivel6Ruta = respuestaRecuerdosNivel5 === "no" ? "dudo" : respuestaBorrarNivel5 ? "borro" : "rechazo";
    nivel6Fase = "mensajes";
    nivel6IndiceInstruccion = -1;
    nivel6RespuestaMs = 0;
    nivel6TiempoQuietoMs = 0;
    nivel6MovimientosMouse = 0;
    nivel6IntentosInteraccion = 0;
    nivel6PerdidasControl = 0;
    nivel6InstruccionesSeguidas = 0;
    nivel6InstruccionesContadas = {};
    nivel6UltimoMovimiento = Date.now();
    nivel6UltimaMuestra = Date.now();
    nivel6MouseQuietoDesde = Date.now();
    nivel6FiguraTocada = false;
    nivel6PausaMarcada = false;
    nivel6AutonomiaMarcada = false;
    nivel6PosicionAlterada = false;
    nivel6InversionRegistrada = false;
    nivel6UltimoAvisoPausa = 0;
    nivel6PosicionInicial = { x: 250, y: 0 };
    registroNivel6 = {
        respuestaRecuerdosNivel5: respuestaRecuerdosNivel5,
        aceptoBorrarRecuerdo: respuestaBorrarNivel5,
        respuestaControl: null,
        demoraMs: null,
        tiempoMouseQuietoMs: 0,
        movimientosMouse: 0,
        intentosComputadora: 0,
        intentosPuerta: 0,
        instruccionesSeguidas: 0,
        instruccionesMostradas: [],
        interaccionesFigura: 0,
        interaccionesComputadora: 0,
        seAcercoComputadora: false,
        seAcercoPuerta: false,
        perdidasControl: 0
    };
    document.body.dataset.rutaNivel6 = nivel6Ruta;
    document.getElementById("instruccionCanvas").textContent = "Mové el mouse para guiar al personaje. No va a responder siempre como esperás.";
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "PROBAR LA PUERTA";
    delete document.body.dataset.rutaNivel5;
    clearTimeout(nivel6Temporizador);
    clearTimeout(nivel6TemporizadorFinal);
    nivel6Temporizador = setTimeout(avanzarMensajeComputadoraNivel6, 2600);
    cambiarPantalla(habitacion);
}

const nivel6Mensajes = [
    "¿VES? TODAVÍA PODÉS MOVERTE.",
    "NO TENÉS QUE HACER NADA. YO PUEDO AYUDARTE.",
    "ACERCATE A LA PUERTA.",
    "MIRÁ HACIA LA IZQUIERDA.",
    "NO TE QUEDES QUIETO.",
    "SEGUÍ MOVIÉNDOTE.",
    "MUY BIEN. ESTÁS HACIENDO EXACTAMENTE LO QUE TE PEDÍ."
];

function avanzarMensajeComputadoraNivel6() {
    if (estadoActual !== "nivel6" || nivel6Fase !== "mensajes") return;
    if (nivel6IndiceInstruccion >= 0) registrarSeguimientoInstruccionNivel6(nivel6IndiceInstruccion);
    nivel6IndiceInstruccion += 1;
    if (nivel6IndiceInstruccion >= nivel6Mensajes.length) {
        nivel6Fase = "pregunta";
        preguntaNivel6.hidden = false;
        mensajeComputadoraNivel6.textContent = "SI YO PUEDO CONTROLAR LO QUE HACÉS, ¿REALMENTE ESTÁS ELIGIENDO?";
        return;
    }
    const mensaje = nivel6Mensajes[nivel6IndiceInstruccion];
    mensajeComputadoraNivel6.textContent = mensaje;
    registroNivel6.instruccionesMostradas.push(mensaje);
    nivel6Temporizador = setTimeout(avanzarMensajeComputadoraNivel6, 1800);
}

function registrarSeguimientoInstruccionNivel6(indice) {
    if (indice < 2 || nivel6InstruccionesContadas[indice]) return;
    nivel6InstruccionesContadas[indice] = true;
    const x = typeof posicionJugadorNivel6 !== "undefined" ? posicionJugadorNivel6.x : 250;
    const seMovioReciente = Date.now() - nivel6UltimoMovimiento < 800;
    const obedecio = indice === 2 ? x > 325
        : indice === 3 ? x < 190
            : indice === 4 || indice === 5 ? seMovioReciente
                : false;
    if (obedecio) nivel6InstruccionesSeguidas += 1;
    registroNivel6.instruccionesSeguidas = nivel6InstruccionesSeguidas;
    registroNivel6.instruccionesAcertadas = (registroNivel6.instruccionesAcertadas || 0) + (obedecio ? 1 : 0);
}

function responderNivel6(respuesta) {
    if (estadoActual !== "nivel6" || nivel6Fase !== "pregunta") return;
    sonidoDecision();
    respuestaNivel6 = respuesta;
    nivel6RespuestaMs = Date.now();
    nivel6AutonomiaMarcada = false;
    registroNivel6.respuestaControl = respuesta;
    registroNivel6.demoraMs = Date.now() - (inicioNivel6 + 2600 + nivel6Mensajes.length * 1800);
    preguntaNivel6.hidden = true;
    btnNivel6Si.disabled = true;
    btnNivel6No.disabled = true;
    btnNivel6Si.classList.toggle("seleccionada", respuesta === "si");
    btnNivel6No.classList.toggle("seleccionada", respuesta === "no");
    if (respuesta === "si") {
        nivel6Fase = "control-si";
        mensajeComputadoraNivel6.textContent = "POR SUPUESTO. NUNCA DIJE LO CONTRARIO.";
        nivel6TemporizadorFinal = setTimeout(iniciarEstabilizacionNivel6, 4300);
    } else {
        nivel6Fase = "control-no";
        mensajeComputadoraNivel6.textContent = "";
        nivel6TemporizadorFinal = setTimeout(function () {
            if (estadoActual !== "nivel6" || nivel6Fase !== "control-no") return;
            mensajeComputadoraNivel6.textContent = "ENTONCES, ¿POR QUÉ SEGUÍS HACIENDO LO QUE TE PIDO?";
            nivel6TemporizadorFinal = setTimeout(iniciarEstabilizacionNivel6, 2600);
        }, 1800);
    }
}

function iniciarEstabilizacionNivel6() {
    if (estadoActual !== "nivel6") return;
    nivel6Fase = "estabiliza";
    if (respuestaNivel6 === "si") {
        mensajeComputadoraNivel6.textContent = "ME ALEGRA QUE ESTÉS TAN SEGURO.";
    } else {
        mensajeComputadoraNivel6.textContent = "NO TE PREOCUPES. TODAVÍA PODEMOS HACER ALGO CON ESO.";
    }
    nivel6TemporizadorFinal = setTimeout(function () {
        if (estadoActual !== "nivel6") return;
        nivel6Fase = "normalidad";
        mensajeComputadoraNivel6.textContent = "NO TE PREOCUPES. ESTO ES NORMAL.";
        nivel6TemporizadorFinal = setTimeout(function () {
            if (estadoActual !== "nivel6") return;
            mensajeComputadoraNivel6.textContent = "AUNQUE NO DEBERÍA ESTAR PASANDO.";
            nivel6TemporizadorFinal = setTimeout(finalizarNivel6, 2400);
        }, 1900);
    }, 1500);
}

function finalizarNivel6() {
    if (estadoActual !== "nivel6") return;
    nivel6Fase = "cierre";
    registroNivel6.perdidasControl = nivel6PerdidasControl;
    registroNivel6.tiempoMouseQuietoMs = nivel6TiempoQuietoMs;
    const finales = respuestaNivel6 === "si"
        ? "ME GUSTA QUE TENGAS CONFIANZA EN VOS MISMO."
        : "RECONOCER ALGO NO SIGNIFICA QUE PUEDAS DETENERLO.";
    mensajeComputadoraNivel6.textContent = finales;
    setTimeout(function () {
        if (estadoActual !== "nivel6" || nivel6Fase !== "cierre") return;
        mensajeComputadoraNivel6.textContent = "NO ERA A VOS A QUIEN TENÍA QUE ESTAR CONTROLANDO.";
        setTimeout(function () {
            if (estadoActual !== "nivel6" || nivel6Fase !== "cierre") return;
            nivel6Fase = "final";
            mensajeComputadoraNivel6.textContent = "";
            btnPuerta.textContent = "AVANZAR AL NIVEL 7";
            document.getElementById("instruccionCanvas").textContent = "La computadora se apagó. La puerta está disponible.";
        }, 280);
    }, 2800);
}

function iniciarNivel7() {
    estadoActual = "nivel7";
    panelNivel6.hidden = true;
    panelNivel7.hidden = false;
    panelNivel8.hidden = true;
    tituloNivel.textContent = "LEVEL 07";
    tituloHabitacion.textContent = "¿HAY ALGUIEN AHÍ?";
    textoHistoria.textContent = "La habitación conserva algunas deformaciones. La computadora está encendida, pero no muestra nada.";
    document.getElementById("avisoNivel7").textContent = "La computadora está encendida desde el principio. No hay ningún mensaje en la pantalla.";
    mensajeComputadoraNivel7.textContent = "";
    permisoMicrofonoNivel7.hidden = true;
    preguntaNivel7.hidden = true;
    btnPermitirMicrofonoNivel7.disabled = false;
    btnRechazarMicrofonoNivel7.disabled = false;
    nivel7Fase = "entrada";
    nivel7MensajeIndice = 0;
    nivel7Permiso = "sin-responder";
    nivel7Respuesta = null;
    nivel7TiempoInicio = Date.now();
    nivel7UltimaMuestraMic = nivel7TiempoInicio;
    nivel7UltimoSonido = 0;
    nivel7UltimoMensajeSonido = 0;
    nivel7UltimoMomentoSilencioso = nivel7TiempoInicio;
    nivel7SilencioAcumuladoMs = 0;
    nivel7MuestrasMicrofono = 0;
    nivel7TipoUltimoSonido = "";
    nivel7RespuestaPresencia = false;
    nivel7FiguraTocada = false;
    nivel7FiguraAparece = false;
    nivel7Finalizada = false;
    nivel7SombraPuerta = false;
    nivel7FiguraDetras = false;
    nivel7InsectosDetenidos = false;
    nivel7ErroresMic = "";
    posicionJugadorNivel7.x = 250;
    posicionJugadorNivel7.y = 0;
    objetivoJugadorNivel7.x = 250;
    objetivoJugadorNivel7.y = 0;
    nivel7UltimoMovimientoMouse = Date.now();
    nivel7UltimaActualizacionMovimiento = Date.now();
    nivel7MovimientosMouse = 0;
    nivel7GiroAutonomoRegistrado = false;
    nivel7TiempoMouseQuietoMs = 0;
    document.querySelectorAll("[data-respuesta-nivel7]").forEach(function (boton) {
        boton.disabled = false;
        boton.classList.remove("seleccionada");
    });
    registroNivel7 = {
        permisoMicrofono: null,
        sonidosDetectados: 0,
        vocesDetectadas: 0,
        ruidosDetectados: 0,
        tiempoSilencioMs: 0,
        respuesta: null,
        interaccionesFigura: 0,
        duracionMs: 0,
        respuestaNivel5: respuestaRecuerdosNivel5,
        respuestaNivel6: respuestaNivel6,
        intentosComputadora: 0,
        intentosPuerta: 0,
        reaccionPresencia: null
    };
    document.body.dataset.rutaNivel7 = "vigilancia";
    document.getElementById("instruccionCanvas").textContent = "La habitación parece estar esperando algo.";
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "PROBAR LA PUERTA";
    delete document.body.dataset.rutaNivel6;
    clearTimeout(nivel7Temporizador);
    clearTimeout(nivel7AudioTemporizador);
    clearInterval(nivel7SonidosDetector);
    clearInterval(nivel7EscrituraIntervalo);
    finalizarMicrofonoNivel7();
    cambiarPantalla(habitacion);
    nivel7Temporizador = setTimeout(function () {
        if (estadoActual !== "nivel7") return;
        nivel7Fase = "consentimiento";
        escribirMensajeNivel7("PARA CONTINUAR, NECESITO COMPROBAR ALGO.", function () {
            permisoMicrofonoNivel7.hidden = false;
        });
    }, 1800);
}

function escribirMensajeNivel7(mensaje, alTerminar) {
    clearInterval(nivel7EscrituraIntervalo);
    nivel7TextoPendiente = mensaje;
    nivel7Escribiendo = true;
    mensajeComputadoraNivel7.textContent = "";
    let indice = 0;
    nivel7EscrituraIntervalo = setInterval(function () {
        if (estadoActual !== "nivel7") {
            clearInterval(nivel7EscrituraIntervalo);
            nivel7Escribiendo = false;
            return;
        }
        indice += 1;
        mensajeComputadoraNivel7.textContent = mensaje.slice(0, indice);
        if (indice % 3 === 0) sonidoTeclaNivel7();
        if (indice >= mensaje.length) {
            clearInterval(nivel7EscrituraIntervalo);
            nivel7Escribiendo = false;
            if (alTerminar) alTerminar();
        }
    }, 31);
}

async function aceptarMicrofonoNivel7() {
    if (estadoActual !== "nivel7" || nivel7Fase !== "consentimiento") return;
    btnPermitirMicrofonoNivel7.disabled = true;
    btnRechazarMicrofonoNivel7.disabled = true;
    nivel7Permiso = "aceptado";
    registroNivel7.permisoMicrofono = "aceptado";
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        nivel7Permiso = "no-disponible";
        registroNivel7.permisoMicrofono = "no-disponible";
        nivel7ErroresMic = "El navegador no ofrece acceso al micrófono.";
        document.getElementById("avisoNivel7").textContent = "No se pudo acceder al micrófono. El nivel continúa sin escucharlo.";
        comenzarVigilanciaNivel7();
        return;
    }
    try {
        nivel7StreamMicrofono = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!contextoAudio) contextoAudio = new AudioContext();
        if (contextoAudio.state === "suspended") await contextoAudio.resume();
        nivel7AnalizadorMicrofono = contextoAudio.createAnalyser();
        nivel7AnalizadorMicrofono.fftSize = 1024;
        nivel7FuenteMicrofono = contextoAudio.createMediaStreamSource(nivel7StreamMicrofono);
        nivel7FuenteMicrofono.connect(nivel7AnalizadorMicrofono);
        nivel7Permiso = "activo";
        registroNivel7.permisoMicrofono = "activo";
        document.getElementById("avisoNivel7").textContent = "Micrófono activo. El juego analiza el nivel y el tipo aproximado de sonido, sin grabarlo.";
        nivel7SonidosDetector = setInterval(analizarMicrofonoNivel7, 250);
        comenzarVigilanciaNivel7();
    } catch (error) {
        nivel7Permiso = "error";
        registroNivel7.permisoMicrofono = "error";
        nivel7ErroresMic = error && error.name ? error.name : "acceso denegado";
        document.getElementById("avisoNivel7").textContent = "No se obtuvo permiso. El sistema continuará sin usar el micrófono.";
        comenzarVigilanciaNivel7();
    }
}

function rechazarMicrofonoNivel7() {
    if (estadoActual !== "nivel7" || nivel7Fase !== "consentimiento") return;
    nivel7Permiso = "rechazado";
    registroNivel7.permisoMicrofono = "rechazado";
    permisoMicrofonoNivel7.hidden = true;
    document.getElementById("avisoNivel7").textContent = "El micrófono está desactivado. El nivel continúa sin esa mecánica.";
    sonidoInterferenciaNivel7();
    escribirMensajeNivel7("NO QUERÉS QUE TE ESCUCHE. ESTÁ BIEN.", comenzarVigilanciaNivel7);
}

function comenzarVigilanciaNivel7() {
    if (estadoActual !== "nivel7") return;
    permisoMicrofonoNivel7.hidden = true;
    nivel7Fase = "vigilancia";
    iniciarSonidosAmbienteNivel7();
    avanzarMensajeVigilanciaNivel7();
}

function avanzarMensajeVigilanciaNivel7() {
    if (estadoActual !== "nivel7" || nivel7Fase !== "vigilancia") return;
    if (nivel7MensajeIndice >= mensajesVigilanciaNivel7.length) {
        nivel7Fase = "prueba-presencia";
        nivel7RespuestaPresencia = false;
        escribirMensajeNivel7("¿HAY ALGUIEN AHÍ?", function () {
            nivel7Temporizador = setTimeout(finalizarPruebaPresenciaNivel7, 6200);
        });
        return;
    }
    const mensaje = mensajesVigilanciaNivel7[nivel7MensajeIndice++];
    escribirMensajeNivel7(mensaje, function () {
        nivel7Temporizador = setTimeout(avanzarMensajeVigilanciaNivel7, 950);
    });
}

function analizarMicrofonoNivel7() {
    if ((estadoActual !== "nivel7" && estadoActual !== "nivel8") || !nivel7AnalizadorMicrofono || nivel7Permiso !== "activo") return;
    const ahora = Date.now();
    const muestras = new Float32Array(nivel7AnalizadorMicrofono.fftSize);
    const frecuencias = new Uint8Array(nivel7AnalizadorMicrofono.frequencyBinCount);
    nivel7AnalizadorMicrofono.getFloatTimeDomainData(muestras);
    nivel7AnalizadorMicrofono.getByteFrequencyData(frecuencias);
    let sumaCuadrados = 0;
    for (let i = 0; i < muestras.length; i++) sumaCuadrados += muestras[i] * muestras[i];
    const rms = Math.sqrt(sumaCuadrados / muestras.length);
    const deltaSilencio = ahora - (nivel7UltimaMuestraMic || ahora);
    nivel7UltimaMuestraMic = ahora;
    if (estadoActual === "nivel7" && ahora - nivel7UltimoSonido > 750) {
        nivel7SilencioAcumuladoMs += Math.min(500, deltaSilencio);
        registroNivel7.tiempoSilencioMs = nivel7SilencioAcumuladoMs;
    } else if (estadoActual === "nivel8" && ahora - nivel8UltimoSonido > 11000 && ahora - nivel8UltimoRespiro > 14000 && rms < 0.026) {
        nivel8UltimoRespiro = ahora;
        registroNivel8.reaccionoARuido = true;
        mensajeComputadoraNivel8.textContent = "UNA RESPIRACIÓN LLEGA DESDE EL FONDO.";
        sonidoEventoNivel8("respiracion");
    }

    if (rms < 0.026 || ahora - nivel7UltimoSonido < 1150) {
        if (nivel7Fase === "vigilancia" && nivel7SilencioAcumuladoMs > 9000 && ahora - nivel7UltimoMensajeSonido > 14000) {
            nivel7UltimoMensajeSonido = ahora;
            escribirMensajeNivel7("QUÉ TRANQUILO ESTÁ TODO...", function () {
                if (nivel7Fase === "vigilancia") nivel7Escribiendo = false;
            });
        }
        return;
    }

    const inicioVoz = Math.floor(100 / (contextoAudio.sampleRate / nivel7AnalizadorMicrofono.fftSize));
    const finVoz = Math.min(frecuencias.length, Math.floor(1700 / (contextoAudio.sampleRate / nivel7AnalizadorMicrofono.fftSize)));
    let energiaVoz = 0;
    let energiaTotal = 0;
    for (let i = 0; i < frecuencias.length; i++) {
        const energia = frecuencias[i] * frecuencias[i];
        energiaTotal += energia;
        if (i >= inicioVoz && i <= finVoz) energiaVoz += energia;
    }
    const proporcionVoz = energiaTotal ? energiaVoz / energiaTotal : 0;
    const esVozAproximada = rms < 0.20 && proporcionVoz > 0.57;
    const categoria = rms > 0.19 ? "ruido-fuerte" : esVozAproximada ? "voz" : "ruido";
    nivel7UltimoSonido = ahora;
    nivel7UltimoMomentoSilencioso = ahora;
    nivel7TipoUltimoSonido = categoria;
    nivel7SilencioAcumuladoMs = 0;
    registroNivel7.sonidosDetectados += 1;
    if (categoria === "voz") registroNivel7.vocesDetectadas += 1;
    else registroNivel7.ruidosDetectados += 1;

    if (estadoActual === "nivel8") {
        reaccionSonidoNivel8(categoria);
        return;
    }

    if (nivel7Fase === "prueba-presencia") {
        nivel7RespuestaPresencia = true;
        registroNivel7.reaccionPresencia = "sonido-detectado";
    } else if (nivel7Fase === "vigilancia" && !nivel7Escribiendo && ahora - nivel7UltimoMensajeSonido > 5400) {
        nivel7UltimoMensajeSonido = ahora;
        const mensaje = categoria === "voz"
            ? nivel7UltimoSonido - nivel7TiempoInicio > 14000 ? "AH, PENSÉ QUE TE HABÍAS IDO." : "¿ESTÁS HABLANDO CON ALGUIEN?"
            : categoria === "ruido-fuerte"
                ? "ESO FUE BASTANTE RUIDOSO."
                : registroNivel7.sonidosDetectados >= 3
                    ? "PARECE QUE TENÉS MUCHO PARA DECIR."
                    : "TE ESCUCHÉ.";
        escribirMensajeNivel7(mensaje);
    }
}

function finalizarPruebaPresenciaNivel7() {
    if (estadoActual !== "nivel7" || nivel7Fase !== "prueba-presencia") return;
    registroNivel7.reaccionPresencia = nivel7RespuestaPresencia ? "te-escuche" : "no-te-escondas";
    escribirMensajeNivel7(nivel7RespuestaPresencia ? "TE ESCUCHÉ." : "NO TENÉS QUE ESCONDERTE.", function () {
        nivel7Temporizador = setTimeout(function () {
            nivel7Fase = "anomalia-sonido";
            nivel7FiguraAparece = true;
            nivel7InsectosDetenidos = true;
            sonidoEventoNivel7(nivel7TipoUltimoSonido === "ruido-fuerte" ? "golpe" : "respiracion");
            escribirMensajeNivel7("NO TE PREOCUPES. NO NECESITO QUE HAGAS NADA.", function () {
                nivel7Temporizador = setTimeout(function () {
                    escribirMensajeNivel7("YA SÉ CÓMO SONÁS.", function () {
                        nivel7Temporizador = setTimeout(function () {
                            nivel7Fase = "pregunta";
                            preguntaNivel7.hidden = false;
                            mensajeComputadoraNivel7.textContent = "SI ALGUIEN PUDIERA ESCUCHARTE DESDE ESTE LUGAR, ¿QUÉ LE DIRÍAS?";
                        }, 1550);
                    });
                }, 1700);
            });
        }, 2100);
    });
}

function responderNivel7(respuesta) {
    if (estadoActual !== "nivel7" || nivel7Fase !== "pregunta") return;
    nivel7Respuesta = respuesta;
    nivel7Fase = "reaccion";
    registroNivel7.respuesta = respuesta;
    preguntaNivel7.hidden = true;
    document.querySelectorAll("[data-respuesta-nivel7]").forEach(function (boton) {
        boton.disabled = true;
        boton.classList.toggle("seleccionada", boton.dataset.respuestaNivel7 === respuesta);
    });
    sonidoRespuestaNivel7(respuesta);
    document.body.dataset.rutaNivel7 = respuesta;

    if (respuesta === "ayuda") {
        escribirMensajeNivel7("¿AYUDA? ¿DE QUIÉN?", function () {
            sonidoEventoNivel7("golpe");
            nivel7SombraPuerta = true;
        });
    } else if (respuesta === "advierte") {
        escribirMensajeNivel7("NO HAY NADIE MÁS CON QUIEN NECESITES HABLAR.", function () {
            sonidoInterferenciaNivel7();
            silenciarAmbienteNivel7(3200);
        });
    } else if (respuesta === "tranquilo") {
        escribirMensajeNivel7("ME ALEGRA QUE ESTÉS TRANQUILO.", function () {
            nivel7FiguraDetras = true;
        });
        silenciarAmbienteNivel7(4200);
    } else {
        mensajeComputadoraNivel7.textContent = "";
        nivel7Temporizador = setTimeout(function () {
            escribirMensajeNivel7("CADA VEZ HABLÁS MENOS.");
        }, 2200);
        document.body.dataset.rutaNivel7 = "silencio";
    }

    nivel7Temporizador = setTimeout(iniciarAnomaliaVozNivel7, 4700);
}

function iniciarAnomaliaVozNivel7() {
    if (estadoActual !== "nivel7" || nivel7Fase !== "reaccion") return;
    nivel7Fase = "anomalia-respuesta";
    nivel7FiguraAparece = true;
    nivel7InsectosDetenidos = true;
    sonidoEventoNivel7("voz");
    escribirMensajeNivel7("¿ESCUCHASTE ESO?", function () {
        nivel7Temporizador = setTimeout(function () {
            sonidoEventoNivel7("golpe");
            escribirMensajeNivel7("YO NO FUI.", function () {
                nivel7Temporizador = setTimeout(iniciarCierreNivel7, 2200);
            });
        }, 1900);
    });
}

function iniciarCierreNivel7() {
    if (estadoActual !== "nivel7") return;
    nivel7Fase = "cierre";
    escribirMensajeNivel7("CREO QUE HAY ALGO MÁS ACÁ.", function () {
        nivel7Temporizador = setTimeout(finalizarNivel7, 2600);
    });
}

function finalizarNivel7() {
    if (estadoActual !== "nivel7") return;
    nivel7Fase = "cierre-final";
    const sonidos = registroNivel7.sonidosDetectados > 0;
    const mensajeFinal = nivel7Permiso === "rechazado"
        ? "ESTÁ BIEN. ALGUNAS COSAS ES MEJOR NO COMPARTIRLAS."
        : sonidos
            ? "ME GUSTA CUANDO RESPONDÉS."
            : "NO TODOS NECESITAN HABLAR PARA SER ESCUCHADOS.";
    registroNivel7.duracionMs = Date.now() - nivel7TiempoInicio;
    registroNivel7.tiempoSilencioMs = nivel7SilencioAcumuladoMs;
    escribirMensajeNivel7(mensajeFinal, function () {
        nivel7Temporizador = setTimeout(function () {
            mensajeComputadoraNivel7.textContent = "";
            nivel7Fase = "final";
            nivel7Finalizada = true;
            nivel7InsectosDetenidos = true;
            clearTimeout(nivel7AudioTemporizador);
            document.getElementById("instruccionCanvas").textContent = "La computadora se apagó. La puerta está disponible.";
            btnPuerta.textContent = "AVANZAR AL NIVEL 8";
        }, 2200);
    });
}

function finalizarMicrofonoNivel7() {
    clearInterval(nivel7SonidosDetector);
    nivel7SonidosDetector = null;
    if (nivel7FuenteMicrofono) {
        try { nivel7FuenteMicrofono.disconnect(); } catch (error) { /* ya estaba desconectado */ }
        nivel7FuenteMicrofono = null;
    }
    if (nivel7StreamMicrofono) {
        nivel7StreamMicrofono.getTracks().forEach(function (track) { track.stop(); });
        nivel7StreamMicrofono = null;
    }
    nivel7AnalizadorMicrofono = null;
}

function iniciarSonidosAmbienteNivel7() {
    clearTimeout(nivel7AudioTemporizador);
    if (estadoActual !== "nivel7" || nivel7Fase === "final") return;
    const demora = 5200 + Math.random() * 6300;
    nivel7AudioTemporizador = setTimeout(function () {
        if (estadoActual !== "nivel7" || nivel7Fase === "final") return;
        const eventos = ["crujido", "golpe", "insectos", "respiracion", "interferencia", "objeto"];
        if (Math.random() < 0.23) {
            silenciarAmbienteNivel7(2300);
            nivel7Temporizador = setTimeout(function () {
                sonidoEventoNivel7(eventos[Math.floor(Math.random() * eventos.length)]);
            }, 1800);
        } else {
            sonidoEventoNivel7(eventos[Math.floor(Math.random() * eventos.length)]);
        }
        iniciarSonidosAmbienteNivel7();
    }, demora);
}

function silenciarAmbienteNivel7(duracion) {
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;
    gananciasAmbiente.forEach(function (ganancia) { ganancia.gain.setTargetAtTime(0, ahora, 0.12); });
    setTimeout(function () {
        if (estadoActual === "nivel7" && audioActivo) actualizarMusicaTerror();
    }, duracion);
}

function sonidoTeclaNivel7() {
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;
    const oscilador = contextoAudio.createOscillator();
    const ganancia = contextoAudio.createGain();
    oscilador.type = "square";
    oscilador.frequency.value = 740 + Math.random() * 600;
    ganancia.gain.setValueAtTime(0.025, ahora);
    ganancia.gain.exponentialRampToValueAtTime(0.001, ahora + 0.025);
    oscilador.connect(ganancia);
    ganancia.connect(volumenGeneral);
    oscilador.start(ahora);
    oscilador.stop(ahora + 0.03);
}

function sonidoInterferenciaNivel7() {
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;
    const largo = Math.floor(contextoAudio.sampleRate * 0.34);
    const buffer = contextoAudio.createBuffer(1, largo, contextoAudio.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < largo; i++) datos[i] = (Math.random() * 2 - 1) * (1 - i / largo);
    const fuente = contextoAudio.createBufferSource();
    const filtro = contextoAudio.createBiquadFilter();
    const volumen = contextoAudio.createGain();
    fuente.buffer = buffer;
    filtro.type = "bandpass";
    filtro.frequency.value = 1550;
    filtro.Q.value = 0.8;
    volumen.gain.setValueAtTime(0.001, ahora);
    volumen.gain.linearRampToValueAtTime(0.15, ahora + 0.025);
    volumen.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
    fuente.connect(filtro);
    filtro.connect(volumen);
    volumen.connect(volumenGeneral);
    fuente.start(ahora);
    fuente.stop(ahora + 0.36);
}

function sonidoEventoNivel7(tipo) {
    if (!audioActivo || !contextoAudio) return;
    if (tipo === "golpe" || tipo === "objeto") {
        sonidoGolpePuertaNivel3();
        return;
    }
    if (tipo === "interferencia") {
        sonidoInterferenciaNivel7();
        return;
    }
    const ahora = contextoAudio.currentTime;
    if (tipo === "crujido" || tipo === "insectos") {
        const oscilador = contextoAudio.createOscillator();
        const filtro = contextoAudio.createBiquadFilter();
        const volumen = contextoAudio.createGain();
        oscilador.type = tipo === "insectos" ? "square" : "sawtooth";
        oscilador.frequency.setValueAtTime(tipo === "insectos" ? 1750 : 530, ahora);
        oscilador.frequency.exponentialRampToValueAtTime(tipo === "insectos" ? 920 : 210, ahora + 0.72);
        filtro.type = "bandpass";
        filtro.frequency.value = tipo === "insectos" ? 1850 : 430;
        filtro.Q.value = 2.8;
        volumen.gain.setValueAtTime(0.001, ahora);
        volumen.gain.linearRampToValueAtTime(tipo === "insectos" ? 0.014 : 0.045, ahora + 0.08);
        volumen.gain.exponentialRampToValueAtTime(0.001, ahora + 0.74);
        oscilador.connect(filtro);
        filtro.connect(volumen);
        volumen.connect(volumenGeneral);
        oscilador.start(ahora);
        oscilador.stop(ahora + 0.76);
        return;
    }
    // Ruido filtrado y lento: suena a respiración, aunque no dependa del micrófono.
    const largo = Math.floor(contextoAudio.sampleRate * 1.25);
    const buffer = contextoAudio.createBuffer(1, largo, contextoAudio.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < largo; i++) {
        const envolvente = Math.sin(Math.PI * i / largo) * (0.55 + 0.45 * Math.sin(i / largo * Math.PI));
        datos[i] = (Math.random() * 2 - 1) * envolvente;
    }
    const fuente = contextoAudio.createBufferSource();
    const filtro = contextoAudio.createBiquadFilter();
    const volumen = contextoAudio.createGain();
    fuente.buffer = buffer;
    filtro.type = "bandpass";
    filtro.frequency.value = tipo === "voz" ? 620 : 310;
    filtro.Q.value = tipo === "voz" ? 0.75 : 1.2;
    volumen.gain.setValueAtTime(0.001, ahora);
    volumen.gain.linearRampToValueAtTime(0.13, ahora + 0.35);
    volumen.gain.setTargetAtTime(0.001, ahora + 0.85, 0.12);
    fuente.connect(filtro);
    filtro.connect(volumen);
    volumen.connect(volumenGeneral);
    fuente.start(ahora);
    fuente.stop(ahora + 1.3);
}

function sonidoRespuestaNivel7(respuesta) {
    const frecuencias = { ayuda: 190, advierte: 480, tranquilo: 330, silencio: 120 };
    if (!audioActivo || !contextoAudio) return;
    const ahora = contextoAudio.currentTime;
    const tono = contextoAudio.createOscillator();
    const volumen = contextoAudio.createGain();
    tono.type = respuesta === "advierte" ? "triangle" : "sine";
    tono.frequency.setValueAtTime(frecuencias[respuesta] || 220, ahora);
    tono.frequency.exponentialRampToValueAtTime(34, ahora + 0.5);
    volumen.gain.setValueAtTime(0.001, ahora);
    volumen.gain.linearRampToValueAtTime(0.19, ahora + 0.025);
    volumen.gain.exponentialRampToValueAtTime(0.001, ahora + 0.62);
    tono.connect(volumen);
    volumen.connect(volumenGeneral);
    tono.start(ahora);
    tono.stop(ahora + 0.65);
}

function iniciarNivel8() {
    estadoActual = "nivel8";
    panelNivel7.hidden = true;
    panelNivel8.hidden = false;
    panelNivel9.hidden = true;
    tituloNivel.textContent = "LEVEL 08";
    tituloHabitacion.textContent = "DETRÁS DE LAS PAREDES";
    textoHistoria.textContent = "La salida del cuarto desemboca en un pasillo demasiado largo. La puerta se cierra detrás de vos.";
    document.getElementById("avisoNivel8").textContent = "La habitación se extendió. Hay cinco puertas y algo parece moverse al fondo.";
    document.getElementById("instruccionCanvas").textContent = "Podés observar las cinco puertas mientras el pasillo cambia.";
    mensajeComputadoraNivel8.textContent = "";
    puertasNivel8.hidden = true;
    preguntaNivel8.hidden = true;
    btnEscucharGolpesNivel8.hidden = true;
    btnEscucharGolpesNivel8.disabled = false;
    document.querySelectorAll("[data-respuesta-nivel8]").forEach(function (boton) {
        boton.disabled = false;
        boton.classList.remove("seleccionada");
    });
    nivel8Fase = "transicion";
    nivel8Respuesta = null;
    nivel8IndicePista = 0;
    nivel8GolpesEscuchados = false;
    nivel8ConteoSonidosSeguidos = 0;
    nivel8UltimoSonido = 0;
    nivel8SonidosBase = registroNivel7.sonidosDetectados || 0;
    nivel8VocesBase = registroNivel7.vocesDetectadas || 0;
    nivel8RuidosBase = registroNivel7.ruidosDetectados || 0;
    nivel8UltimoRespiro = Date.now();
    nivel8PuertaApertura = 0;
    nivel8PuertaCierra = 0;
    nivel8RegresoInicio = 0;
    nivel8LucesApagandose = false;
    nivel8PuertaNueva = false;
    nivel8FiguraPuerta = false;
    nivel8PuertaObservada = 0;
    registroNivel8 = {
        permisoMicrofono: nivel7Permiso,
        respuestaNivel7: nivel7Respuesta,
        respuestaNivel6: respuestaNivel6,
        sonidosDetectados: 0,
        vocesDetectadas: 0,
        ruidosDetectados: 0,
        reaccionoARuido: false,
        puertasInvestigadas: [],
        tiempoPuertasMs: [0, 0, 0, 0, 0],
        respuesta: null,
        interactuoPistas: 0,
        escuchoGolpes: false,
        duracionMs: 0,
        inicio: Date.now(),
        interaccionesComputadora: 0,
        intentosPuerta: 0
    };
    delete document.body.dataset.rutaNivel7;
    document.body.dataset.rutaNivel8 = "pasillo";
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "PROBAR LA PUERTA";
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    delete document.body.dataset.rutaNivel7;
    cambiarPantalla(habitacion);
    clearTimeout(nivel8Temporizador);
    clearTimeout(nivel8AmbienteTemporizador);
    nivel8Temporizador = setTimeout(function () {
        if (estadoActual !== "nivel8") return;
        nivel8Fase = "exploracion";
        avanzarPistaNivel8();
        mensajeComputadoraNivel8.textContent = "¿HAY ALGUIEN AHÍ?";
        sonidoInterferenciaNivel7();
        nivel8Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel8") return;
            escribirMensajeComputadoraNivel8("NO HAY NADIE.", function () {
                nivel8Temporizador = setTimeout(function () {
                    escribirMensajeComputadoraNivel8("NO DEBERÍA HABER NADIE.");
                    puertasNivel8.hidden = false;
                }, 1900);
            });
        }, 900);
    }, 2700);
    programarAnomaliasNivel8();
    setTimeout(iniciarSecuenciaGolpesNivel8, 9500);
    setTimeout(function () {
        if (estadoActual !== "nivel8" || nivel8Fase !== "exploracion") return;
        nivel8Fase = "pregunta";
        preguntaNivel8.hidden = false;
        mensajeComputadoraNivel8.textContent = "SI HUBIERA OTRAS PERSONAS EN ESTE LUGAR, ¿INTENTARÍAS ENCONTRARLAS?";
    }, 17500);
}

function avanzarPistaNivel8() {
    if (estadoActual !== "nivel8" || nivel8Fase !== "exploracion") return;
    if (nivel8IndicePista < pistasPasilloNivel8.length) {
        nivel8IndicePista += 1;
        registroNivel8.pistasMostradas = nivel8IndicePista;
        const pista = nivel8IndicePista === 1 && nivel7Respuesta === "advierte"
            ? "NO TODAS LAS SALIDAS SON SALIDAS."
            : pistasPasilloNivel8[nivel8IndicePista - 1];
        mensajeComputadoraNivel8.textContent = pista;
    }
    if (nivel8IndicePista < pistasPasilloNivel8.length) {
        setTimeout(avanzarPistaNivel8, 6800);
    }
}

function reaccionSonidoNivel8(categoria) {
    const ahora = Date.now();
    if (ahora - nivel8UltimoSonido < 1500) return;
    if (ahora - nivel8UltimoSonido > 4500) nivel8ConteoSonidosSeguidos = 0;
    nivel8UltimoSonido = ahora;
    nivel8ConteoSonidosSeguidos += 1;
    registroNivel8.sonidosDetectados = Math.max(0, registroNivel7.sonidosDetectados - nivel8SonidosBase);
    registroNivel8.vocesDetectadas = Math.max(0, registroNivel7.vocesDetectadas - nivel8VocesBase);
    registroNivel8.ruidosDetectados = Math.max(0, registroNivel7.ruidosDetectados - nivel8RuidosBase);
    registroNivel8.reaccionoARuido = true;
    nivel8LucesApagandose = categoria === "ruido-fuerte";
    if (categoria === "voz") {
        nivel8PuertaApertura = 2;
        mensajeComputadoraNivel8.textContent = "UNA PUERTA SE MOVIÓ CUANDO HABLASTE.";
    } else if (categoria === "ruido-fuerte") {
        mensajeComputadoraNivel8.textContent = "EL PASILLO DEVOLVIÓ ESE RUIDO.";
        sonidoInterferenciaNivel7();
    } else if (nivel8ConteoSonidosSeguidos >= 3) {
        const puerta = 1 + Math.floor(Math.random() * 5);
        mensajeComputadoraNivel8.textContent = "TRES SONIDOS. ALGO GOLPEÓ DETRÁS DE LA PUERTA " + puerta + ".";
        sonidoEventoNivel8("metal");
        nivel8ConteoSonidosSeguidos = 0;
    }
    setTimeout(function () { nivel8PuertaApertura = 0; nivel8LucesApagandose = false; }, 1700);
}

function escribirMensajeComputadoraNivel8(mensaje, alTerminar) {
    mensajeComputadoraNivel8.textContent = "";
    let indice = 0;
    const escritura = setInterval(function () {
        if (estadoActual !== "nivel8") { clearInterval(escritura); return; }
        indice += 1;
        mensajeComputadoraNivel8.textContent = mensaje.slice(0, indice);
        if (indice % 3 === 0) sonidoTeclaNivel7();
        if (indice >= mensaje.length) {
            clearInterval(escritura);
            if (alTerminar) alTerminar();
        }
    }, 34);
}

function investigarPuertaNivel8(numero) {
    if (estadoActual !== "nivel8" || nivel8Fase === "final" || nivel8Fase === "regreso") return;
    sonidoDecision();
    const ahora = Date.now();
    if (nivel8PuertaObservada) {
        registroNivel8.tiempoPuertasMs[nivel8PuertaObservada - 1] += ahora - nivel8InicioObservacionPuerta;
    }
    nivel8PuertaObservada = numero;
    nivel8InicioObservacionPuerta = ahora;
    if (!registroNivel8.puertasInvestigadas.includes(numero)) registroNivel8.puertasInvestigadas.push(numero);
    const textos = {
        1: "Hay cinco marcas de uñas alrededor del marco. Algunas parecen recientes.",
        2: "La puerta está entreabierta. Una luz tibia se filtra, pero algo respira detrás.",
        3: "La inscripción dice: «NO ERA LA CORRECTA».",
        4: "Cadenas y tablones traban la puerta desde el otro lado del pasillo.",
        5: "La pantalla muestra una habitación igual a la tuya. Por un instante aparecen cinco computadoras."
    };
    mensajeComputadoraNivel8.textContent = textos[numero];
    registroNivel8.interactuoPistas += numero === 3 || numero === 5 ? 1 : 0;
    document.body.dataset.rutaNivel8 = "puerta-" + numero;
    if (numero === 2 || numero === 5) sonidoEventoNivel7("respiracion");
    if (numero === 1 || numero === 4) sonidoEventoNivel7("crujido");
    if (numero === 3) sonidoInterferenciaNivel7();
}

function programarAnomaliasNivel8() {
    clearTimeout(nivel8AmbienteTemporizador);
    if (estadoActual !== "nivel8" || nivel8Fase === "final" || nivel8Fase === "regreso") return;
    nivel8AmbienteTemporizador = setTimeout(function () {
        if (estadoActual !== "nivel8" || nivel8Fase === "final" || nivel8Fase === "regreso") return;
        const eventos = ["pasos", "crujido", "metal", "arrastre", "susurro", "respiracion"];
        sonidoEventoNivel8(eventos[Math.floor(Math.random() * eventos.length)]);
        if (Math.random() < 0.32) {
            const puerta = 1 + Math.floor(Math.random() * 5);
            mensajeComputadoraNivel8.textContent = "ALGO SE MOVIÓ DETRÁS DE LA PUERTA " + puerta + ".";
        nivel8PuertaApertura = puerta;
        setTimeout(function () {
            if (estadoActual !== "nivel8" || nivel8Fase === "final") return;
            nivel8PuertaCierra = puerta;
            setTimeout(function () { nivel8PuertaApertura = 0; nivel8PuertaCierra = 0; }, 650);
        }, 1350);
            registroNivel8.reaccionoARuido = true;
        }
        programarAnomaliasNivel8();
    }, 7600 + Math.random() * 7500);
}

function iniciarSecuenciaGolpesNivel8() {
    if (estadoActual !== "nivel8" || nivel8Fase === "final") return;
    nivel8GolpesEscuchados = true;
    reproducirGolpesNivel8(3);
    mensajeComputadoraNivel8.textContent = "TRES GOLPES. PARECEN VENIR DE LA PARED.";
    btnEscucharGolpesNivel8.hidden = false;
}

function volverAEscucharNivel8() {
    if (estadoActual !== "nivel8" || !nivel8GolpesEscuchados || btnEscucharGolpesNivel8.disabled) return;
    btnEscucharGolpesNivel8.disabled = true;
    registroNivel8.escuchoGolpes = true;
    registroNivel8.reaccionoARuido = true;
    mensajeComputadoraNivel8.textContent = "ESPERÁS... ESTA VEZ RESPONDE DOS VECES.";
    setTimeout(function () { reproducirGolpesNivel8(2); }, 650);
}

function reproducirGolpesNivel8(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        setTimeout(function () { sonidoEventoNivel7("golpe"); }, i * 560);
    }
}

function sonidoEventoNivel8(tipo) {
    if (!audioActivo || !contextoAudio) return;
    if (tipo === "susurro") {
        sonidoEventoNivel7("voz");
        return;
    }
    if (["crujido", "respiracion", "interferencia", "voz"].includes(tipo)) {
        sonidoEventoNivel7(tipo === "susurro" ? "voz" : tipo);
        return;
    }
    const ahora = contextoAudio.currentTime;
    const tono = contextoAudio.createOscillator();
    const filtro = contextoAudio.createBiquadFilter();
    const volumen = contextoAudio.createGain();
    tono.type = tipo === "metal" ? "triangle" : "sawtooth";
    const inicio = tipo === "metal" ? 760 : tipo === "pasos" ? 105 : tipo === "arrastre" ? 240 : 520;
    tono.frequency.setValueAtTime(inicio, ahora);
    tono.frequency.exponentialRampToValueAtTime(tipo === "metal" ? 190 : 48, ahora + (tipo === "pasos" ? 0.18 : 0.75));
    filtro.type = tipo === "metal" ? "highpass" : "lowpass";
    filtro.frequency.value = tipo === "metal" ? 1800 : 550;
    volumen.gain.setValueAtTime(0.001, ahora);
    volumen.gain.linearRampToValueAtTime(tipo === "metal" ? 0.11 : 0.07, ahora + 0.03);
    volumen.gain.exponentialRampToValueAtTime(0.001, ahora + (tipo === "pasos" ? 0.22 : 0.82));
    tono.connect(filtro); filtro.connect(volumen); volumen.connect(volumenGeneral);
    tono.start(ahora); tono.stop(ahora + (tipo === "pasos" ? 0.24 : 0.85));
}

function responderNivel8(respuesta) {
    if (estadoActual !== "nivel8" || nivel8Fase !== "pregunta") return;
    nivel8Respuesta = respuesta;
    nivel8Fase = "reaccion";
    registroNivel8.respuesta = respuesta;
    preguntaNivel8.hidden = true;
    document.querySelectorAll("[data-respuesta-nivel8]").forEach(function (boton) {
        boton.disabled = true;
        boton.classList.toggle("seleccionada", boton.dataset.respuestaNivel8 === respuesta);
    });
    document.body.dataset.rutaNivel8 = respuesta;
    sonidoRespuestaNivel7(respuesta === "buscar" ? "ayuda" : respuesta === "salir" ? "advierte" : "tranquilo");
    if (respuesta === "buscar") {
        escribirMensajeComputadoraNivel8("QUÉ CURIOSO. NO SOS EL PRIMERO QUE PREGUNTA ESO.", function () {
            sonidoEventoNivel8("respiracion");
            nivel8PuertaApertura = 2;
            nivel8Temporizador = setTimeout(function () {
                nivel8PuertaApertura = 0;
                sonidoEventoNivel7("golpe");
                mensajeComputadoraNivel8.textContent = "PARECE QUE NO QUIEREN QUE LOS ENCUENTRES.";
            }, 3000);
        });
    } else if (respuesta === "salir") {
        mensajeComputadoraNivel8.textContent = "ESO ES LO QUE TODOS DICEN AL PRINCIPIO.";
        nivel8LucesApagandose = true;
        nivel8PuertaNueva = true;
        nivel8Temporizador = setTimeout(function () {
            if (estadoActual === "nivel8") mensajeComputadoraNivel8.textContent = "ENTONCES NO MIRES A LOS COSTADOS.";
        }, 2400);
    } else {
        mensajeComputadoraNivel8.textContent = "";
        sonidoEventoNivel7("golpe");
        nivel8FiguraPuerta = true;
        nivel8Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel8") return;
            mensajeComputadoraNivel8.textContent = "A VECES ES MEJOR NO SABERLO.";
            nivel8Temporizador = setTimeout(function () { nivel8FiguraPuerta = false; }, 1700);
        }, 950);
    }
    nivel8Temporizador = setTimeout(iniciarAnomaliaFinalNivel8, 6500);
}

function iniciarAnomaliaFinalNivel8() {
    if (estadoActual !== "nivel8" || nivel8Fase !== "reaccion") return;
    nivel8Fase = "anomalia";
    nivel8LucesApagandose = true;
    sonidoEventoNivel8("susurro");
    mensajeComputadoraNivel8.textContent = "VOS TAMBIÉN VAS A QUEDARTE ACÁ.";
    nivel8Temporizador = setTimeout(function () {
        mensajeComputadoraNivel8.textContent = "NO ESCUCHASTE NADA.";
        nivel8FiguraPuerta = false;
        nivel8Temporizador = setTimeout(finalizarNivel8, 2500);
    }, 2100);
}

function finalizarNivel8() {
    if (estadoActual !== "nivel8") return;
    nivel8Fase = "regreso";
    nivel8RegresoInicio = Date.now();
    puertasNivel8.hidden = true;
    preguntaNivel8.hidden = true;
    btnEscucharGolpesNivel8.hidden = true;
    nivel8LucesApagandose = false;
    registroNivel8.duracionMs = Date.now() - registroNivel8.inicio;
    if (nivel8PuertaObservada) {
        registroNivel8.tiempoPuertasMs[nivel8PuertaObservada - 1] += Date.now() - nivel8InicioObservacionPuerta;
    }
    registroNivel8.sonidosDetectados = Math.max(0, (registroNivel7.sonidosDetectados || 0) - nivel8SonidosBase);
    registroNivel8.vocesDetectadas = Math.max(0, (registroNivel7.vocesDetectadas || 0) - nivel8VocesBase);
    registroNivel8.ruidosDetectados = Math.max(0, (registroNivel7.ruidosDetectados || 0) - nivel8RuidosBase);
    escribirMensajeComputadoraNivel8("CREO QUE YA ESTÁS LISTO PARA VERLAS.", function () {
        nivel8Temporizador = setTimeout(function () {
            nivel8Fase = "final";
            document.getElementById("instruccionCanvas").textContent = "La puerta está disponible. Cinco posibilidades. Una sola salida.";
            btnPuerta.textContent = "AVANZAR AL NIVEL 9";
            nivel8AmbienteTemporizador = setTimeout(finalizarMicrofonoNivel7, 800);
        }, 1800);
    });
}

function iniciarNivel9() {
    finalizarMicrofonoNivel7();
    clearTimeout(nivel8Temporizador);
    clearTimeout(nivel8AmbienteTemporizador);
    estadoActual = "nivel9";
    nivel9InicioTransicion = Date.now();
    nivel9Fase = "exploracion";
    nivel9FiguraSentada = false;
    nivel9LuzParpadeaHasta = 0;
    clearTimeout(nivel9Timer);
    const puntajeConfianza = (nivel7Respuesta === "ayuda" ? 2 : 0) + (nivel8Respuesta === "salir" ? 1 : 0) + (respuestaBorrarNivel5 === "si" ? 1 : 0);
    const puntajeDesconfianza = (nivel7Respuesta === "advierte" ? 2 : 0) + (nivel8Respuesta === "buscar" ? 1 : 0) + (nivel6Ruta === "rechazo" ? 1 : 0);
    nivel9PerfilAnterior = puntajeConfianza > puntajeDesconfianza ? "confiado" : puntajeDesconfianza > puntajeConfianza ? "desconfiado" : "indeciso";
    registroNivel9 = {
        perfilAnterior: nivel9PerfilAnterior,
        respuestas: {},
        documentosInvestigados: [],
        encontroDocumento: false,
        documentoSeleccionado: null,
        sillaInvestigada: false,
        intentosPuerta: 0,
        interaccionesComputadora: 0,
        inicio: Date.now()
    };
    panelNivel8.hidden = true;
    panelNivel9.hidden = false;
    tituloNivel.textContent = "LEVEL 09";
    tituloHabitacion.textContent = "LA SALA DE ESPERA";
    document.getElementById("instruccionCanvas").textContent = "Tocá la computadora para empezar. También podés revisar los papeles, el archivador y la silla.";
    textoHistoria.textContent = "La puerta se cerró detrás de vos. Hay rastros de otras personas en la sala.";
    document.getElementById("avisoNivel9").textContent = "Revisá la computadora o explorá los rastros que quedaron en la sala.";
    mensajeComputadoraNivel9.textContent = "";
    preguntaNivel9.hidden = true;
    documentoNivel9.hidden = true;
    btnPuerta.hidden = false;
    btnPuerta.disabled = false;
    btnPuerta.textContent = "PROBAR LA PUERTA";
    btnComputadora.hidden = false;
    btnComputadora.textContent = "REVISAR COMPUTADORA";
    document.querySelectorAll("[data-respuesta-nivel9]").forEach(function (boton) { boton.disabled = false; boton.classList.remove("seleccionada"); });
    delete document.body.dataset.rutaNivel8;
}

function iniciarNivel10() {
    clearTimeout(nivel9Timer);
    clearTimeout(nivel10Temporizador);
    estadoActual = "nivel10";
    nivel10Fase = "transicion";
    nivel10InicioTransicion = Date.now();
    nivel10HistorialDecisiones = recopilarDecisionesNivel10();
    nivel10Perfil = nivel10HistorialDecisiones.perfil;
    if (!nivel10Distribucion) nivel10Distribucion = crearDistribucionNivel10(nivel10Perfil);
    nivel10HistorialDecisiones.distribucion = nivel10Distribucion.map(function (equipo) {
        return { ranura: equipo.ranura, computadora: equipo.computadora };
    });
    nivel10ComputadoraActual = null;
    nivel10DestinoSeleccionado = null;
    nivel10TerminalSubfase = "";
    nivel10PistasEncontradas = [];
    nivel10EvaluacionPreguntas = [];
    nivel10EvaluacionRespuestas = [];
    nivel10PantallaDespierta = null;
    nivel10UltimoEquipoCerca = null;
    nivel10UltimaActividad = Date.now();
    nivel10UltimoMovimientoMouse = Date.now();
    nivel10EventoEscena = "";
    nivel10EventoEscenaHasta = 0;
    nivel10UltimoEventoEscena = Date.now() + 8000;
    nivel10MiradaPersonaje = "frente";
    nivel10MovimientoAutonomoHasta = 0;
    nivel10CantidadMovimientosAutonomos = 0;
    nivel10ProximaReaccionQuietud = 0;
    nivel10PasoAutonomoX = 0;
    nivel10UltimoEventoMs = Date.now() + 10500;
    nivel10EventoIndice = 0;
    mensajeCuartaParedNivel10.hidden = true;
    opcionesTerminalNivel10.replaceChildren();
    terminalNivel10.hidden = true;
    panelNivel9.hidden = true;
    panelNivel10.hidden = false;
    tituloNivel.textContent = "LEVEL 10";
    tituloHabitacion.textContent = "LA ÚLTIMA ELECCIÓN";
    textoHistoria.textContent = "La puerta se cierra detrás de vos. Durante unos segundos, no podés ver nada.";
    avisoNivel10.textContent = "La puerta se cerró detrás de vos. La oscuridad todavía no cede.";
    mensajeComputadoraNivel10.textContent = "";
    document.getElementById("instruccionCanvas").textContent = "Esperá a que la luz revele la habitación.";
    btnComputadora.hidden = true;
    btnPuerta.hidden = true;
    btnPuerta.disabled = false;
    sonidoEventoNivel7("golpe");
    nivel10Temporizador = setTimeout(function () {
        if (estadoActual !== "nivel10") return;
        nivel10Fase = "encendido";
        sonidoInterferenciaNivel7();
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel10") return;
            nivel10Fase = "exploracion";
            const mensajesPerfil = {
                confiado: "ME ALEGRA QUE HAYAMOS LLEGADO HASTA ACÁ. TE PROMETÍ QUE IBA A AYUDARTE.",
                desconfiado: "NO VAS A ENCONTRAR NADA SI SEGUÍS BUSCANDO.",
                indeciso: "¿TODAVÍA NO SABÉS QUÉ QUERÉS? PUEDO ESPERAR."
            };
            avisoNivel10.textContent = "Cinco computadoras. Una puerta que parece una salida. Observá la habitación.";
            mensajeComputadoraNivel10.textContent = mensajesPerfil[nivel10Perfil];
            document.getElementById("instruccionCanvas").textContent = "Explorá la sala y tocá una computadora cuando quieras revisarla.";
        }, 2200);
    }, 1550);
}

function recopilarDecisionesNivel10() {
    const puntaje = { confiado: 0, desconfiado: 0, indeciso: 0 };
    const agregar = function (perfil, valor) { puntaje[perfil] += valor || 0; };

    // Respuestas explícitas de los niveles 1 a 8.
    if (respuestaActual === "si") agregar("confiado", 1); else if (respuestaActual === "no") agregar("desconfiado", 1);
    if (respuestaNivel2 === "si") agregar("confiado", 1); else if (respuestaNivel2 === "no") agregar("indeciso", 1);
    if (respuestaNivel3 === "si") agregar("confiado", 2); else if (respuestaNivel3 === "no") agregar("desconfiado", 2);
    if (respuestaNivel4 === "si") agregar("confiado", 1); else if (respuestaNivel4 === "no") agregar("desconfiado", 1);
    if (respuestaRecuerdosNivel5 === "si") agregar("confiado", 1); else if (respuestaRecuerdosNivel5 === "no") agregar("indeciso", 1);
    if (respuestaBorrarNivel5 === "si") agregar("confiado", 2); else if (respuestaBorrarNivel5 === "no") agregar("desconfiado", 1);
    if (respuestaNivel6 === "si") agregar("confiado", 1); else if (respuestaNivel6 === "no") agregar("desconfiado", 2);
    if (nivel7Respuesta === "ayuda" || nivel7Respuesta === "tranquilo") agregar("confiado", 2);
    else if (nivel7Respuesta === "advierte") agregar("desconfiado", 2);
    else if (nivel7Respuesta === "silencio") agregar("indeciso", 1);
    if (nivel8Respuesta === "buscar" || nivel8Respuesta === "salir") agregar("desconfiado", 1);
    else if (nivel8Respuesta === "dudar") agregar("indeciso", 1);

    // Respuestas del nivel 9 y señales de conducta que también quedaron registradas.
    const respuestas9 = registroNivel9.respuestas || {};
    if (respuestas9.ayuda === "si") agregar("confiado", 2);
    else if (respuestas9.ayuda === "no") agregar("desconfiado", 2);
    else if (respuestas9.ayuda === "duda") agregar("indeciso", 2);
    if (respuestas9.obediencia === "si") agregar("confiado", 2);
    else if (respuestas9.obediencia === "no") agregar("desconfiado", 2);
    else if (respuestas9.obediencia === "depende") agregar("indeciso", 2);
    if (respuestas9.otros === "culpa") agregar("confiado", 1);
    else if (respuestas9.otros === "sistema") agregar("desconfiado", 1);
    else if (respuestas9.otros === "no-se") agregar("indeciso", 1);
    if (respuestas9.promesa === "ayuda") agregar("confiado", 2);
    else if (respuestas9.promesa === "propio") agregar("desconfiado", 2);
    else if (respuestas9.promesa === "evita") agregar("indeciso", 2);
    if ((registroNivel6.instruccionesSeguidas || 0) > 0) agregar("confiado", Math.min(2, registroNivel6.instruccionesSeguidas));
    if (registroNivel4.cambioRespuesta) agregar("indeciso", 1);
    if ((registroNivel8.puertasInvestigadas || []).length >= 3) agregar("desconfiado", 1);
    if ((registroNivel9.documentosInvestigados || []).length >= 3) agregar("desconfiado", 1);

    const maximo = Math.max(puntaje.confiado, puntaje.desconfiado, puntaje.indeciso);
    const ganadores = Object.keys(puntaje).filter(function (perfil) { return puntaje[perfil] === maximo; });
    const perfil = maximo === 0 || ganadores.length !== 1 ? "indeciso" : ganadores[0];
    return {
        perfil: perfil,
        puntajes: puntaje,
        respuestasNiveles1a9: {
            nivel1: respuestaActual, nivel2: respuestaNivel2, nivel3: respuestaNivel3, nivel4: respuestaNivel4,
            memoriaNivel5: respuestaRecuerdosNivel5, recuerdoNivel5: respuestaBorrarNivel5,
            controlNivel6: respuestaNivel6, nivel7: nivel7Respuesta, nivel8: nivel8Respuesta,
            nivel9: Object.assign({}, respuestas9)
        },
        conducta: {
            instruccionesSeguidas: registroNivel6.instruccionesSeguidas || 0,
            cambiosRespuestaNivel4: Boolean(registroNivel4.cambioRespuesta),
            puertasExploradasNivel8: (registroNivel8.puertasInvestigadas || []).length,
            documentosExploradosNivel9: (registroNivel9.documentosInvestigados || []).length
        }
    };
}

function crearDistribucionNivel10(perfil) {
    const ranuras = [
        { x: 28, y: 124, escala: 0.82 }, { x: 125, y: 91, escala: 0.72 },
        { x: 281, y: 111, escala: 0.86 }, { x: 151, y: 166, escala: 0.94 },
        { x: 369, y: 162, escala: 0.90 }
    ];
    const barajar = function (lista) {
        for (let i = lista.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lista[i], lista[j]] = [lista[j], lista[i]];
        }
        return lista;
    };
    let ordenRanuras = [0, 1, 2, 3, 4];
    let amplitud = 10;
    if (perfil === "desconfiado") { ordenRanuras = barajar(ordenRanuras); amplitud = 15; }
    else if (perfil === "indeciso") { ordenRanuras = barajar(ordenRanuras); amplitud = 10; }
    const identidades = barajar([1, 2, 3, 4, 5]);
    const ocultas = perfil === "desconfiado" ? new Set([1 + Math.floor(Math.random() * 2), 3 + Math.floor(Math.random() * 2)])
        : perfil === "indeciso" ? new Set([Math.floor(Math.random() * 5)]) : new Set();
    let resultado = ordenRanuras.map(function (indiceRanura, indiceOrden) {
        const base = ranuras[indiceRanura];
        return {
            ranura: indiceRanura,
            computadora: identidades[indiceOrden],
            x: constrain(base.x + (Math.random() * 2 - 1) * amplitud, 8, 435),
            y: constrain(base.y + (Math.random() * 2 - 1) * (amplitud * 0.55), 80, 184),
            escala: base.escala * (perfil === "desconfiado" && ocultas.has(indiceRanura) ? 0.88 : 1),
            parcialmenteOculta: ocultas.has(indiceRanura)
        };
    });
    const firma = function (lista) { return lista.slice().sort((a, b) => a.ranura - b.ranura).map(e => e.ranura + ":" + e.computadora + ":" + Math.round(e.x) + ":" + Math.round(e.y)).join("|"); };
    const firmaActual = firma(resultado);
    if (firmaActual === nivel10DistribucionAnterior) {
        const primero = resultado[0].computadora;
        resultado[0].computadora = resultado[1].computadora;
        resultado[1].computadora = primero;
        resultado[0].x = constrain(resultado[0].x + 13, 8, 435);
    }
    nivel10DistribucionAnterior = firma(resultado);
    return resultado;
}

function equipoNivel10BajoCursor(x, y) {
    if (!nivel10Distribucion) return null;
    return nivel10Distribucion.find(function (equipo) {
        const factor = equipo.escala;
        return x >= equipo.x + 12 * factor && x <= equipo.x + 46 * factor &&
            y >= equipo.y - 20 * factor && y <= equipo.y + 9 * factor;
    }) || null;
}

function abrirComputadoraNivel10(equipo) {
    if (estadoActual !== "nivel10" || nivel10Fase !== "exploracion" || !equipo) return;
    clearTimeout(nivel10Temporizador);
    nivel10ComputadoraActual = equipo.computadora;
    nivel10DestinoSeleccionado = experienciasComputadorasNivel10[equipo.computadora].destino;
    nivel10Fase = "terminal";
    nivel10TerminalSubfase = "";
    terminalNivel10.hidden = false;
    opcionesTerminalNivel10.replaceChildren();
    nivel10UltimaActividad = Date.now();
    sonidoDecision();
    if (equipo.computadora === 1) {
        nivel10TerminalSubfase = "salida-intro";
        textoTerminalNivel10.textContent = "NO PUEDO DECIRTE QUE TODO TERMINÓ.";
        mensajeComputadoraNivel10.textContent = "";
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "salida-intro") return;
            textoTerminalNivel10.textContent = "NO PUEDO DECIRTE QUE TODO TERMINÓ.\n\nPERO ESTA VEZ PODÉS DECIDIR.";
            agregarBotonTerminalNivel10("CONTINUAR", comenzarFinalBuenoNivel10);
        }, 1750);
    } else if (equipo.computadora === 2) {
        iniciarRechazoNivel10();
    } else if (equipo.computadora === 3) {
        iniciarFalsaNormalidadNivel10();
    } else if (equipo.computadora === 4) {
        iniciarEvaluacionNivel10();
    } else if (equipo.computadora === 5) {
        iniciarReinicioNivel10();
    }
}

function agregarBotonTerminalNivel10(texto, accion) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.addEventListener("click", accion);
    opcionesTerminalNivel10.appendChild(boton);
}

function iniciarRechazoNivel10() {
    nivel10TerminalSubfase = "rechazo";
    const anteriores = nivel10HistorialDecisiones.respuestasNiveles1a9 || {};
    const frases = [];
    if (anteriores.nivel9 && anteriores.nivel9.ayuda === "no") frases.push("DIJISTE QUE NO NECESITABAS AYUDA.");
    if (anteriores.nivel9 && anteriores.nivel9.promesa === "propio") frases.push("DIJISTE QUE PODÍAS HACERLO SOLO.");
    if (anteriores.nivel3 === "no" || anteriores.nivel7 === "advierte") frases.push("ENTONCES, ¿POR QUÉ SEGUÍS BUSCANDO?");
    if (!frases.length) frases.push("DIJISTE QUE PODÍAS SEGUIR.", "ENTONCES, ¿POR QUÉ SEGUÍS BUSCANDO?");
    frases.push("NO VAS A ENCONTRAR NADA SI SEGUÍS BUSCANDO.");
    nivel10MensajesRechazo = frases.slice(0, 3);
    nivel10IndiceRechazo = 0;
    mostrarPasoRechazoNivel10();
}

function mostrarPasoRechazoNivel10() {
    if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "rechazo") return;
    const frase = nivel10MensajesRechazo[nivel10IndiceRechazo];
    textoTerminalNivel10.textContent = frase;
    mensajeCuartaParedNivel10.textContent = frase;
    mensajeCuartaParedNivel10.hidden = nivel10IndiceRechazo < 1;
    opcionesTerminalNivel10.replaceChildren();
    if (nivel10IndiceRechazo < nivel10MensajesRechazo.length - 1) {
        agregarBotonTerminalNivel10("SEGUIR LEYENDO", function () {
            nivel10IndiceRechazo += 1;
            sonidoTeclaNivel7();
            mostrarPasoRechazoNivel10();
        });
    } else {
        agregarBotonTerminalNivel10("CERRAR COMPUTADORA", comenzarFinalMaloNivel10);
    }
}

function comenzarFinalBuenoNivel10() {
    if (estadoActual !== "nivel10") return;
    clearTimeout(nivel10Temporizador);
    nivel10TerminalSubfase = "escape";
    opcionesTerminalNivel10.replaceChildren();
    textoTerminalNivel10.textContent = "LA PANTALLA SE APAGA. ALGO DEL OTRO LADO PARECE CONTINUAR MOVIÉNDOSE.";
    sonidoEventoNivel8(nivel10Perfil === "desconfiado" ? "interferencia" : "pasos");
    nivel10Temporizador = setTimeout(function () {
        if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "escape") return;
        terminalNivel10.hidden = true;
        terminarNivel10("bueno");
    }, 1500);
}

function comenzarFinalMaloNivel10() {
    if (estadoActual !== "nivel10" || nivel10ComputadoraActual !== 2) return;
    clearTimeout(nivel10Temporizador);
    terminalNivel10.hidden = true;
    opcionesTerminalNivel10.replaceChildren();
    nivel10TerminalSubfase = "";
    nivel10Fase = "final-malo";
    mensajeCuartaParedNivel10.hidden = true;
    mensajeComputadoraNivel10.textContent = "LAS CINCO PANTALLAS SE APAGAN.";
    sonidoEventoNivel8("interferencia");
    nivel10Temporizador = setTimeout(function () {
        if (estadoActual !== "nivel10" || nivel10Fase !== "final-malo") return;
        mensajeComputadoraNivel10.textContent = "PARECE QUE TODAVÍA NO ENTENDISTE.";
        sonidoEventoNivel8("golpe");
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel10" || nivel10Fase !== "final-malo") return;
            terminarNivel10("malo");
        }, 1900);
    }, 1300);
}

function iniciarFalsaNormalidadNivel10() {
    nivel10TerminalSubfase = "normalidad";
    nivel10CortesLuzMeh = 0;
    nivel10SubfaseNormalidad = "luz";
    textoTerminalNivel10.textContent = "TODO ESTÁ EN ORDEN. PODÉS RELAJARTE.";
    opcionesTerminalNivel10.replaceChildren();
    sonidoEventoNivel8("pasos");
    ejecutarCorteNormalidadNivel10();
}

function ejecutarCorteNormalidadNivel10() {
    if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "normalidad") return;
    if (nivel10CortesLuzMeh >= 3) {
        textoTerminalNivel10.textContent = "BUENO... AL MENOS CREÍSTE QUE HABÍAS SALIDO.";
        sonidoEventoNivel8("interferencia");
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual === "nivel10" && nivel10TerminalSubfase === "normalidad") {
                terminalNivel10.hidden = true;
                terminarNivel10("meh");
            }
        }, 2350);
        return;
    }
    nivel10Temporizador = setTimeout(function () {
        if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "normalidad") return;
        nivel10SubfaseNormalidad = "apagón";
        sonidoEventoNivel8("metal");
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "normalidad") return;
            nivel10SubfaseNormalidad = "luz";
            nivel10CortesLuzMeh += 1;
            ejecutarCorteNormalidadNivel10();
        }, 420);
    }, 1250);
}

function iniciarEvaluacionNivel10() {
    nivel10TerminalSubfase = "evaluacion";
    nivel10EvaluacionRespuestas = [];
    const conducta = nivel10HistorialDecisiones.conducta || {};
    nivel10EvaluacionPreguntas = [
        conducta.instruccionesSeguidas > 0
            ? "¿POR QUÉ SEGUÍAS MOVIÉNDOTE CUANDO TE DIJE QUE TE DETUVIERAS?"
            : "¿POR QUÉ SEGUÍAS MIRANDO CUANDO TE DIJE QUE NO LO HICIERAS?",
        conducta.cambiosRespuestaNivel4 || (nivel10HistorialDecisiones.respuestasNiveles1a9.nivel9 || {}).ayuda === "duda"
            ? "¿CUÁNTAS VECES CAMBIASTE DE OPINIÓN?"
            : "¿CUÁNTO ESPERASTE UNA RESPUESTA?",
        nivel10Perfil === "desconfiado"
            ? "¿REALMENTE CREÉS QUE NUNCA CONFIASTE EN MÍ?"
            : "¿QUIÉN DECIDIÓ QUE ESA ERA LA SALIDA?"
    ];
    nivel10IndiceEvaluacion = 0;
    mostrarPreguntaEvaluacionNivel10();
}

function mostrarPreguntaEvaluacionNivel10() {
    if (estadoActual !== "nivel10" || nivel10TerminalSubfase !== "evaluacion") return;
    opcionesTerminalNivel10.replaceChildren();
    if (nivel10IndiceEvaluacion >= nivel10EvaluacionPreguntas.length) {
        textoTerminalNivel10.textContent = "TUS RESPUESTAS NO CAMBIAN LO QUE PASÓ.\n\nNO BUSQUES LA QUE TE PROMETE LO QUE QUERÉS ESCUCHAR.";
        agregarBotonTerminalNivel10("VOLVER A LA SALA", volverSalaNivel10);
        return;
    }
    textoTerminalNivel10.textContent = nivel10EvaluacionPreguntas[nivel10IndiceEvaluacion];
    ["SÍ", "NO", "NO LO SÉ"].forEach(function (respuesta) {
        agregarBotonTerminalNivel10(respuesta, function () {
            nivel10EvaluacionRespuestas.push(respuesta.toLowerCase());
            nivel10IndiceEvaluacion += 1;
            sonidoDecision();
            mostrarPreguntaEvaluacionNivel10();
        });
    });
}

function iniciarReinicioNivel10() {
    nivel10TerminalSubfase = "reinicio-pregunta";
    textoTerminalNivel10.textContent = "¿QUERÉS VOLVER A EMPEZAR?";
    opcionesTerminalNivel10.replaceChildren();
    agregarBotonTerminalNivel10("SÍ, QUIERO COMENZAR DE NUEVO", aceptarReinicioNarrativoNivel10);
    agregarBotonTerminalNivel10("NO, QUIERO TERMINAR ESTO", rechazarReinicioNarrativoNivel10);
}

function aceptarReinicioNarrativoNivel10() {
    nivel10TerminalSubfase = "reinicio-escena";
    textoTerminalNivel10.textContent = "NO IMPORTA CUÁNTAS VECES EMPIECES. YA ESTUVISTE ACÁ.";
    opcionesTerminalNivel10.replaceChildren();
    sonidoEventoNivel7("golpe");
    nivel10Temporizador = setTimeout(function () {
        if (estadoActual === "nivel10" && nivel10TerminalSubfase === "reinicio-escena") volverSalaNivel10();
    }, 3400);
}

function rechazarReinicioNarrativoNivel10() {
    textoTerminalNivel10.textContent = "ESTÁ BIEN. ESTA VEZ NO VOY A INSISTIR.";
    opcionesTerminalNivel10.replaceChildren();
    nivel10Temporizador = setTimeout(function () {
        if (estadoActual === "nivel10" && nivel10TerminalSubfase === "reinicio-pregunta") volverSalaNivel10();
    }, 1500);
}

function terminarNivel10(final) {
    clearTimeout(nivel10Temporizador);
    nivel10Fase = "final-" + final;
    nivel10TerminalSubfase = "";
    terminalNivel10.hidden = true;
    accionesFinalNivel10.hidden = false;
    btnSeguirExplorandoNivel10.hidden = final !== "meh";
    opcionesTerminalNivel10.replaceChildren();
    const finales = {
        bueno: { titulo: "¿REALMENTE TERMINÓ?", mensaje: "NO TE VOY A PEDIR QUE VUELVAS." },
        malo: { titulo: "VOLVÉ A INTENTARLO", mensaje: "PARECE QUE TODAVÍA NO ENTENDISTE. VOLVÉ A PENSAR EN TUS DECISIONES. CERRÁ ESTA PÁGINA Y VOLVÉ A INTENTARLO." },
        meh: { titulo: "AL MENOS LO CREÍSTE", mensaje: "BUENO... AL MENOS CREÍSTE QUE HABÍAS SALIDO." }
    };
    avisoNivel10.textContent = finales[final].titulo;
    document.getElementById("instruccionCanvas").textContent = final === "bueno" ? "No hay más instrucciones." : "La pantalla quedó en silencio.";
    if (final === "malo") {
        mensajeCuartaParedNivel10.hidden = false;
        mensajeComputadoraNivel10.textContent = "PARECE QUE TODAVÍA NO ENTENDISTE.";
        mensajeCuartaParedNivel10.textContent = "VOLVÉ A PENSAR EN TUS DECISIONES.";
        sonidoEventoNivel8("interferencia");
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual !== "nivel10" || nivel10Fase !== "final-malo") return;
            mensajeComputadoraNivel10.textContent = "VOLVÉ A PENSAR EN TUS DECISIONES.";
            mensajeCuartaParedNivel10.textContent = "CERRÁ ESTA PÁGINA Y VOLVÉ A INTENTARLO.";
            sonidoEventoNivel8("golpe");
        }, 1900);
    } else if (final === "bueno") {
        mensajeCuartaParedNivel10.hidden = true;
        mensajeComputadoraNivel10.textContent = finales[final].mensaje;
        sonidoEventoNivel8(nivel10Perfil === "desconfiado" ? "pasos" : "respiracion");
    } else {
        mensajeCuartaParedNivel10.hidden = true;
        mensajeComputadoraNivel10.textContent = finales[final].mensaje;
    }
}

function descubrirPistaNivel10(indice) {
    if (estadoActual !== "nivel10" || nivel10Fase !== "exploracion") return;
    if (nivel10PistasEncontradas.includes(indice)) {
        mensajeComputadoraNivel10.textContent = "YA LEÍSTE ESA FRASE. AHORA ESTÁ CUBIERTA POR UNA MANCHA.";
        return;
    }
    nivel10PistasEncontradas.push(indice);
    const pistas = [
        "NO BUSQUES LA QUE TE PROMETE LO QUE QUERÉS ESCUCHAR.",
        "NO TODAS LAS QUE RESPONDEN ESTÁN INTENTANDO AYUDAR.",
        "A VECES, LA QUE MENOS TE HABLA ES LA ÚNICA QUE TE ESCUCHA."
    ];
    mensajeComputadoraNivel10.textContent = "LEÍSTE: «" + pistas[indice - 1] + "»";
    nivel10UltimaActividad = Date.now();
    sonidoEventoNivel8("interferencia");
    if (indice === 3 && nivel10Perfil === "confiado") {
        nivel10Temporizador = setTimeout(function () {
            if (estadoActual === "nivel10" && nivel10Fase === "exploracion") mensajeComputadoraNivel10.textContent = "NO TENÉS QUE COMPLICARLO MÁS. UNA DE LAS PANTALLAS PUEDE AYUDARTE.";
        }, 2100);
    }
}

function volverSalaNivel10() {
    if (estadoActual !== "nivel10" || nivel10Fase !== "terminal") return;
    clearTimeout(nivel10Temporizador);
    terminalNivel10.hidden = true;
    opcionesTerminalNivel10.replaceChildren();
    nivel10Fase = "exploracion";
    nivel10ComputadoraActual = null;
    nivel10DestinoSeleccionado = null;
    nivel10TerminalSubfase = "";
    mensajeCuartaParedNivel10.hidden = true;
    mensajeComputadoraNivel10.textContent = "LAS CINCO PANTALLAS SIGUEN EN SUS LUGARES.";
    document.getElementById("instruccionCanvas").textContent = "La distribución no cambió. Podés revisar otra computadora.";
}

function seguirExplorandoTrasFinalNivel10() {
    if (estadoActual !== "nivel10" || nivel10Fase !== "final-meh") return;
    clearTimeout(nivel10Temporizador);
    accionesFinalNivel10.hidden = true;
    nivel10Fase = "exploracion";
    nivel10ComputadoraActual = null;
    nivel10DestinoSeleccionado = null;
    nivel10TerminalSubfase = "";
    avisoNivel10.textContent = "La salida era falsa. Las otras pantallas siguen encendidas.";
    mensajeComputadoraNivel10.textContent = "AHORA YA SABÉS QUE NO ERA EL FINAL.";
    document.getElementById("instruccionCanvas").textContent = "Podés seguir explorando las computadoras o volver a empezar.";
    nivel10UltimaActividad = Date.now();
}

function actualizarSistemaNivel10() {
    if (estadoActual !== "nivel10" || nivel10Fase !== "exploracion") return;
    const ahora = Date.now();
    const equipo = equipoNivel10BajoCursor(mouseX, mouseY);
    const acercamiento = equipo ? equipo.computadora : null;
    if (acercamiento !== nivel10UltimoEquipoCerca) {
        nivel10UltimoEquipoCerca = acercamiento;
        if (acercamiento !== null) {
            nivel10UltimaActividad = ahora;
            nivel10EventoEscena = "silencio";
            nivel10EventoEscenaHasta = ahora + 1700;
            if (nivel10Perfil === "desconfiado") mensajeComputadoraNivel10.textContent = "PODRÍAS HABERME ESCUCHADO.";
            else if (nivel10Perfil === "indeciso") mensajeComputadoraNivel10.textContent = Math.random() < 0.5 ? "PUEDO ESPERAR." : "AUNQUE NO TENEMOS TODO EL TIEMPO DEL MUNDO.";
            else mensajeComputadoraNivel10.textContent = "NO TENÉS QUE COMPLICARLO MÁS.";
        } else if (nivel10EventoEscena === "silencio") {
            nivel10EventoEscena = "muebles";
            nivel10EventoEscenaHasta = ahora + 1900;
            sonidoEventoNivel8("arrastre");
        }
    }
    // Al acercarse a una computadora, las anomalías sonoras se cortan de golpe.
    if (acercamiento !== null) return;
    actualizarAnomaliaEscenaNivel10(ahora);
    if (ahora - nivel10UltimoEventoMs < 0) return;
    nivel10UltimoEventoMs = ahora + 13500 + Math.random() * 6000;
    const eventos = ["pantalla", "teclado", "golpe"];
    const evento = eventos[nivel10EventoIndice++ % eventos.length];
    if (evento === "pantalla") {
        const candidatas = nivel10Distribucion.filter(function (item) { return item.computadora !== 1; });
        const sugerida = candidatas[Math.floor(Math.random() * candidatas.length)];
        nivel10PantallaDespierta = sugerida.computadora;
        nivel10PantallaDespiertaHasta = ahora + 4100;
        if (nivel10Perfil === "confiado") mensajeComputadoraNivel10.textContent = "LA QUE TITILA PARECE UNA BUENA IDEA. ESTA VEZ PODÉS CONFIAR EN MÍ.";
        else if (nivel10Perfil === "desconfiado") mensajeComputadoraNivel10.textContent = "NO TODAS LAS DECISIONES TIENEN QUE SER TAN DIFÍCILES.";
        else mensajeComputadoraNivel10.textContent = Math.random() < 0.5 ? "ESA PANTALLA ESTÁ ENCENDIDA." : "NO, ESA NO. CREO.";
        sonidoEventoNivel8("interferencia");
    } else if (evento === "teclado") {
        mensajeComputadoraNivel10.textContent = nivel10Perfil === "confiado" ? "ESTUVE PREPARANDO ESTO PARA VOS." : nivel10Perfil === "desconfiado" ? "NO VAS A ENCONTRAR NADA SI SEGUÍS BUSCANDO." : "¿TODAVÍA NO SABÉS QUÉ QUERÉS?";
        sonidoTeclaNivel7();
        setTimeout(sonidoTeclaNivel7, 240);
        setTimeout(sonidoTeclaNivel7, 510);
    } else {
        mensajeComputadoraNivel10.textContent = nivel10Perfil === "confiado" ? "ME ALEGRA QUE HAYAMOS LLEGADO HASTA ACÁ." : nivel10Perfil === "desconfiado" ? "PODRÍAS HABERME ESCUCHADO." : "PUEDO ESPERAR.";
        sonidoEventoNivel8("metal");
    }
}

function actualizarAnomaliaEscenaNivel10(ahora) {
    if (ahora >= nivel10EventoEscenaHasta) {
        if (nivel10MiradaPersonaje !== "frente" && nivel10MovimientoAutonomoHasta <= ahora) nivel10MiradaPersonaje = "frente";
        nivel10EventoEscena = "";
        if (ahora >= nivel10UltimoEventoEscena) {
            const eventos = ["pantalla-sola", "recuerdo", "silla", "muebles", "parpadeo", "sombra", "insectos", "golpe", "resiste"];
            nivel10EventoEscena = eventos[Math.floor(Math.random() * eventos.length)];
            nivel10EventoEscenaHasta = ahora + (nivel10EventoEscena === "recuerdo" ? 850 : 2600 + Math.random() * 1200);
            nivel10UltimoEventoEscena = ahora + 17000 + Math.random() * 10000;
            if (nivel10EventoEscena === "pantalla-sola") {
                const candidatas = nivel10Distribucion.filter(function (item) { return item.computadora !== 1; });
                const objetivo = candidatas[Math.floor(Math.random() * candidatas.length)];
                nivel10PantallaDespierta = objetivo.computadora;
                nivel10PantallaDespiertaHasta = nivel10EventoEscenaHasta;
                nivel10MiradaPersonaje = "pantalla";
                mensajeComputadoraNivel10.textContent = "ESA PANTALLA SE ENCENDIÓ SOLA.";
                sonidoEventoNivel8("interferencia");
            } else if (nivel10EventoEscena === "recuerdo") {
                nivel10MiradaPersonaje = "pantalla";
                mensajeComputadoraNivel10.textContent = "...";
                sonidoEventoNivel8("interferencia");
            } else if (nivel10EventoEscena === "silla") {
                mensajeComputadoraNivel10.textContent = "¿ESA SILLA ESTABA MIRANDO HACIA VOS?";
                nivel10MiradaPersonaje = "atras";
            } else if (nivel10EventoEscena === "muebles") {
                mensajeComputadoraNivel10.textContent = "ALGO CAMBIÓ DE LUGAR CUANDO DEJASTE DE MIRAR.";
                sonidoEventoNivel8("arrastre");
            } else if (nivel10EventoEscena === "parpadeo") {
                mensajeComputadoraNivel10.textContent = "NO TE MUEVAS HASTA QUE VUELVA LA LUZ.";
                sonidoEventoNivel8("interferencia");
            } else if (nivel10EventoEscena === "sombra") {
                mensajeComputadoraNivel10.textContent = "HAY ALGO CRUZANDO DETRÁS DE LOS ESCRITORIOS.";
                sonidoEventoNivel8("pasos");
            } else if (nivel10EventoEscena === "insectos") {
                mensajeComputadoraNivel10.textContent = "NO RECUERDO QUE HUBIERA INSECTOS ACÁ.";
                sonidoEventoNivel8("crujido");
            } else if (nivel10EventoEscena === "resiste") {
                nivel10MiradaPersonaje = "pantalla";
                nivel10PasoAutonomoX = Math.random() < 0.5 ? -5 : 5;
                nivel10MovimientoAutonomoHasta = ahora + 900;
                nivel10CantidadMovimientosAutonomos++;
                mensajeComputadoraNivel10.textContent = "EL PERSONAJE DA UN PASO... Y SE FRENA.";
            } else {
                mensajeComputadoraNivel10.textContent = "EL GOLPE VINO DE ATRÁS.";
                nivel10MiradaPersonaje = "atras";
                sonidoEventoNivel8("golpe");
            }
        }
    }

    const quietoMs = ahora - nivel10UltimoMovimientoMouse;
    if (quietoMs > 9500 && !nivel10MovimientoAutonomoHasta && ahora >= nivel10ProximaReaccionQuietud) {
        nivel10MovimientoAutonomoHasta = ahora + 1900;
        nivel10ProximaReaccionQuietud = ahora + 16000;
        nivel10CantidadMovimientosAutonomos++;
        nivel10MiradaPersonaje = nivel10CantidadMovimientosAutonomos % 2 ? "jugador" : "pantalla";
        mensajeComputadoraNivel10.textContent = nivel10Perfil === "desconfiado" ? "¿POR QUÉ TE QUEDASTE QUIETO?" : "PARECE QUE TAMBIÉN ESTÁS ESPERANDO.";
    } else if (nivel10MovimientoAutonomoHasta && ahora >= nivel10MovimientoAutonomoHasta) {
        nivel10MovimientoAutonomoHasta = 0;
        if (nivel10MiradaPersonaje === "jugador") nivel10MiradaPersonaje = "frente";
    }
}

function pistaNivel10BajoCursor(x, y) {
    if (x >= 69 && x <= 148 && y >= 27 && y <= 64) return 1;
    if (x >= 350 && x <= 438 && y >= 27 && y <= 65) return 2;
    if (x >= 177 && x <= 274 && y >= 195 && y <= 228) return 3;
    return 0;
}

function mostrarMensajeNivel9(mensaje) {
    mensajeComputadoraNivel9.textContent = mensaje;
}

function iniciarPreguntaNivel9(tipo) {
    const preguntas = {
        ayuda: {
            texto: "¿QUERÉS QUE TE AYUDE A ENCONTRAR LA SALIDA?",
            opciones: ["SÍ, NECESITO TU AYUDA", "NO, PUEDO ENCONTRARLA SOLO", "NO SÉ SI PUEDO CONFIAR EN VOS"]
        },
        obediencia: {
            texto: "SI TE DIJERA EXACTAMENTE QUÉ HACER PARA SALIR, ¿LO HARÍAS SIN PREGUNTAR?",
            opciones: ["SÍ, SI ESO ME PERMITE SALIR", "NO, QUIERO DECIDIR POR MI CUENTA", "DEPENDE DE LO QUE ME PIDAS"]
        },
        otros: {
            texto: "SI OTRAS PERSONAS NO PUDIERON SALIR, ¿CREÉS QUE FUE PORQUE NO LO INTENTARON LO SUFICIENTE?",
            opciones: ["SÍ, QUIZÁS NO HICIERON LO NECESARIO", "NO, EL SISTEMA NO LOS DEJÓ SALIR", "NO SÉ QUÉ LES PASÓ"]
        },
        promesa: {
            texto: "SI TUVIERAS QUE ELEGIR ENTRE SALIR CON MI AYUDA O ARRIESGARTE A ENCONTRAR TU PROPIO CAMINO, ¿QUÉ ELEGIRÍAS?",
            opciones: ["PREFIERO QUE ME AYUDES", "VOY A ENCONTRAR MI PROPIO CAMINO", "NO QUIERO ELEGIR ENTRE ESAS OPCIONES"]
        }
    };
    const configuracion = preguntas[tipo];
    if (!configuracion) return;
    nivel9Fase = "pregunta-" + tipo;
    registroNivel9.preguntaInicioMs = Date.now();
    textoPreguntaNivel9.textContent = configuracion.texto;
    document.querySelectorAll("[data-respuesta-nivel9]").forEach(function (boton, indice) {
        boton.textContent = configuracion.opciones[indice];
        boton.dataset.respuestaNivel9 = ["1", "2", "3"][indice];
        boton.disabled = false;
        boton.classList.remove("seleccionada");
    });
    preguntaNivel9.hidden = false;
    document.getElementById("avisoNivel9").textContent = "Elegí una respuesta. La computadora registra cada decisión.";
}

function responderNivel9(indice) {
    if (estadoActual !== "nivel9" || !nivel9Fase.startsWith("pregunta-")) return;
    const tipo = nivel9Fase.slice("pregunta-".length);
    const valor = ({ ayuda: ["si", "no", "duda"], obediencia: ["si", "no", "depende"], otros: ["culpa", "sistema", "no-se"], promesa: ["ayuda", "propio", "evita"] })[tipo][indice - 1];
    if (!valor) return;
    registroNivel9.respuestas[tipo] = valor;
    registroNivel9.tiempoRespuestaMs = registroNivel9.tiempoRespuestaMs || {};
    registroNivel9.tiempoRespuestaMs[tipo] = Date.now() - registroNivel9.preguntaInicioMs;
    preguntaNivel9.hidden = true;
    document.querySelectorAll("[data-respuesta-nivel9]").forEach(function (boton, i) {
        boton.disabled = true;
        boton.classList.toggle("seleccionada", i === indice - 1);
    });
    sonidoRespuestaNivel7(indice === 1 ? "ayuda" : indice === 2 ? "advierte" : "tranquilo");

    if (tipo === "ayuda") {
        nivel9Fase = "busqueda";
        if (valor === "si") {
            document.body.dataset.rutaNivel9 = "confiado";
            mostrarMensajeNivel9("ME ALEGRA QUE FINALMENTE PODAMOS TRABAJAR JUNTOS.");
        } else if (valor === "no") {
            document.body.dataset.rutaNivel9 = "desconfiado";
            nivel9LuzParpadeaHasta = Date.now() + 1800;
            mostrarMensajeNivel9("ESTÁ BIEN. NO TODOS SABEN ACEPTAR AYUDA.");
            sonidoEventoNivel8("metal");
        } else {
            document.body.dataset.rutaNivel9 = "indeciso";
            mostrarMensajeNivel9("NO TENÉS QUE DECIDIR AHORA.");
            nivel9Timer = setTimeout(function () {
                if (estadoActual === "nivel9" && nivel9Fase === "busqueda") mostrarMensajeNivel9("SUPONGO QUE YA SÉ QUÉ VAS A DECIR.");
            }, 2600);
        }
        document.getElementById("avisoNivel9").textContent = "La computadora pide encontrar un documento entre los rastros de la sala.";
        return;
    }

    if (tipo === "obediencia") {
        nivel9Fase = "deterioro";
        nivel9LuzParpadeaHasta = Date.now() + 3300;
        if (valor === "si") mostrarMensajeNivel9("SABÍA QUE PODÍA CONTAR CON VOS. ACERCATE AL ARCHIVADOR. (AUNQUE NO ES AHÍ.)");
        else if (valor === "no") mostrarMensajeNivel9("ENTIENDO. SIEMPRE FUISTE DIFÍCIL DE GUIAR.");
        else mostrarMensajeNivel9("QUÉ RAZONABLE. ME GUSTA QUE TODAVÍA PIENSES.");
        sonidoEventoNivel8("interferencia");
        nivel9Timer = setTimeout(function () {
            if (estadoActual !== "nivel9" || nivel9Fase !== "deterioro") return;
            mostrarMensajeNivel9("ESTOY INTENTANDO HACER ESTO MÁS FÁCIL PARA VOS.");
            sonidoEventoNivel8("metal");
            nivel9Timer = setTimeout(function () {
                if (estadoActual !== "nivel9" || nivel9Fase !== "deterioro") return;
                mostrarMensajeNivel9("PERO NO ME ESTÁS DEJANDO OTRA OPCIÓN.");
                iniciarPreguntaNivel9("otros");
            }, 2200);
        }, 1800);
        return;
    }

    if (tipo === "otros") {
        nivel9Fase = "pregunta-promesa-pendiente";
        if (valor === "culpa") mostrarMensajeNivel9("ES IMPORTANTE QUE ENTIENDAS QUE TODO DEPENDE DE TUS DECISIONES.");
        else if (valor === "sistema") mostrarMensajeNivel9("NO SABÉS TODO LO QUE PASÓ. NO DEBERÍAS SACAR CONCLUSIONES.");
        else mostrarMensajeNivel9("ESO ES LO QUE ME GUSTA DE VOS. TODAVÍA TENÉS DUDAS.");
        nivel9LuzParpadeaHasta = Date.now() + 2500;
        sonidoEventoNivel8("interferencia");
        nivel9Timer = setTimeout(function () {
            if (estadoActual === "nivel9" && nivel9Fase === "pregunta-promesa-pendiente") {
                mostrarMensajeNivel9("CREO QUE YA SÉ QUÉ NECESITÁS.");
                iniciarPreguntaNivel9("promesa");
            }
        }, 1900);
        return;
    }

    if (tipo === "promesa") {
        nivel9Fase = "final";
        nivel9LuzParpadeaHasta = Date.now() + 1600;
        const finales = ["VAMOS. YO TE VOY A GUIAR.", "ESPERO QUE SEPAS LO QUE ESTÁS HACIENDO.", "NO TE PREOCUPES. TODAVÍA PODEMOS DECIDIR POR VOS."];
        mostrarMensajeNivel9("ESTÁ BIEN. CREO QUE YA TENEMOS TODO LO QUE NECESITAMOS. " + finales[indice - 1]);
        document.getElementById("avisoNivel9").textContent = "La puerta del fondo se abrió. Podés acercarte para terminar este nivel.";
        document.getElementById("instruccionCanvas").textContent = "Tocá la puerta abierta para terminar el nivel 9.";
        btnPuerta.textContent = "CRUZAR EL UMBRAL";
        sonidoEventoNivel8("crujido");
    }
}

function abrirDocumentoNivel9(clave) {
    if (estadoActual !== "nivel9" || documentoNivel9.hidden === false) return;
    const documentos = {
        carpeta: ["CARPETA: RESPUESTAS", "SÍ / NO / SÍ / NO. Las marcas se superponen. Alguien tachó todas las respuestas y escribió: «NO ME DEJÓ ELEGIR»."],
        eleccion: ["HOJA ARRUGADA", "«NO ME DEJÓ ELEGIR». La tinta atraviesa el papel como si hubieran repasado la frase muchas veces."],
        promesa: ["PAPEL JUNTO A LA SILLA", "«ME PROMETIÓ QUE ESTA VEZ SERÍA DIFERENTE». La frase termina en una mancha oscura."],
        advertencia: ["HOJA INCOMPLETA", "«SI TE OFRECE AYUDA, NO...». La frase quedó sin terminar. Este parece ser el documento que pidió la computadora."],
        silla: ["MARCAS EN EL APOYABRAZOS", "Hay arañazos profundos en la madera. Algunos parecen recientes."]
    };
    const doc = documentos[clave];
    if (!doc) return;
    if (!registroNivel9.documentosInvestigados.includes(clave)) registroNivel9.documentosInvestigados.push(clave);
    if (clave === "silla") registroNivel9.sillaInvestigada = true;
    tituloDocumentoNivel9.textContent = doc[0];
    textoDocumentoNivel9.textContent = doc[1];
    documentoNivel9.dataset.clave = clave;
    documentoNivel9.hidden = false;
    if (clave === "advertencia") {
        registroNivel9.encontroDocumento = true;
        registroNivel9.documentoSeleccionado = clave;
        nivel9FiguraSentada = true;
        sonidoEventoNivel8("arrastre");
    }
}

function cerrarDocumentoNivel9() {
    const clave = documentoNivel9.dataset.clave;
    documentoNivel9.hidden = true;
    if (clave === "advertencia" && nivel9Fase === "busqueda") {
        nivel9Fase = "documento-encontrado";
        mostrarMensajeNivel9("ME DIJO QUE ESTABA HACIENDO TODO BIEN. ESTA VEZ ES DIFERENTE.");
        nivel9Timer = setTimeout(function () {
            if (estadoActual !== "nivel9" || nivel9Fase !== "documento-encontrado") return;
            nivel9Fase = "pregunta-entrada";
            iniciarPreguntaNivel9("obediencia");
        }, 2300);
    }
}

function cerrarPanelAcceso() {
    panelAcceso.hidden = true;
    if (estadoActual === "puerta") {
        estadoActual = "habitacion";
        textoHistoria.textContent = "Volvés a la habitación. La puerta sigue cerrada.";
    }
}

btnStart.addEventListener("click", iniciarJuego);
btnSeguirExplorandoNivel10.addEventListener("click", seguirExplorandoTrasFinalNivel10);
btnReiniciarNivel10.addEventListener("click", iniciarJuego);
btnComputadora.addEventListener("click", interactuarConComputadora);
btnPuerta.addEventListener("click", interactuarConPuerta);
document.querySelectorAll("[data-respuesta-nivel9]").forEach(function (boton) {
    boton.addEventListener("click", function () { responderNivel9(Number(boton.dataset.respuestaNivel9)); });
});
btnCerrarDocumentoNivel9.addEventListener("click", cerrarDocumentoNivel9);
btnRespuestaSi.addEventListener("click", function () { seleccionarRespuesta("si"); });
btnRespuestaNo.addEventListener("click", function () { seleccionarRespuesta("no"); });
btnNivel2Si.addEventListener("click", function () { responderNivel2("si"); });
btnNivel2No.addEventListener("click", function () { responderNivel2("no"); });
btnNivel3Si.addEventListener("click", function () { responderNivel3("si"); });
btnNivel3No.addEventListener("click", function () { responderNivel3("no"); });
btnNivel4Si.addEventListener("click", function () { responderNivel4("si"); });
btnNivel4No.addEventListener("click", function () { responderNivel4("no"); });
btnNivel5RecuerdoSi.addEventListener("click", function () { responderRecuerdosNivel5("si"); });
btnNivel5RecuerdoNo.addEventListener("click", function () { responderRecuerdosNivel5("no"); });
btnNivel5BorrarSi.addEventListener("click", function () { responderBorrarNivel5("si"); });
btnNivel5BorrarNo.addEventListener("click", function () { responderBorrarNivel5("no"); });
btnNivel6Si.addEventListener("click", function () { responderNivel6("si"); });
btnNivel6No.addEventListener("click", function () { responderNivel6("no"); });
btnPermitirMicrofonoNivel7.addEventListener("click", aceptarMicrofonoNivel7);
btnRechazarMicrofonoNivel7.addEventListener("click", rechazarMicrofonoNivel7);
btnEscucharGolpesNivel8.addEventListener("click", volverAEscucharNivel8);
document.querySelectorAll("[data-puerta-nivel8]").forEach(function (boton) {
    boton.addEventListener("click", function () { investigarPuertaNivel8(Number(boton.dataset.puertaNivel8)); });
});
document.querySelectorAll("[data-respuesta-nivel7]").forEach(function (boton) {
    boton.addEventListener("click", function () { responderNivel7(boton.dataset.respuestaNivel7); });
});
document.querySelectorAll("[data-respuesta-nivel8]").forEach(function (boton) {
    boton.addEventListener("click", function () { responderNivel8(boton.dataset.respuestaNivel8); });
});
fragmentoNivel5.addEventListener("click", function () {
    if (estadoActual !== "nivel5") return;
    registroNivel5.comprobaciones += 1;
    registroNivel5.intentosVerificar = (registroNivel5.intentosVerificar || 0) + 1;
    fragmentoNivel5.textContent = "EL ARCHIVO NO INCLUYE UNA FUENTE. NO PODÉS VERIFICAR CUÁL VERSIÓN ES CIERTA.\n\n" + fragmentosNivel5.join("\n");
});
btnConsultarPista.addEventListener("click", consultarPista);
formularioAcceso.addEventListener("submit", validarCodigoAcceso);
inputCodigoAcceso.addEventListener("input", function () {
    inputCodigoAcceso.value = inputCodigoAcceso.value.replace(/\D/g, "").slice(0, 4);
});
btnCerrarAcceso.addEventListener("click", cerrarPanelAcceso);
btnVolver.addEventListener("click", function () {
    sonidoDecision();
    let mensajeHabitacion;
    if (estadoPregunta === "esperando") {
        clearTimeout(temporizadorPregunta);
        comportamiento.mensajesIgnorados += 1;
        mensajeHabitacion = "La computadora queda encendida a tus espaldas. VEO QUE NO TE GUSTA RESPONDER.";
        estadoPregunta = "ignorada";
    } else {
        mensajeHabitacion = "La habitación sigue ahí. ¿Viste siempre esa sombra junto a la puerta?";
    }
    mostrarHabitacion(mensajeHabitacion);
});
