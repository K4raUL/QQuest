function task2()
{
    document.title = "2. Travel";
    
    setTimeout(function(){   
        cnv.width = 0.95*window.innerWidth;
        cnv.height = 0.95*window.innerHeight;
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.drawImage(bcg2, 0, 0, cnv.width, cnv.height);
    },1);    
    
    audio2.play();
    var answer = "";
    
    setTimeout(function(){
        while (answer != "Индия") {
            answer = prompt("Этот человек был химиком по специальности и по профессии." +
            "Однажды он полетел из Франции в Германию.\n" + 
            "Через какую страну химики летают из Франции в Германию?");
        }
        
        audio2.pause();
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        task++;
        main();
    },100);
}