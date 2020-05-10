function task6()
{
    document.title = "6. Kill Corona";

    setTimeout(function(){    
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);
    },1);
    
    setTimeout(function(){
        alert(" К сожалению некоторые из пассажиров самолета были заражены коронавирусом. Поэтому наш химик решил обработать каждый "  +
              "чемодан антисептиком. За один ход можно обработать один чемодан, и это полностью уничтожит все вирусы конкретно в нем. " +
              "Но вот незадача - вирусы не желают сидеть на месте. И после каждого хода все выжившие вирусы перемещаются из своего " +
              "чемодана в соседний. Если у чемодана два доступных соседа - значит вирусы размножаются, чтобы занять оба чемодана. Очистите " +
              "все чемоданы до того, как популяция вирусов наберет критическую массу и уничтожит все живое!");
        startGame6();
    },200);  
}

function startGame6()
{
    gameOver = 0;
    count6 = 5;
    
    virus = [1, 1, 1, 1, 1];

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = 'black';
    
    drawField6();
    drawVirus();
    drawCount6(150);
}

function clear6()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = 'black';
    
    for (var i = 0; i < 5; i++) {
        cases5[i].style.display = 'none';
    }    
}

function drawField6()
{
    for (var i = 0; i < 5; i++) {
        ctx.drawImage(cases5[i], case5W*(2*i+1), top5c, case5W, case5H);
        cases5[i].style.opacity = '0';
    }
}

async function selectCase6(iter)
{
    if (gameOver) return;
    
    ctx.drawImage(anti, case5W*(2*(iter-1)+1) + 50, top5c + 50, case5W/2, case5H/2);
    audio6.play();
    await sleep(500);
    ctx.clearRect(case5W*(2*(iter-1)+1), top5c, case5W, case5H);
    ctx.drawImage(cases5[iter-1], case5W*(2*(iter-1)+1), top5c, case5W, case5H);
    await sleep(300);
    
    virus[iter-1] = 0;
    enemyTurn();
    
    var sum = 0;
    for (var i = 0; i < 5; i++) sum += virus[i];
    
    count6 = sum;    
    if (count6 == 0) drawWin();
    else if (count6 >= 20) drawDefeat();
    
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    drawField6();
    drawVirus();
    drawCount6(50);    
}

function enemyTurn()
{
    var deltaVirus = [0, 0, 0, 0, 0];
    
    for (var i = 0; i < 5; i++) {
        if (virus[i] == 0) continue;
        
        deltaVirus[i] -= virus[i];
        
        if (i > 0) deltaVirus[i-1] += virus[i];
        if (i < 4) deltaVirus[i+1] += virus[i];
    }
    
    for (var i = 0; i < 5; i++) virus[i] += deltaVirus[i];
}

function drawVirus()
{
    var s = case5W*0.9;
    var left6 = (case5W - s)/2;
    var top6 = left6;
    
    var virV = 5;
    var virH = 5;
    var virWidth = s/virV;
    var virHeight = s/virH;
    
    
    for (var j = 0; j < 5; j++) {
        var available_positions = [];
        for (var i = 0; i < virV*virH; i++) available_positions[i] = i;
        
        for (var i = 0; i < virus[j]; i++) {
            if (randInt(2)) pic = viruspic1;
            else pic = viruspic2;
            
            var newpos = randInt(virV*virH-i);
            var new_i = ~~(available_positions[newpos]/virV);
            var new_j = available_positions[newpos]%virV;
                    
            var newX = left6 + case5W*(2*j+1) + new_i*virWidth;
            var newY = top6 + top5c + new_j*virHeight;
            available_positions.splice(newpos, 1);
            
            ctx.drawImage(pic, newX, newY, virWidth, virHeight);    
        }
    }
}

function drawCount6(fsize) {
    //ctx.clearRect(0, top5k, cnv.width, cnv.height);
    ctx.font = fsize + 'px serif';
    ctx.fillText(count6, cnv.width/2, top5k + key5H);
}

async function drawWin()
{
    gameOver = 1;
    ctx.fillStyle = 'green';
    drawCount6(100);
    
    await sleep(1500);
    clear6();
    
    task++;
    main();
 
}

async function drawDefeat()
{
    gameOver = 1;
    ctx.fillStyle = 'red';
    drawCount6(100);
    
    await sleep(1500); 
    startGame6();
}






