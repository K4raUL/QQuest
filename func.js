function main()
{
    switch(task) {
        case 0:
            alert("Press START button to begin");
            break;
        case 1:
            task1();
            break;
        case 2:
            task2();
            break;
        case 3:
            task3();
            break;
        case 4:
            setTimeout (function(){ task4(); },10);
            break;
        case 5:
            task5();
            break;
        case 6:
            task6();
            break;
        case 7:
            task7();
            break;
        case 8:
            task8();
            break;
        case 9:
            task9();
            break;
        case 10:
            task10();
            break;
        default:
            break;        
    }
}

async function startgame() 
{
    var btnst = document.getElementById("startbtn").style;
    btnst.display = "none";
        
    await sleep(400);
    
    task++;
    main();
}

document.addEventListener('mousemove', (event) => {
    //const keyName = event.button;
    const mx = event.clientX;
    const my = event.clientY;
    
    if (task != 3) return;
    if (!isSelected) return;

    task3events(mx, my);
});

document.addEventListener('click', (event) => {
    const keyName = event.button;
    const mx = event.clientX;
    const my = event.clientY;
    
    if (task != 8) return;
    
    selectSection8(mx, my);
});

document.addEventListener('keydown', (event) => {
    const keyName = event.code;

    switch (task) {
        case 9:
            task9events(keyName);
            break;
        default:
            break;
    }
});

function task3events(x, y)
{
    var curImg = pimg[isSelected-1];
    curImg.style.left = (x - curImg.width/2) + 'px';
    curImg.style.top  = (y - curImg.height/2) + 'px';
}

function task9events(keyName)
{
    if (part2) return;
    
    if (!pvh) {
        pvh = 1;
        startTimer();
    }
    
    if (keyName == "KeyW" || keyName == "ArrowUp") {
        if (F[playerX][playerY] & (1<<3)) {
            playerY -= 1;
            drawMaze();
            drawPlayer(playerUP);
        }
    }
    else if (keyName == "KeyS" || keyName == "ArrowDown") {
        if (F[playerX][playerY] & (1<<1)) {
            playerY += 1;
            drawMaze();
            drawPlayer(playerDOWN);
        }      
    }
    else if (keyName == "KeyD" || keyName == "ArrowRight") {
        if (F[playerX][playerY] & (1<<0)) {
            playerX += 1;
            drawMaze();
            drawPlayer(playerRIGHT);
        }      
    }
    else if (keyName == "KeyA" || keyName == "ArrowLeft") {
        if (F[playerX][playerY] & (1<<2)) {
            playerX -= 1;
            drawMaze();
            drawPlayer(playerLEFT);
        }     
    }
    
    if (playerX == x0 && playerY == y0 && !keyON) alert("Эту дверь удерживает какой-то механизм");   
    if (playerX == 0 && playerY == y0+1 && part3 == 1) win99();
    if (playerX == x0 && playerY == y0+2 && part2 == 0 && part3 == 0) {
        part2 = 1;
        clearInterval(timer0);
        F[x0][y0] &= ~(1<<1);
        F[x0][y0+1] &= ~(1<<3);  
        
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        
        ctx.translate(cnv.width/2, cnv.height/2);
        ctx.rotate(-rotangle*Math.PI/180);
        ctx.translate(-cnv.width/2, -cnv.height/2);
        
        drawMaze();
        drawPlayer(playerUP);
        
        var answer9 = "";
        setTimeout(function(){
            while (answer9 != "Bruno" && answer9 != "Бруно") {  
                answer9 = prompt("Самый успешный из твоих предшественников погиб на этом месте.\n" +
                                 "Он был ученым, как и ты. Скажи как его звали, или ты сгоришь как и он!");
            }
            win9();
        },1500); 
    }    
}

function randInt(max)
{
    return Math.floor(Math.random() * max); 
}

function dist(x1, y1, x2, y2)
{
    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRotationAngle(obj)
{
    var st = window.getComputedStyle(obj, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "FAIL";

    // With rotate(30deg)...
    // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)

    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];

    return Math.round(Math.atan2(b, a) * (180/Math.PI));
}