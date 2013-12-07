var canvas
var ctx
$(document).ready(function(){

canvas = document.getElementById('main')
ctx = canvas.getContext('2d')
var vicp = $("#vicp")[0]

var imageUrl = window.location.hash.substring(1);
console.log(imageUrl)
vicp.src=imageUrl

$("#vicp").load(function(){
	ctx.drawImage(vicp, 0,0,500,500)
});

$("#save").click(function(){
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
	window.location=image
});

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
	//ctx.fillText(txtTop, 250, fst)
	//ctx.strokeText(txtTop, 250, fst)
	
	var drawFunc = function(context, line, x, y){
		context.fillText(line, x, y)
		context.strokeText(line, x, y)
	}
	
	var topLines = splitLine(ctx, txtTop, ctx.font, 480)
	drawTextMultiline(ctx, topLines, 250, fst, drawFunc)
	
	var bottomLines = splitLine(ctx, txtBottom, ctx.font, 480)
	var voff = 500-10
	if (bottomLines[1]!=""){
		voff = voff - ctx.measureText("M").width
	}
	drawTextMultiline(ctx, bottomLines, 250, voff, drawFunc)
}

function drawTextMultiline(ctx, lines, x, y, drawfunc){
	var offset = 0
	lines.forEach(function(line){
		drawfunc(ctx, line, x, y+offset)
		offset = offset + ctx.measureText("M").width
	})
}

//font is of format: "[style] [size] [family]"
function splitLine(ctx, str, font, width){
	var words = str.split(" ")
	ctx.font = font
	var l=1
	var r=words.length+1
	while (r-l>1){
		var m = Math.floor((l+r)/2)
		if (ctx.measureText(words.slice(0, 0+m).join(" ")).width <= width){
			l=m
		} else {
			r=m
		}
	}
	return new Array(words.slice(0,0+l).join(" "), words.slice(0+l,words.length).join(" "))
}

//font is only font family
function fitText(ctx, str, font, style, width){
	var l=36
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
