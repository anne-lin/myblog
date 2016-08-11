var clock=document.getElementById('clock');
var cxt=clock.getContext('2d');

function drawClock(){
    cxt.clearRect(0,0,620,500);
    var now =new Date();
    var sec=now.getSeconds();
    var min=now.getMinutes();
    var hour=now.getHours();
    hour=hour+min/60;
    hour=hour>12?hour-12:hour;
    
    cxt.lineWidth=10;
    cxt.strokeStyle="black";
    cxt.beginPath();
    cxt.arc(250,250,200,0,360,false);
    cxt.closePath();
    cxt.stroke();
    for(var i=0;i<12;i++){
        cxt.save();
        cxt.lineWidth=7;
        cxt.strokeStyle="black";
        cxt.translate(250,250);
        cxt.rotate(i*30*Math.PI/180);
        cxt.beginPath();
        cxt.moveTo(0,-170);
        cxt.lineTo(0,-190);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    }

    for(var i=0;i<60;i++){
        cxt.save();
        cxt.lineWidth=5;
        cxt.strokeStyle="#333ff";
        cxt.translate(250,250);
        cxt.rotate(i*6*Math.PI/180);
        cxt.beginPath();
        cxt.moveTo(0,-180);
        cxt.lineTo(0,-190);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    }

    cxt.save();
    cxt.lineWidth=7;
    cxt.strokeStyle="#33ffff";
    cxt.translate(250,250);
    cxt.rotate(hour*30*Math.PI/180);
    cxt.beginPath();
    cxt.moveTo(0,-140);
    cxt.lineTo(0,10);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();


    cxt.save();
    cxt.lineWidth=5;
    cxt.strokeStyle="#3399ff";
    cxt.translate(250,250);
    cxt.rotate(min*6*Math.PI/180);
    cxt.beginPath();
    cxt.moveTo(0,-160);
    cxt.lineTo(0,15);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();



    cxt.save();
    cxt.strokeStyle="#33ff33";
    cxt.lineWidth=3;
    cxt.translate(250,250);
    cxt.rotate(sec*6*Math.PI/180);
    cxt.beginPath();
    cxt.moveTo(0,-150);
    cxt.lineTo(0,20);
    cxt.closePath();
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(0,0,5,0,360,false);
    cxt.closePath();
    cxt.fillStyle="gray";
    cxt.fill();
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(0,-150,5,0,360,false);
    cxt.closePath();
    cxt.fillStyle="gray";
    cxt.fill();
    cxt.stroke();
    cxt.restore();
}
drawClock();
setInterval(drawClock,1000);