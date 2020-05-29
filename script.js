// SETUP{{{
/* vim: set foldmethod=marker: */
const c = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cx = c.width, cy = c.height;
let input = [];
let state = 0;
let layer = [];

// LOAD IMAGES/ANIMATIONS
// NOTE: use naturalWidth/naturalHeight to obtain the original width/height of the image
// animation general form: let image = new Animation(filename, width, height, hori, vert);
let tmp_step1 = new Animation("assets/ground2.png", 100, 150, 1, 1);/*{{{*/
let tmp_step2 = new Animation("assets/ground2.png", 100, 150, 1, 1);
let tmp_step3 = new Animation("assets/ground2.png", 100, 150, 1, 1);
let tmp_step = [null, tmp_step1, tmp_step2, tmp_step3];

let tmp_char = new Animation("tmp/square/128x128/grid/blue128x128.png", 128, 128, 1, 1);
let tmp_battery = new Animation("tmp/square/8x8/grid/red8x8.png", 20, 100, 1, 1);
let tmp_batterycont= new Animation("tmp/square/8x8/grid/blue8x8.png", 40, 120, 1, 1);
let tmp_solid = new Animation("tmp/square/8x8/solid/blue8x8.png", 128, 128, 1, 1);
let tmp_context = new Animation("tmp/square/8x8/solid/green8x8.png", 128, 200, 1, 1);
let tmp_grid = new Animation("assets/grid_temp.png", 200, 200, 1, 1);/*}}}*/

let dropdowneyes = new Animation("assets/eye_select.png", 128, 136, 1, 1);
let dropdownears = new Animation("assets/ear_select.png", 128, 73, 1, 1);
let dropdownlegs = new Animation("assets/leg_Select.png", 128, 200, 1, 1);
let dd = [,,,,dropdownears,,dropdowneyes,dropdownlegs]; // TMP: check indices

let blank_pixel = new Animation("assets/blank_pixel.png", 1, 1, 1, 1);
let title_screen = new Animation("assets/Title_Screen.png", 480, 720, 1, 1);
let game_lose = new Animation("assets/game_over.png", 480, 360, 1, 1);
let game_win = new Animation("assets/win.png", 480, 360, 1, 1);

let limited_vision = new Animation("assets/gray_test.png", 720, 720, 1, 1);
let tunnel_vision = new Animation("assets/tunnel_vision.png", 720, 720, 1, 1);

let hoover_idle = new Animation("assets/hoover_idle.png", 600, 600, 6, 6);
let hoover_left = new Animation("assets/hoover_run_left.png", 300, 300, 3, 3);
let hoover_right = new Animation("assets/hoover_run.png", 300, 300, 3, 3);

let wheel_right = new Animation("assets/wheel.png", 500, 100, 5, 1);
let wheel_left = new Animation("assets/wheel_left.png", 500, 100, 5, 1);
let wheel_idle = new Animation("assets/wheel_idle.png", 800, 400, 8, 4);

let pogo = new Animation("assets/pogo.png", 100, 100, 1, 1);

let no_leg = new Animation("assets/noleg.png", 100, 100, 1, 1);

let battery100 = new Animation("assets/100.png", 23, 155, 1, 1,);/*{{{*/
let battery90 = new Animation("assets/90.png", 23, 155, 1, 1,);
let battery80 = new Animation("assets/80.png", 23, 155, 1, 1,);
let battery70 = new Animation("assets/70.png", 23, 155, 1, 1,);
let battery60 = new Animation("assets/60.png", 23, 155, 1, 1,);
let battery50 = new Animation("assets/50.png", 23, 155, 1, 1,);
let battery40 = new Animation("assets/40.png", 23, 155, 1, 1,);
let battery30 = new Animation("assets/30.png", 23, 155, 1, 1,);
let battery20 = new Animation("assets/20.png", 23, 155, 1, 1,);
let battery10 = new Animation("assets/10.png", 23, 155, 1, 1,);
let battery_img = [battery10, battery20, battery30, battery40, battery50, battery60, battery70, battery80, battery90, battery100/*10 images, each progressively more full*/];/*}}}*/

