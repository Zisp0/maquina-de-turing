const verificarAyB = /^(a*b*\s*)*$/
var atencion = "Atención:"
var txValidarAyB = "Por favor ingrese una cadena sobre a y b."

$(function () {
    llenar()
    $("#cargar").click(function (e) {
        if(verificarAyB.test($("#expresion").val())){
            cadena = $("#expresion").val()
            if (cadena.length == 0) {
                llenar()
            } else {
                llenar(cadena)
                cargar()
                pausar()
            }
        }else{
            Swal.fire({
                title: atencion,
                text: txValidarAyB,
                icon: 'warning'
            })
            speak(txValidarAyB)
        }
    })

    $("#correr").click(function (e) {
        if (cadena.length != 0) {
            ejecutar()
        }
    })

    $("#pausar").click(function (e) {
        pausar()
    })

    $("#paso").click(function (e) {
        pausar()
        paso()
    })

    $("#velocidad").change(function (e) { 
        console.log((parseInt($("#velocidad").val(), 10) - 5000)*-1)
        pausar()
        inc = (parseInt($("#velocidad").val(), 10) - 5000)*-1
    });
});

var cadena = ""
var estado = 'q1'

function llenar(cadena = ''){
    $(".cinta").empty()
    if(cadena != ''){
        for (let i = 0; i < 5; i++) {
            $(".cinta").append('<div><p class="position-absolute top-50 start-50 translate-middle"></p></div>') 
        }
        for (let i = 0; i < cadena.length; i++) {
            $(".cinta").append('<div><p id="'+i+'" class="position-absolute top-50 start-50 translate-middle">' + cadena.charAt(i) + '</p></div>')
        }
        for (let i = 0; i < 5; i++) {
            $(".cinta").append('<div><p class="position-absolute top-50 start-50 translate-middle"></p></div>') 
        }
        $(".cinta div").animate({left: '-=66px'}, 0)
    }else{
        for (let i = 0; i < 10; i++) {
            $(".cinta").append('<div><p class="position-absolute top-50 start-50 translate-middle"></p></div>') 
        }
    }
}

function derecha() {
    $(".cinta div").animate({ left: '-=66px' }, inc)
}

function izquierda() {
    $(".cinta div").animate({ left: '+=66px' }, inc)
}

var inc = 2500
var pos = 0
var timeMove = 0
var timeCamb = 0
var cad = ""
var mat = []
var cambios = []
var apos = 0
var leidosMat = 0
var leidosMov = 0
function cargar() {
    regreso = false
    leidosMov = 0
    leidosMat = 0
    apos = 0
    pos = 0
    timeMove = 0
    timeCamb = 0
    cad = cadena
    mat = []
    cambios = []
    let caracter = ""
    estado = 'q1'
    while (estado != "q3") {
        if (cad.charAt(pos) === '') {
            caracter = 'nulo'
        } else {
            caracter = cad.charAt(pos)
        }
        if (pos >= 0 && pos < cad.length) {
            mat.push([pos, reglas[estado.substring(1, 2) - 1][cad.charAt(pos)][1]])
            cad = Array.from(cad)
            cad[pos] = reglas[estado.substring(1, 2) - 1][cad[pos]][1]
            cad = cad.join("")
        }
        if (reglas[estado.substring(1, 2) - 1][caracter][2] == 'R') {
            pos++
            cambios.push('R')
        } else {
            pos--
            cambios.push('L')
        }
        estado = reglas[estado.substring(1, 2) - 1][caracter][0]
    }
}

function ejecutar() {
    for (let index = leidosMat; index < mat.length; index++) {
        cambiar(mat[index][0], mat[index][1])  
    }
    for (let index = leidosMov; index < cambios.length; index++) {
        mover(cambios[index])   
    }
}
var cambiosOut = []
function mover(element) {
    cambiosOut.push(setTimeout(() => {
        if (element == 'R') {
            derecha()
        } else {
            izquierda()
        }
        leidosMov++
    }, timeMove))
    timeMove += inc
}
var carOut = []
var regreso = false
function cambiar(p, v) {
    if (apos > 0 && apos == p) {
        timeCamb += inc
    }
    carOut.push(setTimeout(() => {
        $("#" + p).text(v)
        leidosMat++
    }, timeCamb))
    timeCamb += inc
    apos = p
}

function pausar() {
    cambiosOut.forEach(element => {
        clearTimeout(element)
    })
    carOut.forEach(element => {
        clearTimeout(element)
    })
    cambiosOut = []
    carOut = []
    timeCamb = 0
    timeMove = 0
}

function paso() {
    if(leidosMat >= mat.length / 2){
        regreso = true
    }
    console.log(regreso+" "+leidosMat+" "+mat.length)
    if(leidosMat < mat.length){
        if(regreso && apos != leidosMat){
            cambiar(mat[leidosMat-1][0], mat[leidosMat-1][1])
        }else{
            cambiar(mat[leidosMat][0], mat[leidosMat][1])
        }
    }
    if(leidosMov < cambios.length){
        mover(cambios[leidosMov]) 
    }
    timeCamb = 0
    timeMove = 0
}

function deselect() {
    $('.form-select').attr("disabled", true);
    $('.form-select').attr("disabled", false);
}