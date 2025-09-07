let money = 10;
let soldiers = 0;

// Update stats display
function updateUI() {
    document.getElementById("money").textContent = money;
    document.getElementById("soldiers").textContent = soldiers;
}

// Soldier buttons
function createSoldierButton(top, left) {
    let btn = document.createElement("div");
    btn.classList.add("button");
    btn.style.top = top + "px";
    btn.style.left = left + "px";
    btn.textContent = "$10";
    document.getElementById("game").appendChild(btn);

    btn.addEventListener("click", () => {
        if(money >= 10){
            money -= 10;
            soldiers++;
            updateUI();
            btn.style.display = "none";

            // Create soldier
            let soldier = document.createElement("div");
            soldier.classList.add("soldier");
            soldier.style.top = (top + 40) + "px";
            soldier.style.left = (left + 20) + "px";
            document.getElementById("game").appendChild(soldier);

            // Create unique red target for this soldier
            let target = document.createElement("div");
            target.classList.add("target");
            target.style.top = soldier.style.top;
            target.style.left = "50px";
            document.getElementById("game").appendChild(target);

            // Passive income bullets aimed at this target
            setInterval(() => {
                money += 1;
                updateUI();

                let bullet = document.createElement("div");
                bullet.classList.add("bullet");
                bullet.style.top = parseInt(soldier.style.top) + 7 + "px";
                bullet.style.left = parseInt(soldier.style.left) - 5 + "px";
                document.getElementById("game").appendChild(bullet);

                let bulletX = parseInt(bullet.style.left);
                let targetLeft = parseInt(target.style.left);

                let moveBullet = setInterval(() => {
                    bulletX -= 5;
                    bullet.style.left = bulletX + "px";
                    if(bulletX < targetLeft){
                        bullet.remove();
                        clearInterval(moveBullet);
                    }
                }, 20);
            }, 1000);
        }
    });
}

// Create 3 soldier buttons
createSoldierButton(80, 100);
createSoldierButton(80, 200);
createSoldierButton(80, 300);

// Wall buttons
function createWallButton(top, left, width, height) {
    let btn = document.createElement("div");
    btn.classList.add("wall-button");
    btn.style.top = top + "px";
    btn.style.left = left + "px";
    btn.textContent = "$30";
    document.getElementById("game").appendChild(btn);

    btn.addEventListener("click", () => {
        if(money >= 30){
            money -= 30;
            updateUI();
            btn.style.display = "none";

            let wall = document.createElement("div");
            wall.classList.add("wall");
            wall.style.top = top + "px";
            wall.style.left = left + "px";
            wall.style.width = width + "px";
            wall.style.height = height + "px";
            document.getElementById("game").appendChild(wall);

            // Add wall to global collision array
            window.walls.push(wall);
        }
    });
}

// Create walls with one exit on right wall middle
createWallButton(50, 50, 600, 10);     // top wall
createWallButton(440, 50, 600, 10);    // bottom wall
createWallButton(50, 50, 10, 400);     // left wall
createWallButton(50, 640, 10, 150);    // right wall top
createWallButton(300, 640, 10, 150);   // right wall bottom (middle exit)

// Initialize stats
updateUI();