let background = new Animation("assets/background0_wip.png", 4800, 360, 1, 1);
let bottom_overlay = new Animation("assets/bottom_overlay.png", 480, 360, 1, 1);
let gear = new Animation("assets/gear.png", 40, 40, 1, 1);
let cursor = new Animation("assets/cursor.png", 16, 16, 1, 1);

// green images
let gwire_hori = new Animation("assets/green_wire.png", 43, 9, 1, 1);
let gwire_vert = new Animation("assets/green_wire_v.png", 9, 43, 1, 1);
let gturn0 = new Animation("assets/green_li_open.png", 43, 43, 1, 1);
let gturn1 = new Animation("assets/green_li_open2.png", 43, 43, 1, 1);
let gturn2 = new Animation("assets/green_li_open3.png", 43, 43, 1, 1);
let gturn3 = new Animation("assets/green_li_open4.png", 43, 43, 1, 1);
let gsplit0 = new Animation("assets/green_tspin_1.png", 43, 43, 1, 1);
let gsplit1 = new Animation("assets/green_tspin_2.png", 43, 43, 1, 1);
let gsplit2 = new Animation("assets/green_tspin_3.png", 43, 43, 1, 1);
let gsplit3 = new Animation("assets/green_tspin_4.png", 43, 43, 1, 1);
let greenin = new Animation("assets/green_in.png", 43, 43, 1, 1);
let greenout = new Animation("assets/green_elipse.png", 43, 43, 1, 1);

// red images
let rwire_hori = new Animation("assets/red_line.png", 43, 9, 1, 1);
let rwire_vert = new Animation("assets/red_line_v.png", 9, 43, 1, 1);
let rturn0 = new Animation("assets/red_li_open.png", 43, 43, 1, 1);
let rturn1 = new Animation("assets/red_li_open2.png", 43, 43, 1, 1);
let rturn2 = new Animation("assets/red_li_open3.png", 43, 43, 1, 1);
let rturn3 = new Animation("assets/red_li_open4.png", 43, 43, 1, 1);
let rsplit0 = new Animation("assets/red_tspin_1.png", 43, 43, 1, 1);
let rsplit1 = new Animation("assets/red_tspin_2.png", 43, 43, 1, 1);
let rsplit2 = new Animation("assets/red_tspin_3.png", 43, 43, 1, 1);
let rsplit3 = new Animation("assets/red_tspin_4.png", 43, 43, 1, 1);
let redin = new Animation("assets/red_in.png", 43, 43, 1, 1);
let redout = new Animation("assets/red_elipse.png", 43, 43, 1, 1);

// Gates
let notgate = new Animation("assets/alert.png", 43, 43, 1, 1);
let redgate = new Animation("assets/red_make.png", 43, 43, 1, 1);
let greengate = new Animation("assets/green_make.png", 43, 43, 1, 1);
let grid_block = new Animation("assets/grey_block.png", 43, 43, 1, 1);
let vert_bridge = new Animation("assets/bridge_v.png", 43, 43, 1, 1);
let hori_bridge = new Animation("assets/bridge_h.png", 43, 43, 1, 1);

let gsprite = [blank_pixel, gwire_hori, gwire_vert, gturn2, gturn3, gturn1, gturn0, gsplit3, gsplit0, gsplit1, gsplit2, notgate, greengate, redgate, hori_bridge, vert_bridge, redin, greenin, redout, greenout, grid_block];
let rsprite = [blank_pixel, rwire_hori, rwire_vert, rturn2, rturn3, rturn1, rturn0, rsplit3, rsplit0, rsplit1, rsplit2, notgate, redgate, greengate, hori_bridge, vert_bridge, redin, greenin, redout, greenout, grid_block];
// _-|[]()<>v^!rgHV01RGX

// LOAD AUDIO FILES
// general form: let sound = new Audio("source.ext");
let music = new Audio("assets/jam.mp3");
let pause_music = new Audio("assets/pause.mp3");
let initial_play = false;
music.loop = true;
pause_music.loop = true;

// GLOBAL VARIABLES
let mx = 0, my  = 0;
let screen_lock = true;
let x = 0, y = 260, d = 0; // d = distance
let mo = 0; // momentum
let mo_dec = [1.5, 0.25, 1.5, 1];

