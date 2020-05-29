// SETUP{{{
/* vim: set foldmethod=marker: */
const c = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cx = c.width, cy = c.height;
let input = [];
let state = 0;
let layer = [];
let mx = 0, my = 0;

// LOAD IMAGES/ANIMATIONS
// NOTE: use naturalWidth/naturalHeight to obtain the original width/height of the image
// animation general form: let image = new Animation(filename, width, height, hori, vert);

// LOAD AUDIO FILES
// general form: let sound = new Audio("source.ext");

// GLOBAL VARIABLES

// DEFAULT LAYERS (smaller indices are drawn first)

/*}}}*/

function state0(){}
function state1(){}

// DO NOT EDIT BEYOND THIS POINT{{{
// --------------------------------
window.setInterval(() => {
	draw_screen();
	// run statex(); as the game logic 
	eval("state" + String(state) + "();");
}, 41.6667 /*div(1000, fps)*/);

/*CONTROL HANDLING*/
// KEYBOARD
document.addEventListener("keydown", (event) => {
	event.preventDefault();
	input[event.keyCode] = true;
	return false;
}); // append ,true for event capturing instead of event bubbling
document.addEventListener("keyup", (event) => {
	event.preventDefault();
	input[event.keyCode] = false;
	return false;
});

// MOUSE
document.addEventListener("mousemove", (event) => {
	event.preventDefault();
	mx = event.clientX;
	my = event.clientY;
	// mouse image updates are best placed here (maybe include let mouse_update = setInterval... clearInterval

	return false;
});
document.addEventListener("mousedown", (event) => {
	event.preventDefault();
	input[36] = true;
	return false;
});
document.addEventListener("mouseup", (event) => {
	event.preventDefault();
	input[35] = false;
	return false;
});

// left click
document.addEventListener("click", (event) => {
	event.preventDefault();
	// [...]
	return false;
});
// right click
document.addEventListener("contextmenu", (event) => {
	event.preventDefault();
	// [...]
	return false;
});

/* TODO:
	audio fade-in
	loading screen
	errors (Th.)
*/

// MISC. FUNCTIONS:{{{
function draw_screen(){
	ctx.clearRect(0, 0, cx, cy);
	for(let t = 0; t < layer.length; t++){
		for(let a = 0; a < layer[t].length/4; a++){
			if(layer[t][(a*4)+1] === "tile"){ // tile
				let ptrn = ctx.createPattern(layer[t][a*4].img, "repeat");
				ctx.fillStyle = ptrn;
				ctx.fillRect(layer[t][(a*4)+2], layer[t][(a*4)+3], layer[t][(a*4)].width, layer[t][(a*4)].height);
			}
			else if(layer[t][(a*4)+1] == "anim"){ // animation
				anim(layer[t][a*4], layer[t][(a*4)+2], layer[t][(a*4)+3]);
			}
			else{ // still sprite
				ctx.drawImage(layer[t][a*4].img, layer[t][(a*4)+2], layer[t][(a*4)+3]);
			}
		}
	}
}
function anim(ss, x, y){
	ctx.drawImage(ss.img, (ss.frame % (ss.hori - 1)) * ss.width, Math.floor(ss.frame / ss.hori) * ss.height, ss.width, ss.height, x, y, ss.width, ss.height);
	ss.frame = (ss.frame + 1) % ss.length;
}
function add(anim, is_anim, coor, L){
	if(layer[L] == undefined){
		layer[L] = [];
		layer[L][0] = anim;
		layer[L][1] = is_anim;
		layer[L][2] = coor[0];
		layer[L][3] = coor[1];
		return;
	}
	for(let t = 0; t <= layer[L].length; t+= 4){
		if(layer[L][t] == undefined){
			layer[L][t] = anim;
			layer[L][t+1] = is_anim;
			layer[L][t+2] = coor[0];
			layer[L][t+3] = coor[1];
			return;
		}
	}
}
function empty_layers(){
	for(let t = 0; t < layer.length; t++){
		layer[t] = [];
	}
}
function aabb(a, b){ // {min_x, max_x, min_y, max_y}, {min_x, max_x, min_y, max_y})
	return !(
		a.max_x < b.min_x || 
		a.max_y < b.min_y || 
		a.min_x > b.max_x || 
		a.min_y > b.max_y
	);
}

function Animation(filename, width, height, hori, vert){
	this.frame = 0;
	this.hori = hori;
	this.vert = vert;
	this.width = width/hori;
	this.height = height/vert;
	this.length = hori*vert;
	this.img = new Image();
	this.img.src = filename;
}/*}}}*//*}}}*/
