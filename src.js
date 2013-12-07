var canvas
var ctx
$(document).ready(function(){

canvas = document.getElementById('main')
ctx = canvas.getContext('2d')
var vicp = $("#vicp")[0]
ctx.drawImage(vicp, 0,0,500,500)

$("#topline").keyup(function(){
	draw()	
});

$("#bottomline").keyup(function(){
	draw()
});

function draw(){
	var txtTop = $("#topline")[0].value
	var txtBottom = $("#bottomline")[0].value
	var fst = fitText(ctx, txtTop, "arial", "bold", 480)
	var fsb = fitText(ctx, txtBottom, "arial", "bold", 480)
	ctx.fillStyle = "rgb(250,250,250)"
	ctx.strokeStyle = "rgb(0,0,0)"
	ctx.textAlign="center"
	
	ctx.drawImage(vicp, 0,0,500,500)
	
	ctx.font = "bold " + fst.toString() + "px arial"
	ctx.fillText(txtTop, 250, fst)
	ctx.strokeText(txtTop, 250, fst)
	
	ctx.font = "bold " + fsb.toString() + "px arial"
	ctx.fillText(txtBottom, 250, 500-10)
	ctx.strokeText(txtBottom, 250, 500-10)
}

function fitText(ctx, str, font, style, width){
	var l=20
	var r=100
	while (r-l>1){
		var m=Math.floor((l+r)/2)
		ctx.font = style + " " + m.toString()+"px "+font
		if (ctx.measureText(str).width <= width){
			l=m
		} else {
			r=m
		}
	}
	return l
}
});
