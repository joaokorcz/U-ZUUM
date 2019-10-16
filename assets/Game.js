'use strict'

/* Código do jogo vai aqui! */
var bgSky
var bgMountain
var map
var mapLayer
var player_cadeirante
var player_manco
var player_esquizofrenico
var player_anao
var coins   // grupo das moedas (items/pickup)
var droids  // grupo dos inimigos
var rato
var botao
var bandeira
var hud // mostradores do jogo
var eventos = true
var win = 0
var audio1

const config = {}
config.GRAVITY = 1500
config.PLAYER_VELOCITY = 200
config.PLAYER_FALL_VELOCITY = 400
config.PLAYER_JUMP_VELOCITY = 500
config.PLAYER_ANAO_JUMP_VELOCITY = 300

config.PLAYER_DOUBLE_JUMP_VELOCITY = 600
config.PLAYER_ANAO_DOUBLE_JUMP_VELOCITY = 400

config.PLAYER_LIVES = 3
config.LEVEL = 1
var game = new Phaser.Game(
    800, 480, Phaser.CANVAS, null, {
        preload: preload,
        create: create,
        update: update,
        render: render
    })

function preload() { 

    game.load.image('zika_all', 'assets/zika_all.png')
    game.load.tilemap('mapa1', 'assets/zikav3_FINAL.json',
        null, Phaser.Tilemap.TILED_JSON) 
    
}

function create() {     

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.fullScreenScaleMode = 
        Phaser.ScaleManager.EXACT_FIT
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = config.GRAVITY

    createTileMap1()

    createHud()
}





function createTileMap1() {
    map = game.add.tilemap('mapa1')
    map.addTilesetImage('zika_all')
    map.createLayer("pedra_baixo");
    mapLayer = map.createLayer('Camada de Tiles 1')
    map.createLayer("arves_casas");
    map.createLayer("obj");  
    mapLayer.resizeWorld()
}




function update(){

}

function render(){

}









    


