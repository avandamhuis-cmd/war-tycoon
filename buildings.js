let money = 10;
let soldiers = 0;
const soldierSpacing = 30; // vertical spacing for multiple soldiers per button

// Update stats display
function updateUI() {
    document.getElementById("money").textContent = money;
    document.getElementById("soldiers").textContent = soldiers;
}

// Track number of soldiers bought per button to position vertically
const soldierCounters = [0, 0, 0];

function createSoldierButton(top, left, buttonIndex) {
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

            // Determine vertical position
            const offset = soldierCounters[buttonIndex] * soldierSpacing;
            soldierCounters[buttonIndex]++;

            // Create soldier
            let soldier = document.createElement("div");
            soldier.classList.add("soldier");
            soldier.style.top = (top + 40 + offset) + "px";
            soldier.style.left = (left + 20) + "px";
            document.getElementById("game").appendChild(soldier);

            // Create red target for this soldier, aligned with soldier vertically
            let target = document.createElement("div");
            target.classList.add("target");
            target.style.top = parseInt(soldier.style.top) + 5 + "px"; // center target
            target.style.left = "50px";
            document.getElementById("game").appendChild(target);

            // Passive income bullets aimed at this target
            setInterval(() => {
                money += 1;
                updateUI();

                let bullet = document.createElement("div");
                bullet.classList.add("bullet");
                bullet.style.top = parseInt(soldier.style.top) + 10 + "px"; // fire from soldier center
                bullet.style.left = parseInt(soldier.style.left) - 5 + "px";
                document.getElementById("game").appendChild(bullet);

                let bulletX = parseInt(bullet.style.left);
                let targetLeft = parseInt(target.style.left);
                let targetTop = parseInt(target.style.top) + 7; // aim center of target

                let moveBullet = setInterval(() => {
                    bulletX -= 5;
                    bullet.style.left = bulletX + "px";
                    bullet.style.top = targetTop + "px"; // keep bullet aligned vertically
                    if(bulletX < targetLeft){
                        bullet.remove();
                        clearInterval(moveBullet);
                    }
                }, 20);
            }, 1000);
        }
    });
}

// Create 3 soldier buttons with indices
createSoldierButton(80, 100, 0);
createSoldierButton(80, 200, 1);
createSoldierButton(80, 300, 2);

// Wall buttons remain the same
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

            window.walls.push(wall);
        }
    });
}

// Walls with one exit
createWallButton(50, 50, 600, 10);     // top
createWallButton(440, 50, 600, 10);    // bottom
createWallButton(50, 50, 10, 400);     // left
createWallButton(50, 640, 10, 150);    // right top
createWallButton(300, 640, 10, 150);   // right bottom

updateUI();
