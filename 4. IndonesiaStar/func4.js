function task4()
{
    document.title = "4. StarSky";

    setTimeout(function(){    
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.drawImage(bcg4, 0, 0, cnv.height, cnv.height);
    },1);
    
    var answer = "";
    setTimeout(function(){
        while (answer != "Индонезия") {  
            answer = prompt("Отлично, телефон цел и работает, только уровень сигнала на нуле. " +
                  "В отчаянии герой взглянул на ночное небо, пытаясь понять, где находится." +
                  "Со всех сторон его окружали звёзды.\nГде он оказался?");
        }
        
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        task++;
        main();
    },1500);    
}