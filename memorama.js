// Lógica del memorama-SRV
let pointerCounter=0;
const Pares = new Map([
    ["Manzana",'🍎'],
    ["Mango",'🥭'],
    ["Sandia",'🍉'],
    ["Naranja",'🍊'],
    ["Cherry",'🍒'],
    ["Melón",'🍈'],
    ["Uva",'🍇'],
    ["Platano",'🍌']
]);

let mezcla=Array.from(Pares.values()).concat(Array.from(Pares.values()));
mezcla=mezcla.sort(()=>Math.random()-0.5);

let primera=null;
let second=null;
let lockBoard=false;

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
    const pointsEl=document.getElementById('points');
    const scoreEl=document.getElementById('score');

    function resetCounters(){
        movimientos=0; aciertos=0; movesEl.textContent=movimientos; scoreEl.textContent=aciertos; pointerCounter=0; pointsEl.textContent=pointerCounter;    
    }

    function renderBoard(){
        boardEl.innerHTML='';
        mezcla.forEach((val, idx)=>{
            const card=document.createElement('div');
            card.className='card';
            card.tabIndex=0;
            card.dataset.value=val;
            card.dataset.index=idx;
            card.textContent='?';
            card.addEventListener('click', onCardClick);
            card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') onCardClick.call(card,e); });
            boardEl.appendChild(card);
        });
    }

    function updateCounters(){
        movesEl.textContent=movimientos;
        scoreEl.textContent=aciertos;
        pointsEl.textContent=pointerCounter;
    }

    function onCardClick(e){
        const card=this;
        if (lockBoard) return;
        if(card.classList.contains('matched') || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        card.textContent=card.dataset.value;

        if(!primera){
            primera=card;
            return;
        }

        if(primera===card) return;
        second=card;
        movimientos++;
        updateCounters();
        lockBoard=true;

        if(primera.dataset.value===second.dataset.value){
            primera.classList.add('matched');
            second.classList.add('matched');
            aciertos++;
            pointerCounter+=50;
            primera=null; second=null;
            updateCounters();
            pointsEl.classList.add('points-change');
            setTimeout(() => pointsEl.classList.remove('points-change'), 500);
            lockBoard=false;
        } else {
            if (pointerCounter > 0) pointerCounter -= 10;
            setTimeout(()=>{
                if(primera) { primera.classList.remove('flipped'); primera.textContent='?'; }
                if(second) { second.classList.remove('flipped'); second.textContent='?'; }
                primera=null; second=null;
                lockBoard=false;
            }, 800);
        }
    }

    function showGame(username){
        loginSection.style.display='none';
        gameSection.style.display='block';
        playerNameSpan.textContent=username||'Jugador';
        resetCounters();
        mezcla=mezcla.sort(()=>Math.random()-0.5);
        renderBoard();
    }

    function showLogin(){
        loginSection.style.display='block';
        gameSection.style.display='none';
        boardEl.innerHTML='';
        loginError.textContent='';
        primera=null; second=null;
    }

    loginForm.addEventListener('submit',(ev)=>{
        ev.preventDefault();
        const username=(document.getElementById('username')||{}).value||'';
        const password=(document.getElementById('password')||{}).value||'';
        if(username.trim() && password.trim()){
            showGame(username.trim());
        } else {
            loginError.textContent='Introduce usuario y contraseña (cualquier texto válido).';
        }
    });

    guestBtn.addEventListener('click',()=> showGame('Invitado'));
    logoutBtn.addEventListener('click',()=> showLogin());

    showLogin();
});
