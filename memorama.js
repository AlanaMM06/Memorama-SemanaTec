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

// --- DOM / Login integration (minimal, non-intrusive) ---
document.addEventListener('DOMContentLoaded', ()=>{
    const loginSection=document.getElementById('login-section');
    const gameSection=document.getElementById('game-section');
    const loginForm=document.getElementById('login-form');
    const guestBtn=document.getElementById('guest-btn');
    const logoutBtn=document.getElementById('logout-btn');
    const playerNameSpan=document.getElementById('player-name');
    const loginError=document.getElementById('login-error');
    const boardEl=document.getElementById('board');
    const movesEl=document.getElementById('moves');
    const scoreEl=document.getElementById('score');

    function resetCounters(){
        movimientos=0; aciertos=0; movesEl.textContent=movimientos; scoreEl.textContent=aciertos;
    }

    function renderBoard(){
        // limpiar
        boardEl.innerHTML='';
        // mezcla ya está definida arriba
        mezcla.forEach((val, idx)=>{
            const card=document.createElement('div');
            card.className='card';
            card.tabIndex=0;
            card.dataset.value=val;
            card.dataset.index=idx;
            // contenido mínimo: oculto por defecto, mostrar valor cuando se voltea
            card.textContent='?';
            card.addEventListener('click', onCardClick);
            card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') onCardClick.call(card,e); });
            boardEl.appendChild(card);
        });
    }

    function updateCounters(){
        movesEl.textContent=movimientos;
        scoreEl.textContent=aciertos;
    }

    function onCardClick(e){
        const card=this;
        if(card.classList.contains('matched') || card.classList.contains('flipped')) return;
        // flip visual
        card.classList.add('flipped');
        card.textContent=card.dataset.value;

        if(!primera){
            primera=card;
            return;
        }
        if(primera===card) return; // misma carta
        second=card;
        movimientos++;
        updateCounters();

        // comparar valores
        if(primera.dataset.value===second.dataset.value){
            primera.classList.add('matched');
            second.classList.add('matched');
            aciertos++;
            primera=null; second=null;
            updateCounters();
            // opcional: comprobar fin de juego
        } else {
            // dejar ver y voltear de nuevo
            setTimeout(()=>{
                if(primera) { primera.classList.remove('flipped'); primera.textContent='?'; }
                if(second) { second.classList.remove('flipped'); second.textContent='?'; }
                primera=null; second=null;
            }, 800);
        }
    }

    function showGame(username){
        loginSection.style.display='none';
        gameSection.style.display='block';
        playerNameSpan.textContent=username||'Jugador';
        resetCounters();
        // mezclar de nuevo para nueva partida
        mezcla=mezcla.sort(()=>Math.random()-0.5);
        renderBoard();
    }

    function showLogin(){
        loginSection.style.display='block';
        gameSection.style.display='none';
        // limpiar tablero
        boardEl.innerHTML='';
        loginError.textContent='';
        primera=null; second=null;
    }

    loginForm.addEventListener('submit',(ev)=>{
        ev.preventDefault();
        const username=(document.getElementById('username')||{}).value||'';
        const password=(document.getElementById('password')||{}).value||'';
        // validación mínima: ambos no vacíos
        if(username.trim() && password.trim()){
            showGame(username.trim());
        } else {
            loginError.textContent='Introduce usuario y contraseña (cualquier texto válido).';
        }
    });

    guestBtn.addEventListener('click',()=> showGame('Invitado'));
    logoutBtn.addEventListener('click',()=> showLogin());

    // estado inicial
    showLogin();
});

