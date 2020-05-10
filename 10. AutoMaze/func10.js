function task10()
{
    document.title = "10. Auto Maze";

    setTimeout(function(){    
        ctx.clearRect(0, 0, cnv.width, cnv.height);
    },1);
    
    setTimeout(function(){
        alert("Боюсь, это еще не конец. Но если вы справились с одним лабиринтом, справитесь и с другим. Только теперь под " +
        "вашим управлением робот с ограниченным списком команд. Нужно просто задать ему необходимую последовательность действий " +
        "и выбраться наконец из этого лабиринта!\nНичего сложного, не так ли?");
        init10();
    },200);  
}

function init10()
{
    cnv.width = 0.7*window.innerWidth;
    cnv.style.width = cnv.width + 'px';
    cnv.height = 0.95*window.innerHeight;
        
    var codiv = document.getElementById("codiv");
    codiv.style.display = "inline-block";
    
    codearea = document.getElementById("code1");
    codearea.focus();
    
    runbtn  = document.getElementById("rbtn");
    stopbtn = document.getElementById("sbtn");
    x2btn   = document.getElementById("btn2");
    x10btn  = document.getElementById("btn10");
    
    M = 50;
    N = 50;
    
    startGame10();
}

function startGame10()
{
    clear10();
    transform10();
    
    setStart();
    rec_gen(x0, y0);
    F[M-1][N-1] |= 1;       // exit
    
    drawMaze10();
    drawPlayer10();
}

function clear10()
{
    F = [[]];
    for (var i = 0; i < M; i++) {
        F[i] = [];
        for (var j = 0; j < N; j++) {
            F[i][j] = 0;
        }
    }
    
    pX = 0;
    pY = 0;
    prevX = 0;
    prevY = 0;
    timeK = 1;
    stop = 0;
    orient = 0;
}

function drawPlayer10()
{
    ctx.clearRect(left9 + prevX*cell9W + 2, top9 + prevY*cell9H + 2, cell9W - 4, cell9H - 4);
    
    prevX = pX;
    prevY = pY;
    
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    
    ctx.translate(left9 + prevX*cell9W + cell9W/2, top9 + prevY*cell9H + cell9H/2)
    ctx.rotate(orient*Math.PI/180);
    
    ctx.beginPath();
    
    ctx.moveTo(-cell9W/2 + 3, -cell9H/2 + 3);
    ctx.lineTo(-cell9W/2 + 3, cell9H/2 - 3);
    ctx.lineTo(cell9W/2 - 3, 0);
    ctx.lineTo(-cell9W/2 + 3, -cell9H/2 + 3);
        
    ctx.fill();
    ctx.stroke();
    
    ctx.rotate(-orient*Math.PI/180);
    ctx.translate(-left9 - prevX*cell9W - cell9W/2, -top9 - prevY*cell9H - cell9H/2)
}

async function run10()
{
    var command = codearea.value.split(/[\r\n]+/);
    stop = 0;
    
    setTimeout(function(){ toggleBtn(); }, 0);
    
    while ( (pX != M-1 || pY != N-1) && stop == 0) {
        var block10 = 0;
        for (var i = 0; i < command.length; i++) {
            var cline = command[i].trim();
            
            if (cline.length == 0) continue;
            if (cline == '}') {
                block10 = 0;
                continue;
            }
            if (block10 == 1) continue;
            
            if (cline.indexOf('GO') == 0) {
                if (orient == 0)        {if (F[pX][pY] & (1<<0)) pX += 1;}
                else if (orient == 90)  {if (F[pX][pY] & (1<<1)) pY += 1;}
                else if (orient == 180) {if (F[pX][pY] & (1<<2)) pX -= 1;}
                else if (orient == 270) {if (F[pX][pY] & (1<<3)) pY -= 1;}
                
                setTimeout(function(){ drawPlayer10(); }, 0);
                await sleep(200/timeK);
                continue;
            }
            else if (cline.indexOf('TURN') == 0) {
                var mult = parseInt(cline.substr(5, 2), 10);
                orient += (mult == 1) ? 90 : 270;
                orient %= 360;
                
                setTimeout(function(){ drawPlayer10(); }, 0);
                await sleep(20/timeK);
                continue;                
            }
            else if (cline.indexOf('CONTINUE') == 0) break;
            else if (cline.indexOf('IF') == 0) {
                if (cline.indexOf('CANMOVE') != 3) {
                    alert("Invalid input (wrong IF syntax) at string " + i);
                    stop10();
                    return;
                }
                
                canmove = F[pX][pY] & (1<<(orient/90)) ? 1 : 0;
                var index = cline.indexOf('=') + 1;
                var match = cline.substr(index).trim();
                var tnum = parseInt(match, 10);

                //alert(canmove + ' ' + tnum + '\n' + F[pX][pY] + ' ' + (1<<(orient/90)) + ' ' + ( F[pX][pY] & (1<<(orient/90))) );
                if (canmove != tnum) block10 = 1;
            }
            else {
                alert("Invalid input. Error in string " + i);
                stop10();
                return;
            }
        }
    }
    if (pX == M-1 && pY == N-1) win10();
}

