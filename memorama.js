// Lógica del memorama-SRV

const Pares=new Map([
    ["Manzana",'img-1'],["Mango",'img-2'],["Sandia",'img-3'],
    ["Naranja",'img-4'],["Mandarina",'img-5'],["Melón",'img-6'],
    ["Uva",'img-7'],["Platano",'img-8']
]);

let mezcla=Array.from(Pares.values()).concat(Array.from(Pares.values()));
mezcla=mezcla.sort(()=>Math.random()-0.5);

let primera=null;
let second=null;

let movimientos=0;
let aciertos=0;
