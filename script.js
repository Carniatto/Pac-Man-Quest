var monster_position;
var pacman_position;
var monster_mv;
var aux = true;
var pacman_dir;
var cycle = 0;
var board_provider = new Map();
WALL = '*';
PACMAN = 'P';
EMPTY = ' ';
MONSTER = '1';

$(document).keydown(function(e){
        var key = e.which;
        
        if(key == "37") pacman_dir = "l";
        else if(key == "38") pacman_dir = "u";
        else if(key == "39") pacman_dir = "r";
        else if(key == "40") pacman_dir = "d";
      }
      )
var map;
 // = [
 //                ['*', '*', '*', '*', '*'],
 //                ['*', ' ', 'P', ' ', '*'],
 //                ['*', ' ', ' ', ' ', '*'],
 //                ['*', ' ', ' ', ' ', '*'],
 //                ['*', ' ', '1', ' ', '*'],
 //                ['*', '*', '*', '*', '*']];
                
var mainloop = function() {
  //make movements
  if(pacman_dir != "undefined")
    board_provider.moveCharacter(PACMAN,pacman_dir);
  board_provider.moveCharacter(MONSTER,monster_mv[(cycle++)%monster_mv.length]);
  paint();
};

var paint = function() {
    map=board_provider.getMap();
    $(".canvas").empty();
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        if(map[i][j] == WALL) $(".canvas").append('<div class="element wall"><div class="section"></div><div class="section"></div><div class="section"></div><div class="section"></div><div class="section"></div><div class="section"></div><div class="section"></div><div class="section"></div><div class="section"></div></div>');
        else if(map[i][j] == PACMAN) {
          if(pacman_dir == "r")
            $(".canvas").append('<div class="element empty"><div class="gladiator gladiator-walk-right"/></div>');
          else if(pacman_dir == "l")
            $(".canvas").append('<div class="element empty"><div class="gladiator gladiator-walk-left"/></div>');
          else if(pacman_dir == "d")
            $(".canvas").append('<div class="element empty"><div class="gladiator gladiator-walk-down"/></div>');
          else if(pacman_dir == "u")
            $(".canvas").append('<div class="element empty"><div class="gladiator gladiator-walk-up"/></div>');
          else{
            $(".canvas").append('<div class="element empty"><div class="gladiator gladiator-steady"/></div>');
          }
        }
        else if(map[i][j] == MONSTER){
          $(".canvas").append('<div class="element"><div class="monster"/><div class="monster-eye"/></div>');
        }
        else $(".canvas").append('<div class="element empty"/>');
      }
    }
};
$(document).ready(function(e) {
  //pregame
  pacman_position = board_provider.getCharacterPosition(PACMAN);
  monster_position = board_provider.getCharacterPosition(MONSTER);
  monster_mv = board_provider.getCharacterMoves(MONSTER);
  console.log(monster_mv);

  //draw board
  paint();
  //start game
  if(typeof game_loop != "undefined") clearInterval(game_loop);
    cycle = 0;
   game_loop = setInterval(mainloop, 500);
})
