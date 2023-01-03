let app = new PIXI.Application({ width: 1480, height: 720, backgroundAlpha: 0 });
document.querySelector(".game-container").appendChild(app.view);

if (!localStorage.getItem("hs")) localStorage.setItem("hs", "0");
else document.querySelector("#highScore").innerHTML = "High score: " + localStorage.getItem("hs");

let gameState = {
    score: 0,
    enemies: [],
    enemy: { speed: 0.4 },
    player: { x: 690, y: 330 },
}

const createEnemy = () => {
    if (gameState.enemies.length <= 7) {
        let enemy = PIXI.Sprite.from("enemy.png");
        enemy.width = 220;
        enemy.height = 132;

        app.stage.addChild(enemy);
        let refId = gameState.enemies.push(enemy);

        enemy.y = Math.floor(Math.random() * 650);

        return refId - 1;
    }
}

const createTargeter = () => {
    let targeter = new PIXI.Graphics();
    targeter.lineStyle(2, 0x74A57F);
    targeter.drawRect(gameState.player.x, gameState.player.y, 100, 60);
    
    app.stage.addChild(targeter);

    targeter.moveTo(gameState.player.x, gameState.player.y).lineTo(0, 0);
    targeter.moveTo(gameState.player.x + 100, gameState.player.y).lineTo(1480, 0);
    targeter.moveTo(gameState.player.x, gameState.player.y + 60).lineTo(0, 720);
    targeter.moveTo(gameState.player.x + 100, gameState.player.y + 60).lineTo(1480, 720);

    return targeter;
}

createEnemy();
let targeter = createTargeter();

// Main game loop
app.ticker.add((delta) => {
    for (let i = 0; i < gameState.enemies.length; i++) {
        let currEnemy = gameState.enemies[i]
        currEnemy.x += delta * gameState.enemy.speed;
        
        if (currEnemy.x > 1480) {
            document.querySelector("#score").textContent = "You lose. Final score: " + gameState.score;
            document.querySelector("#playAgainButton").style.visibility = "visible";

            if (gameState.score > +localStorage.getItem("hs")) localStorage.setItem("hs", gameState.score);
            
            app.ticker.stop();
        }
    }
});

setInterval(createEnemy, 12000);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        gameState.player.y = gameState.player.y - 40 > 0 ? gameState.player.y - 40 : 0;
    } else if (event.key === "ArrowDown") {
        gameState.player.y = gameState.player.y + 60 < 720 ? gameState.player.y + 40 : 660;
    } else if (event.key === "ArrowLeft") {
        gameState.player.x = gameState.player.x - 40 > 0 ? gameState.player.x - 40 : 0;
    } else if (event.key === "ArrowRight") {
        gameState.player.x = gameState.player.x + 100 < 1480 ? gameState.player.x + 40 : 1380;
    } else if (event.key === " ") {
        let targetingArea = new PIXI.Rectangle(gameState.player.x, gameState.player.y, 100, 60);
        
        for (let i = 0; i < gameState.enemies.length; i++) {
            let currEnemy = gameState.enemies[i];

            if (targetingArea.contains(currEnemy.x + 110, currEnemy.y + 66)) {
                gameState.score++;
                document.querySelector("#score").textContent = `Score: ${gameState.score}`;

                gameState.enemy.speed += (Math.random() / 8);
                
                let explosion = PIXI.Sprite.from("explosion.png");
                explosion.width = 100;
                explosion.height = 60;
                explosion.x = currEnemy.x + 40;
                explosion.y = currEnemy.y + 30;
                app.stage.addChild(explosion);
                setTimeout(() => explosion.destroy(), 1500);

                currEnemy.destroy();
                gameState.enemies.splice(gameState.enemies.indexOf(currEnemy), 1);
                setTimeout(() => createEnemy(), 2000);
            }
        }
    }

    targeter.destroy();
    targeter = createTargeter();
});