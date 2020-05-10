function task5()
{
    document.title = "5. Find key";
    trymax = 8;

    setTimeout(function(){    
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);
    },1);
    
    setTimeout(function(){
        alert("Определившись со своим местоположением, он обыскал близлежащую местность. "  +
              "Вокруг было разбросано множество обломков и багажа. Он нашел чемодан, который" +
              "выглядел точь в точь как его собственный и такой же ключ. Правда, продолжив" +
              "поиски, он нашел еще 4 таких же чемодана и ключа. Все они выглядели абсолютно" +
              "одинаково. Химику позарез были нужны его вещи. Выясните, какой ключ какому " +
              "чемодану соответствует.\n У вас " + trymax + " попыток.");
        startGame5();
    },200);  
}

function startGame5()
{
    transform5();
    clear5();
    
    drawcases5();
    drawkeys5();
    drawcount5();
}

function clear5()
{
    isKey5 = 0;
    count5 = 0;
    try5 = 0;
    
    code5 = [1, 2, 3, 4, 5];
    shuffle(code5);
    
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
    var canvdiv = document.getElementsByClassName("draw");
    var divrect = canvdiv[0].getBoundingClientRect();
    var cnvrect = cnv.getBoundingClientRect();
    
    cleft3 = cnvrect.left + divrect.left - 1;
    ctop3  = cnvrect.top - 1;
    
    for (var i = 0; i < 5; i++) {
        cases5[i].style.display = 'none';
        keys5[i].style.display = 'none';
        keys5[i].style.border = 'none';
        cases5[i].src = "5. Find keys/caseoff.png";
        cases5[i].setAttribute('onclick','checkCase5(' + (i+1) + ')');
        keys5[i].setAttribute('onclick','selectKey5(' + (i+1) + ')');
    }
}

function drawcases5()
{
    for (var i = 0; i < 5; i++) {
        cases5[i].style.left = (cleft3 + (2*i+1)*case5W) + 'px'; 
        cases5[i].style.top  = (ctop3 + top5c) + 'px';
        cases5[i].width = case5W;
        cases5[i].height = case5H;
        cases5[i].style.display = 'block';
    }
}

function drawkeys5()
{
    for (var i = 0; i < 5; i++) {
        keys5[i].style.left = (cleft3 + (2*i+1)*key5W) + 'px'; 
        keys5[i].style.top  = (ctop3 + top5k) + 'px';
        keys5[i].width = key5W;
        keys5[i].height = key5H;
        keys5[i].style.display = 'block';
    }
}

function drawcount5()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
    ctx.font = '50px serif';
    ctx.fillText((trymax-try5), cnv.width/2, key5H);
    
}

function checkCase5(num)
{
    if (num == code5[isKey5-1]) {
        cases5[num-1].src = '5. Find keys/caseon.png';
        cases5[num-1].setAttribute('onclick','');
        
        keys5[isKey5-1].setAttribute('onclick','');
        keys5[isKey5-1].style.border = '10px solid green';
        
        count5++;
        if (count5 == 5) {
            endGame5(1);
            return;
        }
    }
    else keys5[isKey5-1].style.border = 'none';
    
    try5++;
    drawcount5();
    if (try5 >= trymax) endGame5(0);
    
    isKey5 = 0;    
}

function selectKey5(num)
{
    if (isKey5 == num) isKey5 = 0;
    else {
        isKey5 = num;
        keys5[isKey5-1].style.border = '4px solid blue';
    }
}

function endGame5(val)
{
    if (val) {
        for (var i = 0; i < 5; i++) {
            keys5[i].style.display = 'none';
            keys5[i].style.border = 'none';
            cases5[i].setAttribute('onclick','selectCase6(' + (i+1) + ')');
        }
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        
        task++;
        main();
    }
    else startGame5();
}

function transform5()
{
    var w = cnv.width;
    var h = cnv.height;
    
    case5W = w/11;
    case5H = case5W;
    
    key5W = case5W;
    key5H = case5W*164/190;
    
    top5c = h/4;
    top5k = 3*h/4;
}
