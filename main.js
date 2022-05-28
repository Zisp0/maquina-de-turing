$(function () {
    llenar()

    $("#cargar").click(function (e) {
        cadena = $("#cadena").val().trim()
        if(cadena === ""){
            llenar()
        }else{
            llenar(cadena)
        }
    })

    $("#correr").click(function (e) {
        cadena = $("#cadena").val().trim()
        if(cadena != ""){
            ejecutar()
        }
    })
});

var cadena = ""
var estado = 'q1'

function llenar(cadena = ''){
    $(".container").empty()
    if(cadena != ''){
        for (let i = 0; i < 5; i++) {
            $(".container").append('<div><p></p></div>') 
        }
        for (let i = 0; i < cadena.length; i++) {
            $(".container").append('<div><p id="'+i+'">' + cadena.charAt(i) + '</p></div>')
        }
        for (let i = 0; i < 5; i++) {
            $(".container").append('<div><p></p></div>') 
        }
        $(".container div").animate({left: '-=66px'}, 0)
    }else{
        for (let i = 0; i < 10; i++) {
            $(".container").append('<div><p></p></div>') 
        }
    }
}

function derecha() {
    $(".container div").animate({left: '-=66px'}, 500)
}

function izquierda() {
    $(".container div").animate({left: '+=66px'}, 500)
}

var inc = 0
var pos = 0
var cad = ""
var mat = []
var apos = 0
function ejecutar(){
    apos = 0
    cad = cadena
    mat = []
    inc = 0
    pos = 0
    let caracter = ""
    estado = 'q1'
    while(estado != "q3"){
        
        if(cad.charAt(pos) === ''){
            caracter = 'nulo'
        }else{
            caracter = cad.charAt(pos)
        }
        if(pos >= 0 && pos < cad.length){
            mat.push([pos, reglas[estado.substring(1, 2)-1][cad.charAt(pos)][1]])
                cad = Array.from(cad)
                cad[pos] = reglas[estado.substring(1, 2)-1][cad[pos]][1]
                cad = cad.join("")
        }
        if(reglas[estado.substring(1, 2)-1][caracter][2] == 'R'){
            pos++
            derecha()
        }else{
            pos--
            izquierda()
        }
        estado = reglas[estado.substring(1, 2)-1][caracter][0]
    }

    mat.forEach(element => {
        cambiar(element[0], element[1])
    });
}

function cambiar(p, v){
    if(apos > 0 && apos == p){
        inc += 500
    }
    setTimeout(() => {
        $("#" + p).text(v)
    }, inc);
    inc += 500
    apos = p
}