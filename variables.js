var cnv;
var ctx;
var task = 0;

// Task 1. Vacation
var bcg1;

// Task 2. Travel
var bcg2;
var audio2;

// Task 3. Masterpiece
var size3;
var top3;
var left3;
var isSelected;

var cleft3;
var ctop3;

var bcg3;
var btn3;

var pcoord = [[]];
var pimg = [];

// Task 4. IndonesiaStar
var bcg4;

// Task 5. Find keys
var cases5 = [];
var keys5 = [];
var code5 = [];

var isKey5;
var count5;
var try5;

var case5W;
var case5H;
var key5W;
var key5H;

var top5c;
var top5k;

var trymax;

// Task 6. Kill Corona
var virus = [];
var anti;
var viruspic1;
var viruspic2;
var audio6;

var gameOver;
var count6;

// Task 7. Gold Section
var bcg7;

// Task 8. Maze Fire
var secpic;
var selsecpic;
var firepic8;

var left8;
var top8;
var w8;
var h8;

var cell8W;
var cell8H;

var tableW;
var tableH;
var field8 = [[]];

var solution8;
var solarr = [[]];

// Task 9. Maze solving
var playerUP;
var playerDOWN;
var playerRIGHT;
var playerLEFT;

var firepic;
var winpic;

var M;
var N;
var F = [[]];           // bit field 0000 relatively to (RIGHT, DOWN, LEFT, UP) directions

var nc = [];
var dir = [];

var x0;
var y0;

var cell9W;
var cell9H;
var top9;            // height of top point of whole maze
var left9;           // width of left point of whole maze

var key = [];
var keyON;
var playerX;
var playerY;

var rotangle;

var pvh;
var time0;
var timer0;
var part2;
var part3;

// Task 10. Auto Maze
var size10;
var pX;
var pY;
var prevX;
var prevY;

var codearea;
var runbtn;
var stopbtn;
var x2btn;
var x10btn;

var timeK;
var stop;
var orient;
var canmove;

var endpic;

function init()
{

    cnv = document.getElementById("c0");
    ctx = cnv.getContext("2d");
    
    // ------------------------- Task 1. Vacation -------------------------
    bcg1 = new Image(550, 366);
    bcg1.src = "1. Côte d'Ivoire/1.png";
    // --------------------------------------------------------------------

    // ------------------------- Task 2. Travel -------------------------
    bcg2 = new Image(2900, 2027);
    bcg2.src = "2. Fr-In-Ge/2.png";
    audio2 = new Audio('2. Fr-In-Ge/2.mp3');
    // ------------------------------------------------------------------
    
    // ------------------------- Task 3. Masterpiece -------------------------
    bcg3 = new Image(300, 300);
    bcg3.src = ("3. Masterpiece/bcg3.png");
    // -----------------------------------------------------------------------
    
    // ------------------------- Task 4. IndonesiaStar -------------------------
    bcg4 = new Image(900, 870);
    bcg4.src = ("4. IndonesiaStar/4.png");
    // -------------------------------------------------------------------------
    
    // ------------------------- Task 5. Find keys -------------------------
    for (var i = 1; i <= 5; i++) {
        cases5[i-1] = document.getElementById("case5" + i);
        keys5[i-1] = document.getElementById("key5" + i);
    }
    // ---------------------------------------------------------------------
    
    // ------------------------- Task 6. Kill Corona -------------------------
    anti = new Image(114, 160);
    anti.src = '6. KillCorona/anti.png';

    viruspic1 = new Image(25, 25);
    viruspic1.src = '6. KillCorona/covid_green.png';
    viruspic2 = new Image(25, 25);
    viruspic2.src = '6. KillCorona/covid_red.png';

    audio6 = new Audio('6. KillCorona/spray.mp3');
    // -----------------------------------------------------------------------
    
    // ------------------------- Task 7. Gold Section -------------------------
    bcg7 = new Image(960, 539);
    bcg7.src = ('7. Gold Section/7.png');
    // ------------------------------------------------------------------------
        
    // ------------------------- Task 8. Maze Fire -------------------------
    secpic = new Image(113, 68);
    secpic.src = ('8. MazeExtinguish/sec.png'); 
    selsecpic = new Image(113, 68);
    selsecpic.src = ('8. MazeExtinguish/selsec.png'); 
    firepic8 = new Image(52, 80);
    firepic8.src = ('8. MazeExtinguish/fireicon.png');     
    
    tableW = 10;
    tableH = 11;
    
    field8[0] = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[1] = [-1,0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[2] = [-1,0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[3] = [-1,1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[4] = [-1,0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[5] = [-1,3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    field8[8] = [-1,-1,-1,0,-1, 0,-1, 0,-1, 0,-1];
    field8[9] = [-1,-1,-1,0,-1, 0,-1, 0,-1, 0,-1];
    
    solarr[0] = [3, 1];
    solarr[1] = [0, 0];
    solarr[2] = [0, 0];
    solarr[3] = [0, 0];
    solarr[4] = [3, 1];
    solarr[5] = [5, 1];
    solarr[6] = [5, 1];
    solarr[7] = [0, 0];
    // ---------------------------------------------------------------------
    
    // ------------------------- Task 9. Maze solving -------------------------
    playerUP = new Image(80, 80);
    playerUP.src = "9. MazeSolve/up.png";
    playerDOWN = new Image(80, 80);
    playerDOWN.src = "9. MazeSolve/down.png";
    playerRIGHT = new Image(80, 80);
    playerRIGHT.src = "9. MazeSolve/right.png";
    playerLEFT = new Image(80, 80);
    playerLEFT.src = "9. MazeSolve/left.png";

    firepic = new Image(80, 80);
    firepic.src = "9. MazeSolve/fireicon.png";
    winpic = new Image(192, 192);
    winpic.src = "9. MazeSolve/treasure.png";
    
    
    M = 10;
    N = 11;
    // ------------------------------------------------------------------------

    // ------------------------- Task 10. Auto Maze -------------------------
    endpic = new Image(1014, 977);
    endpic.src = "10. AutoMaze/win.png";
    // ----------------------------------------------------------------------
    
    main();
}