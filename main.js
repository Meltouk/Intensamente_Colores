const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    parent: "juego",
    backgroundColor: "#7217c7",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        create: crear
    }
}

const game = new Phaser.Game(config)

let boton
let contador = 0
let textoContador
let textoEstado

let colores = [
    0x0000ff,
    0xff0000,
    0x00ff00,
    0xffff00,
    0xff00ff
]

let indiceColor = 0
let juegoTerminado = false

function crear() {

    boton = this.add.circle(180, 300, 100, colores[indiceColor])

    boton.setInteractive()

    this.add.text(110, 285, "Haz clic", {
        fontSize: "30px",
        color: "#ffffff"
    })

    textoContador = this.add.text(70, 10, "Clics: 0", {
        fontSize: "44px",
        color: "#ffffff"
    })

    textoEstado = this.add.text(110, 130, "", {
        fontSize: "24px",
        color: "#00e1ff"
    })

    boton.on("pointerdown", () => cambiarColor(this))
}

function cambiarColor(scene) {

    if (juegoTerminado) return

    scene.tweens.add({
        targets: boton,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 100,
        yoyo: true
    })

    contador++

    textoContador.setText("Clics: " + contador)

    indiceColor++

    if (indiceColor >= colores.length) {

        textoEstado.setText("¡Ganaste!")
        boton.disableInteractive()
        juegoTerminado = true
        return
    }

    boton.fillColor = colores[indiceColor]
}
