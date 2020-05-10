function task8()
{
    document.title = "8. Maze Extinguish";

    setTimeout(function(){    
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);
    },1);
    
    setTimeout(function(){
        alert("'Чтож, вот мы и добрались до входа, дальше я не пойду'.\nГлавный герой стоял перед входом в Лабиринт и смотрел на панель управления комнатами. "  +
              "Они были охвачены огнем. К счастью, в потолках некоторых комнат есть нажимные пластины, запускающие автоматические " +
              "огнетушители. Активируйте нужные в правильном порядке.\nЦель: погасить огонь!");
        startGame8();
    },200);  
}

function startGame8()
{
    var canvdiv = document.getElementsByClassName("draw");
    var divrect = canvdiv[0].getBoundingClientRect();
    var cnvrect = cnv.getBoundingClientRect();
    
    cleft3 = cnvrect.left + divrect.left - 1;
    ctop3  = cnvrect.top - 1;
    
    transform8();
    solution8 = 0;
    drawField8();
}

function drawField8()
{
    for (var i = 0; i < tableW; i++) {
        for (var j = 0; j < tableH; j++) {
            var cellLeft = left8 + i*cell8W - i*6.5*cell8W/126;
            var cellTop = top8 + j*cell8H - j*6*cell8H/80;            
            
            if (field8[i][j] >= 0) ctx.drawImage(secpic, cellLeft, cellTop, cell8W, cell8H);
            if (field8[i][j] > 0) {
                for (var k = 0; k < field8[i][j]; k++) {
                    var fireW = cell8W / 4;      
                    var fireH = fireW*80/52;
                    var cellMid = cellLeft + cell8W/2;
                    ctx.drawImage(firepic8, cellMid - field8[i][j]*fireW/2 + k*fireW, cellTop + 0.5*(cell8H - fireH), fireW, fireH);
                }
            }
        }
    }
}

async function selectSection8(mx, my)
{
    var secx = ~~((mx /*- cleft3*/ - left8)/cell8W);
    var secy = ~~((my /*- ctop3*/- top8)/cell8H);
    
    if (field8[secx][secy] < 0) return;
    
    ctx.drawImage(selsecpic, left8 + secx*cell8W - secx*6.5*cell8W/126, top8 + secy*cell8H - secy*6*cell8H/80, cell8W, cell8H);
    
    await sleep(300);
    ctx.drawImage(secpic, left8 + secx*cell8W - secx*6.5*cell8W/126, top8 + secy*cell8H - secy*6*cell8H/80, cell8W, cell8H);
        
    checkSeq8(secx, secy);

}

function checkSeq8(x, y)
{
    if (solarr[solution8][0] == x && solarr[solution8][1] == y) solution8++;
    else solution8 = 0;
    
    if (solution8 == 8) {
        clear8();
    
        setTimeout(function(){
            ctx.clearRect(0, 0, cnv.width, cnv.height);
            task++;
            main();
        },1500);  
    }
}

function clear8()
{
    solution8 = 0;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (var i = 0; i < tableW; i++) {
        for (var j = 0; j < tableH; j++) {
            var cellLeft = left8 + i*cell8W - i*6.5*cell8W/126;
            var cellTop = top8 + j*cell8H - j*6*cell8H/80;            
            
            if (field8[i][j] >= 0) ctx.drawImage(secpic, cellLeft, cellTop, cell8W, cell8H);
        }
    }    
}

function transform8()
{
    h8 = cnv.height*0.9;
    w8 = h8*113*tableW/68/tableH;
    
    left8 = 0.5*(cnv.width - w8);
    top8  = 0.5*(cnv.height - h8);
    
    cell8W = w8/tableW;
    cell8H = h8/tableH;
}
