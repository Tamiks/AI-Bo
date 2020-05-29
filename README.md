# AI-Bo Source
Source code for Ludum Dare 46 submission. An executable version of the game fit with all the necessary image files is stored in the zip file. The game source, for easy reading, has a secondary copy in the main directory.

PROJECT AI-Bo:

The main gameplay loop consists of a mix between platforming and fixing* AI-Bo as you go along, in turn fueling the battery.
While bug testing the game I set the level length to 1000 to check if the terrain culling worked with high values and never changed it back. This means that the game is beatable, but only after about an hour.

Engineering Tutorial:

Connect a wire from the single input (square) to the two outputs (circles). Signals must match. Split signal in two using the gates under the 3 key. Change the wire’s signal with the gates under the 4 key. ! swaps red to green and vice versa. Dotted outline sets signal to that color. The game checks if the amount of signals connected equals 2 so both outputs should be connected to only once. (Though this also means you can cheat the puzzles by connecting to the same output twice)

I wrote this game more or less from scratch in 72 hours for Ludum Dare 46 with the theme "Keep it alive".
The code is an absolute mess and a good amount of things got cut for time. 
The main issue when programming this game was for sprite updates I had to manually address their position in the layering system as apposed to addressing the sprite by a given name. This made the code a lot of "layer[t][(t*4)+2]" instead of something more reasonable like "terrain[t].x".

The main post-mortem take away for this game is that in programming a game under a time limit you better make sure your tooling is good. Even if you work non-stop with perfect consentration you can only get so far if your tools are fighting against you.
