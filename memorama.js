// Lógica del memorama-SRV

const Pares=new Map([
    ["Manzana1",'img-1'],["Mango1",'img-2'],["Sandia1",'img-3'],
    ["Naranja1",'img-4'],["Mandarina1",'img-5'],["Melón1",'img-6'],
    ["Uva1",'img-7'],["Platano1",'img-8'],["Manzana2",'img-1'],["Mango2",'img-2'],["Sandia2",'img-3'],
    ["Naranja2",'img-4'],["Mandarina2",'img-5'],["Melón2",'img-6'],
    ["Uva2",'img-7'],["Platano2",'img-8']
]);

let mezcla=Array.from(Pares.values()).concat(Array.from(Pares.values()));
mezcla=mezcla.sort(()=>Math.random()-0.5);

let primera=null;
let second=null;

let movimientos=0;
let aciertos=0;


function voltear(idCarta){
    const carta=mezcla.find(([id])=>id===idCarta);
    if(!card){
        //Mensaje de error 
        console.log("No se encontro :(");
        return;
    }
    if(primera && primera[0]==idCarta){
        //Se volteo la misma
        return;  
    }
    if(!primera){
        primera=carta;
    }else{
        segunda=carta;
        movimientos++;

    }
}

function verificarPareja(){
    if(primera[1]==segunda[1]){
        aciertos++;
        //Se quedan estaticas
        console.log("Hay match");
    }else{
        console.log("No");
    }
    primera=null;
    segunda=null;

    GameOver();
}

function GameOver(){
    if(aciertos==mezcla.length/2){
        console.log(`Ganaste en ${movimientos} movimientos`);
    } 
}
