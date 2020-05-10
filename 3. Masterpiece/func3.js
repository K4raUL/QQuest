function task3()
{
    document.title = "3. Masterpiece";
    
    setTimeout(function(){    
        alert("К сожалению по дороге самолет потерпел крушение, но наш герой чудом выжил. " +
        "Он очнулся ночью на твердой поверхности. Находясь в полном замешательстве, он решил " +
        "проверить свой телефон. Но сразу же увидел, что экран разбился.\nСоберите его обратно")
        
        startGame3();   
    },100);    
}

function startGame3()
{
    btn3 = document.getElementById("task3btn").style;
    btn3.display = "block";
    
    cnv.width = 0.95*window.innerWidth;
    cnv.height = 0.95*window.innerHeight;
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
    transform3();
    clear3();
    
    drawField3();
    drawPieces3();
}

function clear3()
{
    isSelected = 0;
    
    var canvdiv = document.getElementsByClassName("draw");
    var divrect = canvdiv[0].getBoundingClientRect();
    var cnvrect = cnv.getBoundingClientRect();
    
    cleft3 = cnvrect.left /*+ divrect.left*/ - 1;
    ctop3  = cnvrect.top + 1;
    
    pimg[0] = document.getElementById("pimg1");
    pimg[1] = document.getElementById("pimg2");
    pimg[2] = document.getElementById("pimg3");
    pimg[3] = document.getElementById("pimg4");
    pimg[4] = document.getElementById("pimg5");
    pimg[5] = document.getElementById("pimg6");
    pimg[6] = document.getElementById("pimg7");
    pimg[7] = document.getElementById("pimg8");
    pimg[8] = document.getElementById("pimg9");
    
    pcoord[0] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[1] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[2] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[3] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[4] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[5] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[6] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[7] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
    pcoord[8] = [randInt(cnv.width - size3*2/3), randInt(cnv.height - size3*2/3), randInt(4)*90];
}

function selectPiece3(e, num)
{
    if (e.button == 2 && isSelected) {
        //var angle3 = getRotationAngle(pimg[isSelected-1]);
        pcoord[isSelected-1][2] += 90;
        pcoord[isSelected-1][2] %= 360;
        pimg[isSelected-1].style.transform = 'rotate(' + pcoord[isSelected-1][2] + 'deg)';
    }
    else if (e.button == 0) {
        if (!isSelected) isSelected = num;
        else {
            var pp = isSelected-1;
            isSelected = 0;
            
            // center of figure (not left and top)
            var pleft = parseInt( pimg[pp].style.left, 10 ) + pimg[pp].width/2;
            var ptop  = parseInt( pimg[pp].style.top,  10 ) + pimg[pp].height/2;
            var minD3 = Math.sqrt(2) * size3/12;
            
            for (var i = 1; i < 6; i++) {
                for (var j = 1; j < 6; j++) {
                    var nodeX = cleft3 + left3 + i*size3/6 + i/2;
                    var nodeY = ctop3 + top3 + j*size3/6 - j/2;
                    
                    if (dist(nodeX, nodeY, pleft, ptop) <= minD3) {
                        pimg[pp].style.left = (nodeX - pimg[pp].width/2) + 'px';
                        pimg[pp].style.top  = (nodeY - pimg[pp].height/2) + 'px';
                        return;
                    }
                }
            }
        }
    }
}

function drawPieces3()
{
    for (var i = 0; i < 9; i++) {
        pimg[i].style.left = pcoord[i][0] + 'px';
        pimg[i].style.top  = pcoord[i][1] + 'px';
        
        pimg[i].width = Math.floor(size3/3);
        pimg[i].height = Math.floor(2*size3/3);
        
        pimg[i].style.transform = 'rotate(' + pcoord[i][2] + 'deg)';
        pimg[i].style.display = "block";
    }
}

function drawField3()
{
    ctx.drawImage(bcg3, left3, top3, size3, size3);
}

function transform3()
{
    var w = cnv.width;
    var h = cnv.height;
    
    size3 = 0.5*h;
    
    top3 = 0.5*(h - size3);
    left3 = 0.5*(w - size3);
}

function checkWin3()
{
    for (var i = 0; i < 9; i++) {
        var imgx = parseInt( pimg[i].style.left, 10 ) - cleft3;
        var imgy = parseInt( pimg[i].style.top, 10 ) - ctop3;
        
        ctx.translate(imgx + pimg[i].width/2, imgy + pimg[i].height/2);
        ctx.rotate(pcoord[i][2]*Math.PI/180.);
        
        ctx.drawImage(pimg[i], -pimg[i].width/2, -pimg[i].height/2, pimg[i].width, pimg[i].height);
        
        ctx.rotate(-pcoord[i][2]*Math.PI/180.);
        ctx.translate(-imgx - pimg[i].width/2, -imgy - pimg[i].height/2);
    }
    
    var wpix=0;
    for (var i = left3+1; i < left3 + size3; i++) {
        for (var j = top3+1; j < top3 + size3; j++) {
            var p = ctx.getImageData(i, j, 1, 1).data; 
            if (p[3] == 0) wpix++;
        }
    }
    
    if (wpix < 1000) win();
    else startGame3();
}

function win()
{
    for (var i = 0; i < 9; i++) pimg[i].style.display = "none";
    btn3.display = "none";
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    task++;
    main();
}



