async function stop10()
{
    stop = 1;
    pX = 0;
    pY = 0;
    timeK = 1;
    orient = 0;
    
    await sleep(400);
    
    drawPlayer10();
    toggleBtn();
}

function x2speed()
{
    timeK = 2;
}

function x10speed()
{
    timeK = 20;
}

function toggleBtn()
{
    runbtn.disabled  ^= 1;
    stopbtn.disabled ^= 1;
    x2btn.disabled   ^= 1;
    x10btn.disabled  ^= 1;   
}

function drawMaze10()
{
    for (var i = 0 ; i < M; i++) {
        for (var j = i%2; j < N; j+=2) {
            drawCell10(i, j);
        }
    }
    
    drawBorder10();
}

function drawCell10(i, j)
{
    ctx.clearRect(left9 + i*cell9W, top9 + j*cell9H, cell9W, cell9H);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
        
    if (!(F[i][j] & (1<<0))) {     // right
        ctx.moveTo(left9 + cell9W*(i+1), top9 + cell9H*j);
        ctx.lineTo(left9 + cell9W*(i+1), top9 + cell9H*(j+1)); 
    }
    if (!(F[i][j] & (1<<1))) {     // down
        ctx.moveTo(left9 + cell9W*i, top9 + cell9H*(j+1));
        ctx.lineTo(left9 + cell9W*(i+1), top9 + cell9H*(j+1)); 
    }
    if (!(F[i][j] & (1<<2))) {     // left
        ctx.moveTo(left9 + cell9W*i, top9 + cell9H*j);
        ctx.lineTo(left9 + cell9W*i, top9 + cell9H*(j+1));
    }
    if (!(F[i][j] & (1<<3))) {     // up
        ctx.moveTo(left9 + cell9W*i, top9 + cell9H*j);
        ctx.lineTo(left9 + cell9W*(i+1), top9 + cell9H*j);   
    }
    ctx.stroke();  
}    

function drawBorder10()
{
    ctx.beginPath();
    ctx.lineWidth = 5;
    
    ctx.moveTo(left9, top9);
    ctx.lineTo(left9, top9 + cell9H*N);
    ctx.lineTo(left9 + cell9W*M, top9 + cell9H*N);
    ctx.moveTo(left9 + cell9W*M, top9 + cell9H*(N-1));
    ctx.lineTo(left9 + cell9W*M, top9);
    ctx.lineTo(left9, top9);
    
    ctx.stroke();
}

function transform10()
{
    var canvdiv = document.getElementsByClassName("draw");
    var divrect = canvdiv[0].getBoundingClientRect();
    var cnvrect = cnv.getBoundingClientRect();
    
    cleft3 = cnvrect.left + divrect.left - 1;
    ctop3  = cnvrect.top - 1;
    
    var w = cnv.width;
    var h = cnv.height;
    
    size10 = Math.floor(0.95*h);
    
    left9 = 0.5*(w - size10);
    top9 = 0.05*h;
    
    cell9W = Math.floor(size10/M);
    cell9H = Math.floor(size10/N);
    
}

async function win10()
{
    await sleep(2000);
    clear10();
    
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    cnv.width = 0.95*window.innerWidth;
    cnv.style.width = cnv.width + 'px';
    cnv.height = 0.95*window.innerHeight;
    codiv.style.display = "none";
    
    ctx.drawImage(endpic, 0.5*(cnv.width - endpic.width), 0.5*(cnv.height - endpic.height), endpic.width, endpic.height);
}
