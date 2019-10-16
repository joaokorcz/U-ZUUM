'use strict'

/* Game code goes here! */

var VALUES = {
    HUMANO_VELOCITY: 130,
    MOSQUITO_VELOCITY: 200
}

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 960, // FULL HD
        height: 720
    },
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
var game = new Phaser.Game(config)

var map
var mapLayer

var humano
var mosquito

var canhao
var canhaoMosquito
var canhaoRaquete

var boom

var chinelos
var venenos
var raquetada

var poca
var poca3
var poca2
var poca1
var pocatamp
var pocaovo
var pocaovo3
var pocaovo2
var pocaovo1

var casaP
var casaG

var barrioA
var barrioT

var arvoresG
var arvoreG

var pocasDir
var pocaDir1
var pocaDir2

var pocasN
var pocaN1
var pocaN2

var cursors
var cursors2

var aux = 0
var auxtt = 0
var auxe = 0

var bg

var vidaM = 1

var space
var shift
var ctrl

function preload() {

    this.load.spritesheet('humano', 'assets/sprite_humano.png',
        { frameWidth: 32, frameHeight: 31 });

    this.load.spritesheet('chinelo', 'assets/sprite_chinelo.png',
        { frameWidth: 32, frameHeight: 32 });

    this.load.image('veneno', 'assets/sprite_tiro.png');

    this.load.spritesheet('mosquito', 'assets/sprite_mosquito.png',
        { frameWidth: 38, frameHeight: 27 });

    this.load.image('canhao', 'assets/raquete.png');
    this.load.image('canhaoMosquito', 'assets/cannon.png');

    this.load.image('poca', 'assets/poca.png');
    this.load.image('pocatamp', 'assets/pocatamp.png');
    this.load.image('pocaovo', 'assets/pocaovo.png');

    this.load.image('bg', 'assets/zikav3.png');

    this.load.image('casaP', 'assets/casaP.png');
    this.load.image('casaG', 'assets/casaG.png');

    this.load.image('barrioA', 'assets/barrioA.png');

    this.load.image('pocaDir', 'assets/pocaDir.png');
    this.load.image('pocaN', 'assets/pocaN.png');

    this.load.image('arvoreG', 'assets/arvoreG.png');

    this.load.image('boom', 'assets/raquete.png')

    this.load.image('canhao_e', 'assets/raquete_e.png');

}

function createTileMap1() {
    map = this.make.tilemap({ key: 'mapa1' });
    map.addTilesetImage('zika_all')
    map.createLayer("pedra_baixo");
    mapLayer = map.createLayer('Camada de Tiles 1')
    arves_casas = map.createLayer("arves_casas");
    map.createLayer("obj");
    map.setCollisionBetween(157, 158, true, 'arves_casas')
    map.setCollisionBetween(188, 189, true, 'arves_casas')
    map.setCollisionBetween(143, 144, true, 'arves_casas')
    map.setCollisionBetween(174, 175, true, 'arves_casas')
    map.setCollisionBetween(205, 206, true, 'arves_casas')
    map.setCollisionBetween(272, 273, true, 'arves_casas')
    map.setCollisionBetween(303, 304, true, 'arves_casas')

    map.setCollisionBetween(600, 606, true, 'arves_casas')
    map.setCollisionBetween(631, 637, true, 'arves_casas')
    map.setCollisionBetween(662, 668, true, 'arves_casas')
    map.setCollisionBetween(693, 699, true, 'arves_casas')

    map.setCollisionBetween(639, 647, true, 'arves_casas')
    map.setCollisionBetween(670, 678, true, 'arves_casas')
    map.setCollisionBetween(701, 709, true, 'arves_casas')
    map.setCollisionBetween(732, 740, true, 'arves_casas')
    map.setCollisionBetween(763, 771, true, 'arves_casas')
    map.setCollisionBetween(794, 802, true, 'arves_casas')
    mapLayer.resizeWorld()
}