let upmo = 0; // upward momentum
let leap = false;
let init_upmo = 14, upmo_dec = 1;

let comp = 0;
let battery = 1000;

let lvl_enc = [{h: 1, c:"empty"}, {h: 1, c:"comp"}, {h:2, c:"empty"}, {h:0, c:"empty"}, {h:2, c:"empty"}, {h:2, c:"empty"}, {h:3, c:"empty"}, {h:2, c:"empty"}]; // curated level
let pre = 0;
let tmph = 0;
for(let t = 0; t < 1000; t++){
	tmph = Math.round(Math.random()*3);
	while(Math.abs(tmph - pre) > 2){tmph = Math.round(Math.random()*3);}
	if(t % 10 == 0){lvl_enc[t] = {h: tmph, c:"comp"};}
	else if((t + 1) % 30 == 0){lvl_enc[t] = {h: tmph, c:"break"};}
	else{lvl_enc[t] = {h: tmph, c:"empty"};}
	pre = tmph;
}
let lvl_save = lvl_enc.slice();
//let lvlenc = ".1c2.1...0.N";
let lvl_length = lvl_enc.length*100;
let lvl_point = 0;

let grid = [];
let in_list = [];
let engistack = [];
let wl = null; // wire last position
let wi = "-";
let turn = 0;

let legs = 0;
let eyes = 0;
let ears = 0;

// DEFAULT LAYERS (smaller indices are drawn first)
// w: 480, h: 720
let cursor_layer = 6;
// TMP: font size
ctx.font = "20px Arial";
/*}}}*/

