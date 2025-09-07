let money = 10;
let soldiers = 0;

// Update stats
function updateUI(){
  document.getElementById("money").textContent = money;
  document.getElementById("soldiers").textContent = soldiers;
}

// Soldier buttons
function createSoldierButton(id, top, left){
  let btn = document.createElement("div");
  btn.classList.add("button");
  btn.style.top = top+"px";
  btn.style.left = left+"px";
  btn.textContent = "$10";
  document.getElementById("game").appendChild(btn);

  btn.addEventListener("click", ()=>{
    if(money >= 10){
      money -= 10;
      soldiers++;
      updateUI();
      btn.style.display = "none";

      // create soldier
      let soldier = document.createElement("div");
      soldier.classList.add("soldier");
      soldier.style.top = (top+40)+"px";
      soldier.style.left = (left+20)+"px";
      document.getElementById("game").appendChild(soldier);

      // bullets for passive income
      setInterval(()=>{
        money +=1;
        updateUI();

        let bullet = document.createElement("div");
        bullet.classList.add("bullet");
        bullet.style.top = parseInt(soldier.style.top)+7+"px";
        bullet.style.left = parseInt(soldier.style.left)-5+"px";
        document.getElementById("game").appendChild(bullet);

        let bulletX = parseInt(bullet.style.left);
        let moveBullet = setInterval(()=>{
          bulletX -= 5;
          bullet.style.left = bulletX+"px";
          if(bulletX < document.getElementById("target").getBoundingClientRect().left){
            bullet.remove();
            clearInterval(moveBullet);
          }
        },20);
      },1000);
    }
  });
}

// Create 3 soldier buttons
createSoldierButton("soldier1", 80, 100);
createSoldierButton("soldier2", 80, 200);
createSoldierButton("soldier3", 80, 300);

// Wall buttons
function createWallButton(id, top, left, width, height){
  let btn = document.createElement("div");
  btn.classList.add("wall-button");
  btn.style.top = top+"px";
  btn.style.left = left+"px";
  btn.textContent = "$30";
  document.getElementById("game").appendChild(btn);

  btn.addEventListener("click", ()=>{
    if(money >=30){
      money -=30;
      updateUI();
      btn.style.display="none";

      let wall = document.createElement("div");
      wall.classList.add("wall");
      wall.style.top = top + "px";
      wall.style.left = left + "px";
      wall.style.width = width + "px";
      wall.style.height = height + "px";
      document.getElementById("game").appendChild(wall);
      player.jsWalls.push(wall); // add to collision detection
    }
  });
}

// Example walls
createWallButton("wall-top", 50, 50, 600, 10);
createWallButton("wall-bottom", 440, 50, 600, 10);
createWallButton("wall-left", 50, 50, 10, 400);
createWallButton("wall-right-top", 50, 640, 10, 150);
createWallButton("wall-right-bottom", 300, 640, 10, 150);

// Initialize UI
updateUI();
