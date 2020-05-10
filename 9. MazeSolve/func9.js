function task9()
{
    document.title = "9. Maze Solve";

    setTimeout(function(){    
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);
    },1);
    
    setTimeout(function(){
        alert("Теперь вход свободен. Остался последний шаг - добраться до конца Лабиринта, чтобы завладеть сокровищами.\n" +
              "Но помните, в темноте наш герой постепенно сходит с ума...");
        init9();
    },200);  
}

function init9()
{
    clear9();
    initquest();
    
    //setStart();
    rec_gen(x0, y0);
    
    calcTransform();
    drawMaze();

    drawPlayer(playerUP);
}

function clear9()
{
    F = [[]];
    for (var i = 0; i < M; i++) {
        F[i] = [];
        for (var j = 0; j < N; j++) {
            F[i][j] = 0;
        }
    }
    
    // ---------------------------- GAME PARAMETERS ----------------------------
    x0 = 1;         // for
    y0 = 2;         // quest
    
    playerX = 0;
    playerY = N-1;
    
    var keyx = 9;
    var keyy = randInt(4)*2 + 3;
    key = [keyx, keyy];
    keyON = false;
    
    pvh = 0;
    time0 = 60;
    clearInterval(timer0);
    part2 = 0;
    part3 = 0;
    rotangle = 0;
    // -------------------------------------------------------------------------    
}

function setStart()
{
    x0 = randInt(M);
    y0 = randInt(N);
}

function rec_gen(x, y)
{
    var res = adj_cells(x, y);
    if (res == 0) return;   
    
    var ncopy = nc;
    var dcopy = dir;   

    while (ncopy.length > 0) {
        var newindex = randInt(ncopy.length);
        
        var newx = ncopy[newindex][0];
        var newy = ncopy[newindex][1];
        var D = dcopy[newindex]; 
        
        ncopy.splice(newindex, 1);
        dcopy.splice(newindex, 1);
        
        if (F[newx][newy] != 0) continue;
        
        var invD = (D+2)%4;
        F[newx][newy] |= (1<<invD); 
        F[x][y] |= (1<<D);
        
        rec_gen(newx, newy);
    }    
}

// all available neighbours
function adj_cells(i, j)
{
    nc = [];
    dir = [];
        
    if (i + 1 < M) {
        nc.push([i+1, j]);
        dir.push(0);
    }
    if (j + 1 < N) {
        nc.push([i, j+1]);
        dir.push(1);
    }
    if (i - 1 >= 0) {
        nc.push([i-1, j]);
        dir.push(2);
    }
    if (j - 1 >= 0) {
        nc.push([i, j-1]);
        dir.push(3);
    }
        
    return nc.length;
}

function drawMaze() 
{
    if (part2 || part3) {
        for (var i = 0 ; i < M; i++) {
            for (var j = 0; j < N; j++) {
                drawCell(i, j);
            }
        }
        if (part2) {
            ctx.drawImage(firepic, left9 + cell9W*x0 + cell9W/2 - cell9H/2, top9 + cell9H*(y0+1), cell9H, cell9H);
            ctx.drawImage(firepic, left9 + cell9W*x0 + cell9W/2 - cell9H/2, top9 + cell9H*(y0+2), cell9H, cell9H);
        }
        if (part3) ctx.drawImage(winpic, left9 + cell9W*0.1, top9 + cell9H*(y0+1) + cell9H*0.1, cell9W*0.8, cell9H*0.8);
        return;
    }

    ctx.fillStyle = "lightgrey";
    ctx.fillRect(left9 - 8, top9 - 8, cell9W*M + 16, cell9H*N + 16);
      
    if (playerX == key[0] && playerY == key[1]) {
        keyON = true;
        F[x0][y0] |= (1<<1);
        F[x0][y0+1] |= (1<<3);
    }
    drawCell(playerX, playerY);
    
    if ( playerX+1 < M  && (F[playerX][playerY] & (1<<0)) ) drawCell(playerX+1, playerY);
    if ( playerY+1 < N  && (F[playerX][playerY] & (1<<1)) ) drawCell(playerX, playerY+1);
    if ( playerX-1 >= 0 && (F[playerX][playerY] & (1<<2)) ) drawCell(playerX-1, playerY);
    if ( playerY-1 >= 0 && (F[playerX][playerY] & (1<<3)) ) drawCell(playerX, playerY-1);
}

function drawCell(i, j)
{
    ctx.clearRect(left9 + i*cell9W, top9 + j*cell9H, cell9W, cell9H);
    ctx.lineWidth = 16;
    
    if (i == key[0] && j == key[1]) drawKey();
    if (i == x0 && j == y0+1 && part3 == 0) {
        ctx.fillStyle = 'Indianred';
        ctx.fillRect(left9 + cell9W*i+2, top9 + cell9H*j+2, cell9W-4, cell9H-4);
    }
    
    if (!(F[i][j] & (1<<0))) {     // right
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        
        ctx.moveTo(left9 + cell9W*(i+1), top9 + cell9H*j);
        ctx.lineTo(left9 + cell9W*(i+1), top9 + cell9H*(j+1)); 

        ctx.stroke();                
    }
    
    if (!(F[i][j] & (1<<1))) {     // down
        ctx.beginPath();
        
        if (i == x0 && j == y0) ctx.strokeStyle = '#ff0000';
        else ctx.strokeStyle = '#000000'; 
     
        ctx.moveTo(left9 + cell9W*i, top9 + cell9H*(j+1));
        ctx.lineTo(left9 + cell9W*(i+1), top9 + cell9H*(j+1)); 

        ctx.stroke();
    }
    if (!(F[i][j] & (1<<2))) {     // left
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        
        ctx.moveTo(left9 + cell9W*i, top9 + cell9H*j);
        ctx.lineTo(left9 + cell9W*i, top9 + cell9H*(j+1));

        ctx.stroke();                                
    }
    if (!(F[i][j] & (1<<3))) {     // up
        ctx.beginPath();
        ctx.strokeStyle = '#000000'; 
        
        ctx.moveTo(left9 + cell9W*i, top9 + cell9H*j);
        ctx.lineTo(left9 + cell9W*(i+1), top9 + cell9H*j);   

        ctx.stroke();                
    }    
}

