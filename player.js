let player = document.getElementById("player");
let playerPos = { top: 200, left: 200 };
let speed = 5;
let keys = {};
let walls = [];

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function gameLoop() {
    let newTop = playerPos.top;
    let newLeft = playerPos.left;

    if(keys["ArrowUp"]||keys["w"]) newTop -= speed;
    if(keys["ArrowDown"]||keys["s"]) newTop += speed;
    if(keys["ArrowLeft"]||keys["a"]) newLeft -= speed;
    if(keys["ArrowRight"]||keys["d"]) newLeft += speed;

    // clamp inside screen
    newTop = Math.max(0, Math.min(window.innerHeight-40, newTop));
    newLeft = Math.max(0, Math.min(window.innerWidth-40, newLeft));

    // collision with walls
    let collided = false;
    for(let wall of walls){
        let wRect = wall.getBoundingClientRect();
        let pRect = {top:newTop, left:newLeft, bottom:newTop+40, right:newLeft+40};
        if(pRect.right > wRect.left && pRect.left < wRect.right && pRect.bottom > wRect.top && pRect.top < wRect.bottom){
            collided = true;
            break;
        }
    }

    if(!collided){
        playerPos.top = newTop;
        playerPos.left = newLeft;
    }

    player.style.top = playerPos.top + "px";
    player.style.left = playerPos.left + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();