function init_state0(){
	add(title_screen, "still", [0,0], 0);
	add(cursor, "still", [0,0], cursor_layer);
}
function state0(){ // TITLE SCREEN/OPTIONS
	// draw title screen
	if(input[36]){
		init_state1();
		state = 1;
	}
}
function init_state1(){/*{{{*/
	empty_layers();
	add(background, "still", [0,0], 0);
	add(hoover_idle, "anim", [0,260], 1);

	// Layer 2 = colision layer
	layer[2] = [];
	
	add(blank_pixel, "still", [0,0], 3);
	add(bottom_overlay, "still", [0,360], 3);
	add(battery100, "still", [450, 380], 3);
	add(blank_pixel, "tile", [15,400], 3);
	add(blank_pixel, "tile", [0,600], 3);
	add(blank_pixel, "tile", [155,550], 3);
	add(blank_pixel, "tile", [250,400], 3);
	add(blank_pixel, "tile", [330,570], 3);

	layer[4] = [];

	add(gear, "still", [400,380], 5);
	add(cursor, "still", [mx,my], cursor_layer);

	d = 0;
	x = 0;
	lvl_enc = lvl_save;
}/*}}}*/
function leg0(){ // HOOVER
	if(input[68]){ // D
		mo += 3;
		if(mo > 15){mo = 15;}
		layer[1][0] = hoover_right;
	}
	if(input[65]){ // A
		mo -= 3;
		if(mo < -15){mo = -15;}
		layer[1][0] = hoover_left;
	}
	if((input[65] && input[68]) || (!input[65] && !input[68])){ // Both held = idle
		layer[1][0] = hoover_idle;
	}
	if((input[87] || input[32]) && !leap){//&& layer[1][7] > 300){ // SPACEBAR
		upmo = init_upmo;
		leap = true;
		y -= upmo;
	}
}
function leg1(){ // WHEEL
	if(input[68]){ // D
		mo += 3;
		layer[1][0] = wheel_right;
	}
	if(input[65]){ // A
		mo -= 3;
		layer[1][0] = wheel_left;
	}

	if((input[65] && input[68]) || (!input[65] && !input[68])){ // Both held = idle
		layer[1][0] = wheel_idle;
    		mo += (Math.round(Math.random()) == 0) ? 2 : -2;
	}

	if((input[87] || input[32]) && !leap){//&& layer[1][7] > 300){ // SPACEBAR
		upmo = init_upmo;
		leap = true;
		y -= upmo;
	}
    	if(mo > 15){mo = 15;}
    	if(mo < -15){mo = -15;}

	// Add unwanted momentum
	
}
function leg2(){ // POGO
	if(input[68] && leap){ // D
		mo += 3;
		if(mo > 15){mo = 15;}
	}
	if(input[65] && leap){ // A
		mo -= 3;
		if(mo < -15){mo = -15;}
	}
	if((input[87] || input[32]) && !leap){//&& layer[1][7] > 300){ // SPACEBAR
		upmo = init_upmo;
		leap = true;
		y -= upmo;
	}
	layer[1][0] = pogo;
	//layer[1][1] = "still";
} 
function leg3(){ // NO LEGS
	if(input[68]){ // D
		mo += 1.5;
		if(mo > 15){mo = 6;}
	}
	if(input[65]){ // A
		mo -= 1.5;
		if(mo < -15){mo = -6;}
	}
	if((input[87] || input[32]) && !leap){//&& layer[1][7] > 300){ // SPACEBAR
		upmo = init_upmo;
		leap = true;
		y -= upmo;
	}
	layer[1][0] = no_leg;
	//layer[1][1] = "still";
}
function state1(){ // MAIN GAME{{{
	// Momentum/Positional changes
	eval("leg" + legs + "();");

	// level collision checking
	let lco = false, rco = false, uco = false, dco = false; // collision booleans for all the directions
	/*loop through level layer, checking for collision*/
	for(let t = 0; t < layer[2].length/4; t++){
		let test_obj = {min_x: layer[2][(t*4)+2], max_x: layer[2][(t*4)+2] + layer[2][(t*4)].width, min_y: layer[2][(t*4)+3], max_y: layer[2][(t*4)+3] + layer[2][(t*4)].height};
		if(aabb({min_x: x + 45, max_x: x + 55, min_y: y, max_y: y + 100}, test_obj)){ // standing on object
			if(layer[2][(t*4)] == gear){comp++; layer[2][(t*4)] = blank_pixel; layer[2][(t*4)+3] = -100; continue}
			dco = true;
			y = test_obj.min_y - 100;
		}
		if(aabb({min_x: x + 50, max_x: x + 90, min_y: y, max_y: y + 95}, test_obj)){ // standing on object
			if(layer[2][(t*4)] == gear){comp++; layer[2][(t*4)] = blank_pixel; layer[2][(t*4)+3] = -100; continue}
			rco = true;
		}
		if(aabb({min_x: x + 10, max_x: x + 50, min_y: y, max_y: y + 95}, test_obj)){ // standing on object
			if(layer[2][(t*4)] == gear){comp++; layer[2][(t*4)] = blank_pixel; layer[2][(t*4)+3] = -100; continue}
			lco = true;
		}
	}
	if(y >= 260){
		dco = true;
    	}

	// Check to see if position should be updated
	// increment d irrelevant to position/screenlock
	if((mo > 0 && !rco) || (mo < 0 && !lco)){
		layer[0][2] -= mo/5; //bg scroll (add parallax)
		d += mo/2;
	}

	if(((!screen_lock || layer[1][2] < 240) && layer[1][2] < 352 && mo > 0 && !rco) || (layer[1][2] > 0 && mo < 0 && !lco)){
	 	layer[1][2] += mo;
		x += mo;
	}
    	if((mo > 0 && !rco) || (mo < 0 && !lco)){
	    	for(let t = 0; t < layer[2].length/4; t++){
			layer[2][(t*4) + 2] -= mo/2;
	  	}
    	}

	if(mo > 0){mo-=mo_dec[legs];} // normalize momentum towards zero
	if(mo < 0){mo+=mo_dec[legs];}

	// LEVEL GENERATION
	if(d >= lvl_point*100 && lvl_point < lvl_enc.length){
		if(lvl_enc[lvl_point].h != 0){
			add(tmp_step[lvl_enc[lvl_point].h], "still", [480, 360 - lvl_enc[lvl_point].h*50], 2); // TMP: 480 -> 475 
			if(lvl_enc[lvl_point].c == "comp"){
				add(gear, "still", [480 + 30, 360 - lvl_enc[lvl_point].h*50 - 40], 2);
			}
			if(lvl_enc[lvl_point].c == "break"){
				let rand = Math.round(Math.random()*2);
				switch(rand){
					case 0: 
						legs = 3;
					break;
					case 1:
						eyes = 2;
					break;
					case 2:
						ears = 1;
					break;
				}
			}
		}
		if(lvl_point >= 6 && layer[2][2] < -100){ // check for lvl_enc[lvl_point - 1]
			for(let t = 0; t < 4; t++){layer[2].shift();}
		}
		lvl_point++;
    	}

	// Check to see if AI-Bo should fall
	if(!dco && y < 260 && leap == false){
		upmo = 0;
		leap = true;
	}
	
	// Jump momentum
	if(leap){
		upmo -= upmo_dec;
		if(dco){ // TMP: replace with dco
			leap = false;
			upmo = 0;
		}
    	}
	if(!dco){y -= upmo;}
	if(y > 260){y = 260;}
	//if(y > 210){y = 210;}
    	layer[1][3] = y; // 6 is tmp

	// Battery
	battery -= 1;
	// Update battery sprite
	if(battery > 0){
		let batlevel = Math.ceil(battery/100) - 1;
		if(batlevel > 9){batlevel = 9;}
		layer[3][8] = battery_img[batlevel];
	}
	else{
		//gameover
		init_state3("lose");
    	}

	if(d >= lvl_length){
		//TMP: gamewin
		init_state3("win");
	}

	// EYE FILTERS
	// Black out
	if(eyes == 1){
		layer[3][0] = limited_vision;
	}
	if(eyes >= 2){
		layer[3][0] = tunnel_vision;
		layer[3][2] = layer[1][2] - 310;
		layer[3][3] = layer[1][3] - 280;
	}

	// HEARING OPTIONS

}/*}}}*/