function calcTransform()
{
    var w = cnv.width;
    var h = cnv.height;
    var part = 0.92;
    
    cell9H = 1;
    cell9W = cell9H;
    
    if (w/h > M*cell9W/N/cell9H) {
        cell9H = part*h/N;
        cell9W = cell9H;
    }
    else {
        cell9W = part*w/M;
        cell9H = cell9W;
    }
    
    top9 = 0.5*(h - cell9H*N);
    left9 = 0.5*(w - cell9W*M);
}

function drawKey()
{
    ctx.beginPath();
    
    ctx.arc(left9 + cell9W*key[0] + cell9W/2., top9 + cell9H*key[1] + cell9H/2., cell9H/3., 0, 2 * Math.PI);
    
    if (keyON) ctx.fillStyle = "green";
    else ctx.fillStyle = "red";
    
    ctx.fill();
    ctx.stroke();
}

function drawPlayer(picon)
{
    ctx.drawImage(picon, left9 + cell9W*playerX + cell9W/2. - cell9H/2., top9 + cell9H*playerY, cell9H, cell9H);
}

function drawTimer(sec)
{
    var ctxcpy = ctx;
    
    ctxcpy.clearRect(left9 + sec*cell9W*M/60, 3, cell9W*M/60, 40);
    //ctxcpy.fillStyle = "green";
    //ctxcpy.fillRect(left9, 3, cell9W*M*sec/100, 40);

    if (keyON && (sec%4 == 0)) {

        var newangle = (2*randInt(2) - 1)*90*(randInt(2)+1);
        rotangle += newangle;
        
        var rotcount = 0;
        
        var timer1 = setInterval (function() {
            ctxcpy.clearRect(0, 0, cnv.width, cnv.height);
            
            ctxcpy.translate(cnv.width/2, cnv.height/2);
            ctxcpy.rotate(newangle/15*Math.PI/180);
            ctxcpy.translate(-cnv.width/2, -cnv.height/2);
            
            drawMaze();
            drawPlayer(playerUP);

            //ctxcpy.clearRect(left9 + time0*cell9W*M/60, 3, cell9W*M/60, 40);
            ctxcpy.fillStyle = "green";
            ctxcpy.fillRect(left9, 3, cell9W*M*sec/60, 40);
            
            rotcount++;
            if (rotcount == 15) clearInterval(timer1);
        }, 20);
        //setTimeout(function() {clearInterval(timer1);}, 600);
    }
}

function startTimer()
{
    ctx.fillStyle = "green";
    ctx.fillRect(left9, 3, cell9W*M, 40);
    
    timer0 = setInterval(function(){ 
        time0 -= 1; 
        if(time0 == 0) init9();
        drawTimer(time0); 
    }, 1000);
}  

async function win9()
{
    
    ctx.clearRect(left9 + cell9W*x0 + 8, top9 + cell9H*(y0+1) + 8, cell9W-16, 2*cell9H-16);
    drawPlayer(playerDOWN);
    
    await sleep(1000);
    
    F[x0][y0+2] |= (1<<2);
    F[x0-1][y0+2] |= (1<<0);
    ctx.clearRect(left9 + cell9W*x0 - 8, top9 + cell9H*(y0+2) + 8, 16, cell9H-16);
    
    part2 = 0;
    part3 = 1;
}  

async function win99()
{
    ctx.font = '100px serif';
    ctx.fillStyle = 'green';
    
    await sleep (500);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    await sleep (500);
    ctx.fillText("WIN", cnv.width/2, cnv.height/2);   
    
    await sleep (500);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    await sleep (500);
    ctx.fillText("WIN", cnv.width/2, cnv.height/2);  
    
    await sleep (500);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    await sleep (500);
    ctx.fillText("WIN", cnv.width/2, cnv.height/2);  

    await sleep (1200);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    await sleep (800);
    ctx.fillStyle = 'red';
    ctx.fillText("WIN?", cnv.width/2, cnv.height/2);    

    await sleep (1200);    
    task++;
    main();
}

function initquest()
{
    F[0][3] = 2;
    F[0][4] = 8;
    F[1][3] = 2;
    F[1][4] = 8;
    
    F[1][0] = 9;
    F[2][0] = 13;
    F[3][0] = 13;
    F[4][0] = 13;
    F[5][0] = 12;
    
    F[8][0] = 11;
    F[8][1] = 11;
    F[8][2] = 9;
    F[9][0] = 15;
    F[9][1] = 15;
    F[9][2] = 13;
    
    F[8][4] = 1;
    F[9][4] = 5;
    F[8][6] = 1;
    F[9][6] = 5;
    F[8][8] = 1;
    F[9][8] = 5;
    F[8][10] = 3;
    F[9][10] = 7;    
}




















