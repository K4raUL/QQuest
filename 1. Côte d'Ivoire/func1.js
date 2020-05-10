function task1()
{
    document.title = "1. Vacation";
    
    setTimeout(function(){ 
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);    
        ctx.drawImage(bcg1, 0, 0, cnv.width, cnv.height);
    },1);    
    
    var answer = "";
    
    setTimeout(function(){
        while (answer != "Кот д'Ивуар" && answer != "Côte d'Ivoire") {
            answer = prompt("Отлично! Итак, первое задание.\n" +
            "Один человек поехал как-то отдыхать. Приехав в столицу одной теплой страны, " + 
            "он снял номер в самом дорогом отеле, прямо напротив городской администрации." +
            "Зайдя в номер, он первым делом подошел к окну, чтобы закрыть его, так как в тот " +
            "день дул необычайно сильный ветер. Обернувшись, он увидел огромное зеркало прямо " +
            "напротив окна, в котором было видно что происходит снаружи на улице. " +
            "Всмотревшись в него, он восклинул 'Как будто я и не уезжал из свой родной Италии!' " +
            "В какой стране он отдыхал?");
        }
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        task++;
        main();
    },100);
}