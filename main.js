class Examples extends Phaser.Scene {

    constructor(){

        super();

        this.wrapRect;
        this.walkers = [];
    };

   
preload () {

    this.load.image('floor', 'assets/demoscene/checker-floor.png');
    this.load.atlas('walker', 'assets/animations/walke.png', 'assets/animations/walke.json'); 
};


create () {
 this.add.image(400, 600, 'floor').setScale(1.25).setOrigin(0.5, 1);

 // creando animación
 this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('walker', {prefix: 'Walking_', start: 0, end: 11, zeroPad: 3}),
    frameRate: 12,
    repeat: -1
 });

 // Crea 6 sprites, espaciados horizontalmente
 for (let i = 0; i < 6; i++) {
    const sprite = this.add.sprite(i * 100, 250).play('walk');
    this.walkers.push(sprite);   
 };

 // Este es nuestro 'rectángulo envolvente'
 // Cuando un sprite deje esto, se envolverá
 this.wrapRect = new Phaser.Geom.Rectangle(0, 0, 800, 600);

};
update ()
{
    //  Mueve todos los sprites hacia adelante 2 píxeles
    Phaser.Actions.IncX(this.walkers, 2);

    //  Envuelve los sprites dentro de nuestro rectángulo de envolvente, con un búfer de 200px
    Phaser.Actions.WrapInRectangle(this.walkers, this.wrapRect, 200);
};

};


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
   backgroundColor: '#000042',
    parent: 'phaser-example',
    scene: Examples

 };

 // instacia del juego 
 const game = new Phaser.Game(config);