function init_state2(){/*{{{*/
	// pause normal music
	pause_music.currentTime = music.currentTime;
	pause_music.play();
	music.pause();

	// generate puzzle
	let tempgrid = generate_grid(1,2,1);
	grid = tempgrid[0];
	in_list = tempgrid[1];
	//grid = [["1", "_", "G", "_"], ["_", "_", "_", "_"],  ["_", "_", "_", "_"], ["_", "_", "_", "_"]];
	// set up engistack
	engistack = [];
	wl = null;
	add(tmp_grid, "still", [140,260], 3);
}/*}}}*/
function state2(){ // ENGINEERING{{{
	for(let t = 0; t < 16; t++){ // INTERPRET INPUT
		// _-|[]()<>v^!rgHV01RGX
		if(input[49]){
			if("-|".indexOf(wi) == -1){
				wi = "-";
			}
			else{
				wi = "-|"[("-|".indexOf(wi) + 1) % 2];
			}
			input[49] = false;
	    	}
		if(input[50]){
			if("[]()".indexOf(wi) == -1){
				wi = "[";
			}
			else{
				wi = "[]()"[("[]()".indexOf(wi) + 1) % 4];
			}
			input[50] = false;
	    	}
		if(input[51]){
			if("<>v^".indexOf(wi) == -1){
				wi = "<";
			}
			else{
				wi = "<>v^"[("<>v^".indexOf(wi) + 1) % 4];
			}
			input[51] = false;
	    	}
		if(input[52]){
			if("!rg".indexOf(wi) == -1){
				wi = "!";
			}
			else{
				wi = "!rg"[("!rg".indexOf(wi) + 1) % 3];
			}
			input[52] = false;
	    	}
		if(input[53]){
			if("HV".indexOf(wi) == -1){
				wi = "H";
			}
			else{
				wi = "HV"[("HV".indexOf(wi) + 1) % 2];
			}
			input[53] = false;
	    	}
	}
	if(input[17] && input[90] && engistack != []){ // CTRL-Z
		let rm = engistack.pop();
		if(rm != undefined){grid[rm[0]][rm[1]] = "_";}
	}

	if(input[36]){ // mouse down
		// INTERPRET INPUT
		let wx = Math.floor((mx - 155)/43);
		let wy = Math.floor((my - 275)/43);
		let wc = [wx,wy]; // current position
		if(wl == null){wl = [wx, wy];} // set wl to current grid position | origin: 155, 275 | size of square: 43

		if(wx > -1 && wx < 4 && wy > -1 && wy < 4){
			if("01GRX".indexOf(grid[wy][wx]) == -1){
		    		grid[wy][wx] = wi;
				engistack.push([wy,wx]);
			}
		}
	}
	// UPDATE SCREEN
	for(let t = 0; t < grid.length; t++){
		for(let a = 0; a < grid[t].length; a++){
			// _-|[]()<>v^!rgXHV01RGX
			layer[4][60-((t*4)+a)*4+0] = gsprite["_-|[]()<>v^!grHV01RGX".indexOf(grid[t][a])];
			layer[4][60-((t*4)+a)*4+1] = "still";
			layer[4][60-((t*4)+a)*4+2] = 155 + 43*a;
			layer[4][60-((t*4)+a)*4+3] = 275 + 43*t;
		}
		layer[4][64] = gsprite["_-|[]()<>v^!grHV01RGX".indexOf(wi)];
		layer[4][65] = "still";
		layer[4][66] = 220;
		layer[4][67] = 220;
	}

	// [...]
	let cs = 0;
	for(let t = 0; t < in_list.length; t++){
		cs += check_solution(null, [in_list[t][0], in_list[t][1]], "up", null) + check_solution(null, [in_list[t][0], in_list[t][1]], "down", null) + check_solution(null, [in_list[t][0], in_list[t][1]], "right", null) + check_solution(null, [in_list[t][0], in_list[t][1]], "left", null);/*{{{*//*}}}*/
	}

	// EXIT IF SOLUTION IS CORRECT
	if(cs == 2){ // TEMPORARY
		music.currentTime = pause_music.currentTime;
		music.play();
		pause_music.pause();

		state = 1;
		layer[3] = [];
		layer[4] = [];
		legs = Math.round(Math.random()*3);
		eyes = Math.round(Math.random()*3);
		if(legs == 3 || legs == 2){
			layer[1][1] = "still";
		}
		else{
			layer[1][1] = "anim";
		}

		add(blank_pixel, "still", [0,0], 3);
		add(bottom_overlay, "still", [0,360], 3);
		add(battery100, "still", [450, 380], 3);/*{{{*/
		add(blank_pixel, "tile", [15,400], 3);
		add(blank_pixel, "tile", [0,600], 3);
		add(blank_pixel, "tile", [155,550], 3);
		add(blank_pixel, "tile", [250,400], 3);
		add(blank_pixel, "tile", [330,570], 3);/*}}}*/
		battery+=300; // TMP: change state to engineer
	}
}/*}}}*/
function init_state3(cause){
	if(cause == "win"){
		layer[5][0] = game_win;
	}
	else{
		layer[5][0] = game_lose;
	}
	layer[5][1] = "still";
	layer[5][2] = 0;
	layer[5][3] = 0;
	state = 3;
}
function state3(){
	if(input[36]){
		battery = 1000;
		init_state1();
		state = 1;
	}
}