function create() {
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

    /*bg = this.add.tileSprite(
        game.renderer.width / 2, game.renderer.height / 2,
        game.renderer.width, game.renderer.height, 'bg'
    );*/

    /*poca1 = this.physics.add.sprite(250, 250, 'poca');
    poca3 = this.physics.add.sprite(390, 90, 'poca');
    poca2 = this.physics.add.sprite(780, 60, 'poca');
    poca = this.physics.add.sprite(107, 614, 'poca');*/

    bg = this.add.tileSprite(
        game.renderer.width / 2, game.renderer.height / 2,
        game.renderer.width, game.renderer.height, 'bg'
    );

    raquetada = this.physics.add.sprite(0, 0, 'canhao_e');
    raquetada.setScale(1);
    raquetada.setSize(40, 50);

    pocasDir = this.physics.add.group();

    pocaDir1 = pocasDir.create(396, 85, 'pocaDir');
    pocaDir1.setImmovable(true);
    pocaDir1.setScale(1.5)
    pocaDir2 = pocasDir.create(251, 254, 'pocaDir');
    pocaDir2.setImmovable(true);
    pocaDir2.setScale(1.5)

    pocasN = this.physics.add.group();

    pocaN1 = pocasN.create(107, 611, 'pocaN');
    pocaN1.setImmovable(true);
    pocaN1.setScale(1.5)
    pocaN2 = pocasN.create(779, 61, 'pocaN');
    pocaN2.setImmovable(true);
    pocaN2.setScale(1.5)

    barrioA = this.physics.add.sprite(72, 335, 'barrioA');
    barrioA.setImmovable(true);
    barrioA.setScale(1.5)
    barrioA = this.physics.add.sprite(480, 432, 'barrioA');
    barrioA.setImmovable(true);
    barrioA.setScale(1.5);    

    canhaoRaquete = this.physics.add.sprite(1, 1, 'canhao');
    canhaoRaquete.isShooting = false;
    canhaoRaquete.shotCounter = 3;
    canhaoRaquete.shotRate = 200;
    canhaoRaquete.setScale(1);
    canhaoRaquete.setSize(40, 50);
    canhaoRaquete.setVisible(false);

    humano = this.physics.add.sprite(game.renderer.width / 2, game.renderer.height / 2, 'humano');
    humano.hitCounterHumano = 0;
    humano.setScale(2);
    humano.setSize(humano.width - 10, humano.height);
    humano.setOffset(6, 0.87);

    canhao = this.physics.add.sprite(humano.x, humano.y, 'canhao');
    canhao.isShooting = false;
    canhao.shotCounter = 3;
    canhao.shotRate = 30;
    canhao.setScale(0.001);

    chinelos = this.physics.add.group({ maxsize: 20, defaultKey: 'chinelo' })

    //----------------------------------------------------------------------------------------------------------

    mosquito = this.physics.add.sprite(game.renderer.width / 2, game.renderer.height / 2, 'mosquito');
    mosquito.hitCounterMosquito = 0;
    mosquito.setScale(1.5);
    mosquito.setSize(mosquito.width - 10, mosquito.height - 10);
    mosquito.setOffset(4, 2);

    canhaoMosquito = this.physics.add.sprite(mosquito.x, mosquito.y, 'canhaoMosquito');
    canhaoMosquito.isShooting = false;
    canhaoMosquito.shotCounter = 3;
    canhaoMosquito.shotRate = 30;
    canhaoMosquito.setScale(0.01);

    venenos = this.physics.add.group({ maxsize: 20, defaultKey: 'veneno' })

    arvoresG = this.physics.add.group();

    arvoreG = arvoresG.create(264, 155, 'arvoreG');
    arvoreG.setImmovable(true);
    arvoreG.setScale(1.5)
    arvoreG.setSize(arvoreG.width / 2, arvoreG.height / 3 - 35);
    arvoreG.setOffset(16, 75);

    arvoreG = arvoresG.create(408, 275, 'arvoreG');
    arvoreG.setImmovable(true);
    arvoreG.setScale(1.5)
    arvoreG.setSize(arvoreG.width / 2, arvoreG.height / 3 - 35);
    arvoreG.setOffset(16, 75);

    arvoreG = arvoresG.create(216, 491, 'arvoreG');
    arvoreG.setImmovable(true);
    arvoreG.setScale(1.5)
    arvoreG.setSize(arvoreG.width / 2, arvoreG.height / 3 - 35);
    arvoreG.setOffset(16, 75);

    casaP = this.physics.add.sprite(120, 252, 'casaP');
    casaP.setImmovable(true);
    casaP.setScale(1.5)
    casaP.setSize(casaP.width - 17, casaP.height - 66);
    casaP.setOffset(0, 16);

    casaG = this.physics.add.sprite(816, 540, 'casaG');
    casaG.setImmovable(true);
    casaG.setScale(1.5)
    casaG.setSize(casaG.width - 17, casaG.height - 115);
    casaG.setOffset(0, 47);

    this.anims.create({
        key: 'humano-idle',
        frames: this.anims.generateFrameNumbers('humano'),
        frameRate: 20,
        repeat: -1
    })

    this.anims.create({
        key: 'mosquito-idle',
        frames: this.anims.generateFrameNumbers('mosquito', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
    })

    humano.anims.play('humano-idle');
    mosquito.anims.play('mosquito-idle');

    cursors = this.input.keyboard.createCursorKeys();
    cursors2 = this.input.keyboard.addKeys(
        {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }
    );

    shift.on('down', function (event) {
        canhao.isShooting = true;
    }, this)

    shift.on('up', function (event) {
        canhao.isShooting = false;
    }, this)

    ctrl.on('down', function (event) {
        canhaoRaquete.isShooting = true;
    }, this)

    ctrl.on('up', function (event) {
        canhaoRaquete.isShooting = false;
    }, this)

    //------------------------------------------------------------

    space.on('down', function (event) {
        canhaoMosquito.isShooting = true;
    }, this)

    space.on('up', function (event) {
        canhaoMosquito.isShooting = false;
    }, this)

}

function firePlayerBullet(context) {
    var rotation = Phaser.Math.Angle.BetweenPoints(canhao, mosquito);
    fireBullet(context, chinelos, canhao.x, canhao.y, canhao.rotation, 600);
}

function firePlayerBulletR(context) {
    raquetada.x = canhaoRaquete.x;
    raquetada.y = canhaoRaquete.y;
    canhaoRaquete.setTexture('canhao_e');
    auxtt = 0;
    auxe = 1;
}

//-------

function fireEnemyBullet(context, enemy) {
    var rotation = Phaser.Math.Angle.BetweenPoints(canhaoMosquito, humano);
    fireBullet(context, venenos, canhaoMosquito.x, canhaoMosquito.y, canhaoMosquito.rotation, 300)
    aux = 0;
}

function fireBullet(context, group, x, y, rotation, speed) {
    var bullet = group.get();
    if (!bullet) return;
    bullet.enableBody(true, x, y, true, true);
    bullet.rotation = rotation;
    var velocity = new Phaser.Math.Vector2();
    context.physics.velocityFromRotation(rotation, speed, velocity);
    bullet.setVelocity(velocity.x, velocity.y);
}

function updatePlayer(context) {

    if (!humano.active) {
        return
    } if (cursors.left.isDown) {
        humano.setVelocityX(-VALUES.HUMANO_VELOCITY);
        canhaoRaquete.x = humano.x - 40;
        canhaoRaquete.y = humano.y;
    } else if (cursors.right.isDown) {
        humano.setVelocityX(+VALUES.HUMANO_VELOCITY);
        canhaoRaquete.x = humano.x + 40;
        canhaoRaquete.y = humano.y;
    } else {
        humano.setVelocityX(0);
    }
    if (cursors.up.isDown) {
        humano.setVelocityY(-VALUES.HUMANO_VELOCITY)
        canhaoRaquete.x = humano.x;
        canhaoRaquete.y = humano.y - 37;
    } else if (cursors.down.isDown) {
        humano.setVelocityY(+VALUES.HUMANO_VELOCITY);
        canhaoRaquete.x = humano.x;
        canhaoRaquete.y = humano.y + 29;
    } else {
        humano.setVelocityY(0);
    }

    //---------------------------------------------------------------

    if (!mosquito.active) {
        return
    } if (cursors2.left.isDown) {
        mosquito.setVelocityX(-VALUES.MOSQUITO_VELOCITY)
    } else if (cursors2.right.isDown) {
        mosquito.setVelocityX(+VALUES.MOSQUITO_VELOCITY);
    } else {
        mosquito.setVelocityX(0);
    }
    if (cursors2.up.isDown) {
        mosquito.setVelocityY(-VALUES.MOSQUITO_VELOCITY)
    } else if (cursors2.down.isDown) {
        mosquito.setVelocityY(+VALUES.MOSQUITO_VELOCITY);
    } else {
        mosquito.setVelocityY(0);
    }

    //---------------------------------------------------------------

    canhao.x = humano.x + 2;
    canhao.y = humano.y;

    auxtt++;
    if (auxtt > 1) {
        auxe = 0;
        auxtt = 0;
        canhaoRaquete.setTexture('canhao_e');
    }

    canhaoMosquito.x = mosquito.x;
    canhaoMosquito.y = mosquito.y;

    canhao.rotation = Phaser.Math.Angle.BetweenPoints(canhao, mosquito);
    canhaoMosquito.rotation = Phaser.Math.Angle.BetweenPoints(canhaoMosquito, humano);

    canhao.shotCounter++;
    if (canhao.isShooting && canhao.shotCounter > canhao.shotRate) {
        canhao.shotCounter = 0;
        firePlayerBullet(context);
    }
    canhaoRaquete.shotCounter++;
    if (canhaoRaquete.isShooting && canhaoRaquete.shotCounter > canhaoRaquete.shotRate) {
        canhaoRaquete.shotCounter = 0;
        firePlayerBulletR(context);
    }

    //---------------------------------------

    canhaoMosquito.shotCounter++;
    if (canhaoMosquito.isShooting && canhaoMosquito.shotCounter > canhaoMosquito.shotRate) {
        canhaoMosquito.shotCounter = 0;
        fireEnemyBullet(context);
    }

}

function updateBullet(context, chinelo) {
    if (!chinelo.active) {
        return
    } if (!Phaser.Geom.Rectangle.Overlaps(context.physics.world.bounds, chinelo.getBounds())) {
        chinelo.disableBody(true, true);
    }
}

function updateVeneno(context, veneno) {
    if (!veneno.active) {
        return
    } if (!Phaser.Geom.Rectangle.Overlaps(context.physics.world.bounds, veneno.getBounds())) {
        veneno.disableBody(true, true);
    }
}


function updateDesovar(context) {
    if (vidaM < 2 && aux != 1) {
        vidaM++;
        console.log("vida mosquito: ", vidaM)
    }
    pocaovo1 = this.physics.add.sprite(250, 250, 'pocaovo');
    pocaovo2 = this.physics.add.sprite(390, 90, 'pocaovo');
    pocaovo3 = this.physics.add.sprite(780, 60, 'pocaovo');
    pocaovo = this.physics.add.sprite(107, 614, 'pocaovo');
}

function updateTampar(context, veneno) {
    if (!veneno.active) {
        return
    } if (!Phaser.Geom.Rectangle.Overlaps(context.physics.world.bounds, veneno.getBounds())) {
        veneno.disableBody(true, true);
    }
}

function hitHumano(humano, other) {
    humano.disableBody(true, true);
    canhao.disableBody(true, true);
    console.log("winner: Mosquito")
}

function hitMosquito(mosquito, other) {
    if (vidaM == 1) {
        mosquito.disableBody(true, true);
        canhaoMosquito.disableBody(true, true);
        console.log("winner: Humano")
    } else {
        vidaM--;
        console.log("vida mosquito: ", vidaM)
        aux = 1;
        mosquito.x = 250
        mosquito.y = 250
    }
}

function update() {

    mosquito.setCollideWorldBounds();
    humano.setCollideWorldBounds();

    updatePlayer(this);
    if (auxe == 1) {
        raquetada.x = canhaoRaquete.x;
        raquetada.y = canhaoRaquete.y;
    } else if (auxe==0){
    }

    for (var chinelo of chinelos.getChildren()) {
        updateBullet(this, chinelo)
    }
    for (var veneno of venenos.getChildren()) {
        updateBullet(this, veneno)
    }

    this.physics.world.collide(humano, casaP);
    this.physics.world.collide(humano, casaG);
    this.physics.world.collide(humano, arvoresG);


    this.physics.world.overlap(mosquito, raquetada, hitMosquito, null, this);

    this.physics.world.overlap(humano, veneno, hitHumano, null, this);
    this.physics.world.overlap(mosquito, chinelo, hitMosquito, null, this);
    this.physics.world.overlap(mosquito, poca, updateDesovar, null, this);
    this.physics.world.overlap(mosquito, poca1, updateDesovar, null, this);
    this.physics.world.overlap(mosquito, poca2, updateDesovar, null, this);
    this.physics.world.overlap(mosquito, poca3, updateDesovar, null, this);

}