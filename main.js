$(function () {
    llenar()

    $("#cargar").click(function (e) {
        cadena = $("#cadena").val()
        if (cadena.length == 0) {
            llenar()
        } else {
            llenar(cadena)
            cargar()
            pausar()
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
});

var cadena = ""
var estado = 'q1'

function llenar(cadena = '') {
    $(".container").empty()
    if (cadena != '') {
        for (let i = 0; i < 5; i++) {
            $(".container").append('<div><p></p></div>')
        }
        for (let i = 0; i < cadena.length; i++) {
            $(".container").append('<div><p id="' + i + '">' + cadena.charAt(i) + '</p></div>')
        }
        for (let i = 0; i < 5; i++) {
            $(".container").append('<div><p></p></div>')
        }
        $(".container div").animate({ left: '-=66px' }, 0)
    } else {
        for (let i = 0; i < 10; i++) {
            $(".container").append('<div><p></p></div>')
        }
    }
}

function derecha() {
    $(".container div").animate({ left: '-=66px' }, inc)
}

function izquierda() {
    $(".container div").animate({ left: '+=66px' }, inc)
}

var inc = 0
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
    inc = 500
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