// DO NOT EDIT BEYOND THIS POINT{{{
// --------------------------------
init_state0();
window.setInterval(() => {
	draw_screen();
	// run statex(); as the game logic 
	eval("state" + state + "();");
}, 41.6667 /*div(1000, fps)*/);

/*CONTROL HANDLING*/
// KEYBOARD
document.addEventListener("keydown", (event) => {
	if(!initial_play){music.play(); initial_play = true;}
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
	layer[cursor_layer][2] = mx;
	layer[cursor_layer][3] = my;

	return false;
});
document.addEventListener("mousedown", (event) => {
	event.preventDefault();
	input[36] = true;
	return false;
});
document.addEventListener("mouseup", (event) => {
	event.preventDefault();
	input[36] = false;
	return false;
});

// left click
document.addEventListener("click", (event) => {
	if(!initial_play){music.play(); initial_play = true;}
	event.preventDefault();
	if(layer[4][0] == undefined){return false;} // exit preemptively
	// [...]
	// Add for loop that inducts through options, taking note and saving selection
    	if(state == 1){ 
		for(let t = 0; t < layer[4].length/4; t++){
			if(aabb({min_x: mx, max_x: mx, min_y: my, max_y: my}, {min_x: layer[4][(t*4)+2], max_x: layer[4][(t*4)+2] + 128, min_y: layer[4][(t*4)+3], max_y: layer[4][(t*4)+3] + 200})){ // cursor in context menu
				console.log((my - layer[4][3])/63);
				if(layer[4][0] == dropdownears){ears = 1;}
				else if(layer[4][0] == dropdowneyes){eyes = Math.ceil((my - layer[4][3])/63);}
				else{legs = Math.ceil((my - layer[4][3])/63);}

				init_state2();
				state = 2;
    			}
		}
	}
     	layer[4] = [];

	return false;
});
// right click
document.addEventListener("contextmenu", (event) => {
	if(!initial_play){music.play(); initial_play = true;}
	event.preventDefault();
	layer[4] = []; // contextmenu layer
	// [...]
	let colision = 0;
	for(let t = 3; t <= 7; t++){
		if(aabb({min_x: mx, max_x: mx, min_y: my, max_y: my}, {min_x: layer[3][(4*t)+2], max_x: layer[3][(4*t)+2] + 128, min_y: layer[3][(4*t)+3], max_y: layer[3][(4*t)+3] + 128})){ // cursor in square
			if(t == 4 || t == 6 || t == 7){
				colision = t;
				console.log(colision);
			}
			break;
		}
	}

	if(colision != 0){
		let spawnx = mx, spawny = my;
		if(my > 520){
			spawny -= 200;
		}
		if(mx > 352){
			spawnx -= 128;
		}
	    	add(dd[colision], "still", [spawnx,spawny], 4);
	}

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
		if(layer[t] == undefined){continue;}
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
		layer[L][2] = coor[0]; // X
		layer[L][3] = coor[1]; // Y
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
function addstr(str, coor, L){

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

function check_solution(pre, pos, dir, signal){/*{{{*/
  let x = pos[0], y = pos[1];
  let newdir = "D";
  let tmp = [];
  // signal is either G or R, dir dictates argument transformation
  if(grid[y] == undefined || grid[y][x] == undefined){return 0;}

  // TERMINAL CASES:
  if(grid[y][x] == "G"|| grid[y][x] == "R"){
    return grid[y][x] == signal ? 1 : 0;
  }

  // Otherwise:
  // check if path is valid
  // if not, return 0
  // if so, continue along dir, potentially spliting
  switch(grid[y][x]){ // current position
    // START
    case "0":
      return check_solution("0", transform(x,y,dir), dir, "R");
    case "1":
      return check_solution("1", transform(x,y,dir), dir, "G");

    // LINES
    case "-":
      if(pre == "|"){return 0;} // direction mismatch (Th.)
      return check_solution("-", transform(x,y,dir), dir, signal); // continue horizontally
    case "|":
      if(pre == "-"){return 0;}
      return check_solution("|", transform(x,y,dir), dir, signal);

    // TURNS
    case "]": // down,left
      if("".indexOf(pre) != -1){return 0;}
      newdir = dir == "up" ? "left" : "down";
      return check_solution("]", transform(x,y,newdir), newdir, signal);
    
    case "[": // down,right
      if("".indexOf(pre) != -1){return 0;}
      newdir = dir == "up" ? "right" : "down";
      return check_solution("[", transform(x,y,newdir), newdir, signal);

    case "(": // up,right
      if("".indexOf(pre) != -1){return 0;}
      newdir = dir == "down" ? "right" : "up";
      return check_solution("(", transform(x,y,newdir), newdir, signal);

    case ")": // up,left
      if("".indexOf(pre) != -1){return 0;}
      newdir = dir == "down" ? "left" : "up";
      return check_solution(")", transform(x,y,newdir), newdir, signal);

    // SPLITS
    case "v": // hori,down
      if(dir == "down"){return 0;}
      if(dir == "up"){ // split left/right
        return check_solution("v", transform(x,y,"right"), "right", signal) + check_solution("v", transform(x,y,"left"), "left", signal);
      }
      else{
        return check_solution("v", transform(x,y,dir), dir, signal) + check_solution("v", transform(x,y,"down"), "down", signal);
      }
    case "^": // hori,up
      if(dir == "up"){return 0;}
      if(dir == "down"){ // split left/right
        return check_solution("^", transform(x,y,"right"), "right", signal) + check_solution("^", transform(x,y,"left"), "left", signal);
      }
      else{
        return check_solution("^", transform(x,y,dir), dir, signal) + check_solution("^", transform(x,y,"up"), "up", signal);
      }
    case "<": // vert,left
      if(dir == "left"){return 0;}
      if(dir == "right"){ // split left/right
        return check_solution("<", transform(x,y,"up"), "up", signal) + check_solution("<", transform(x,y,"down"), "down", signal);
      }
      else{
        return check_solution("<", transform(x,y,dir), dir, signal) + check_solution("<", transform(x,y,"left"), "left", signal);
      }
    case ">": // vert,right
      if(dir == "right"){return 0;}
      if(dir == "left"){ // split left/right
        return check_solution(">", transform(x,y,"up"), "up", signal) + check_solution(">", transform(x,y,"down"), "down", signal);
      }
      else{
        return check_solution(">", transform(x,y,dir), dir, signal) + check_solution(">", transform(x,y,"right"), "right", signal);
      }

    // GATES
    case "!": // not
      return check_solution("!", transform(x,y,dir), dir, (signal == "R") ? "G" : "R");
    case "r": // not
      return check_solution("r", transform(x,y,dir), dir, "R");
    case "g": // not
      return check_solution("g", transform(x,y,dir), dir, "G");

    // BRIDGES
    case "H": // horizontal bridge
      if(dir == "up" || dir == "down"){return false;}
      tmp = transform(x,y,dir);
      return check_solution("H", transform(tmp[0], tmp[1], dir), dir, signal);
    case "V": // horizontal bridge
      if(dir == "left" || dir == "right"){return false;}
      tmp = transform(x,y,dir);
      return check_solution("V", transform(tmp[0], tmp[1], dir), dir, signal);

    case "_":
    case "X":
    default:
      return 0; // unrecognized or empty character
  }
  
}
function transform(x,y,dir){
  switch(dir){
    case "right":
      return [x+1,y];
    case "left":
      return [x-1,y];
    case "up":
      return [x,y-1];
    case "down":
      return [x,y+1];
	}
}
function generate_grid(in_amt, out_amt, col_amt){
  let g = [[],[],[],[]];
  let in_list = [];
  let randx;
  let randy;

  for(let t = 0; t < in_amt;){
    randx = Math.round(Math.random()*3);
    randy = Math.round(Math.random()*3);

    if(g[randy][randx] == undefined){
      g[randy][randx] = (Math.round(Math.random()) == 0) ? "0" : "1";
	in_list.push([randx, randy]);
      //[...]
      t++;
    }
  }

  for(let t = 0; t < out_amt;){
    randx = Math.round(Math.random()*3);
    randy = Math.round(Math.random()*3);

    if(g[randy][randx] == undefined){
      g[randy][randx] = (Math.round(Math.random()) == 0) ? "R" : "G";
      //[...]
      t++;
    }
  }

  for(let t = 0; t < col_amt;){
    randx = Math.round(Math.random()*3);
    randy = Math.round(Math.random()*3);

    if(g[randy][randx] == undefined){
      g[randy][randx] = "X";
      //[...]
      t++;
    }
  }

  for(let t = 0; t < 4; t++){
    for(let a = 0; a < 4; a++){
      if(g[t][a] == undefined){g[t][a] = "_";}
    }
  }

  return [g, in_list];
}
/*}}}*/
function Animation(filename, width, height, hori, vert){
	this.frame = 0;
	this.hori = hori;
	this.vert = vert;
	this.width = width/hori;
	this.height = height/vert;
	this.length = hori*vert;
	this.img = new Image();
	this.img.src = filename;
}
function sl(tag, sl){
	// search starting layer
	if(sl !== undefined && layer[sl] !== undefined){
		for(let a = 0; a < layer[sl].length; a++){
			if(layer[sl][a].anim == tag){
				return layer[sl][a];
			}
		}
	}

	// if not there, start from layer 0, skipping layer sl
	for(let t = 0; t < layer.length; t++){
		if(layer[t] == undefined){continue;}
		for(let a = 0; a < layer[t].length; a++){
			if(layer[t][a].anim == tag){
				return layer[t][a];
			}
		}	
	}
	return null;
}
/*}}}*//*}}}*/
