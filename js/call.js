var balls=[];
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

    var canvas=document.getElementById("canvas");
    var cxt=canvas.getContext('2d');
    var window_width=$('.canvas').width();
    var window_height=$('.canvas').height();
    //使计时器位置只适应屏幕
    var marginLeft=Math.round(window_width/100);
    var marginTop=Math.round(window_height/12);
    var R=1.5;
    var curShowTimeSeconds=getCurrentShowTimeSeconds();
    setInterval(function () {
        render(cxt);
        update();
    },50);
function update() {
    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nextHours=nextShowTimeSeconds[0];
    var nextMinutes=nextShowTimeSeconds[1];
    var nextSeconds=nextShowTimeSeconds[2];

    var curHours=curShowTimeSeconds[0];
    var curMinutes=curShowTimeSeconds[1];
    var curSeconds=curShowTimeSeconds[2];
    if(nextShowTimeSeconds!=curShowTimeSeconds){
        if(nextHours!=curHours){
            addBalls(marginLeft+0,marginTop,parseInt(curHours/10));
        }
        if(nextHours%10!=curHours%10){
            addBalls(marginLeft+15*(R+1),marginTop,parseInt(curHours%10));
        }
        if(nextMinutes!=curMinutes){
            addBalls(marginLeft+39*(R+1),marginTop,parseInt(curMinutes/10));
        }
        if(nextMinutes%10!=curMinutes%10){
            addBalls(marginLeft+54*(R+1),marginTop,parseInt(curMinutes%10));
        }
        if(nextSeconds!=curSeconds){
            addBalls(marginLeft+78*(R+1),marginTop,parseInt(curSeconds/10));
        }
        if(nextSeconds%10!=curSeconds%10){
            addBalls(marginLeft+93*(R+1),marginTop,parseInt(curSeconds%10));
        }
        curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();

}
function addBalls(x,y,num) {
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(R+1)+R+1,
                    y:y+i*2*(R+1)+R+1,
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall);
            }
}
function getCurrentShowTimeSeconds() {
    var curTime=new Date();
    var hours=curTime.getHours();
    var minutes=curTime.getMinutes();
    var seconds=curTime.getSeconds();
    var times=[hours,minutes,seconds];
    return times;
}
function render(cxt) {
    cxt.clearRect(0,0,window_width,window_height);
    var hours=curShowTimeSeconds[0];
    var minutes=curShowTimeSeconds[1];
    var seconds=curShowTimeSeconds[2];
    renderDigit(marginLeft,marginTop,parseInt(hours/10),cxt);
    renderDigit(marginLeft+15*(R+1),marginTop,parseInt(hours%10),cxt);
    renderDigit(marginLeft+30*(R+1),marginTop,10,cxt);
    renderDigit(marginLeft+40*(R+1),marginTop,parseInt(minutes/10),cxt);
    renderDigit(marginLeft+55*(R+1),marginTop,parseInt(minutes%10),cxt);
    renderDigit(marginLeft+70*(R+1),marginTop,10,cxt);
    renderDigit(marginLeft+80*(R+1),marginTop,parseInt(seconds/10),cxt);
    renderDigit(marginLeft+95*(R+1),marginTop,parseInt(seconds%10),cxt);

    for(var i=0;i<balls.length;i++){
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fillStyle=balls[i].color;
        cxt.fill();
    }
}
function renderDigit(x,y,num,cxt) {
    cxt.fillStyle="#0000CD";
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc((x+j*2*(R+1)+R+1),(y+i*2*(R+1)+R+1),R,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();

            }
}


function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if(balls[i].y>=(window_height-R)){
            balls[i].y=window_height-R;
            balls[i].vy=balls[i].vy*0.75;
        }
    }
    var cut=0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].x+R>0 && balls[i].x-R<window_width)
            balls[cut++]=balls[i];
    }
    while (balls.length>Math.min(400,cut)){
        balls.pop();
    }
}