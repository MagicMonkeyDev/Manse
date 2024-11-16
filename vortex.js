class Renderer {
    #vertexSrc = "#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}"
    #vertices = [-1, 1, -1, -1, 1, 1, 1, -1]
    
    constructor(canvas, scale) {
        this.canvas = canvas
        this.scale = scale
        this.gl = canvas.getContext("webgl2")
        this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
        this.mouseCoords = [0, 0]
        this.pointerCoords = [0, 0]
        this.nbrOfPointers = 0
    }

    // ... rest of the Renderer class implementation ...
    // (Copy all the methods from the original code)
}

function initVortex() {
    let renderer, canvas
    const dpr = Math.max(1, devicePixelRatio)
    
    const resize = () => {
        const { innerWidth: width, innerHeight: height } = window
        canvas.width = width * dpr
        canvas.height = height * dpr
        if (renderer) {
            renderer.updateScale(dpr)
        }
    }

    const source = document.querySelector("#fragmentShader").textContent
    canvas = document.querySelector("#vortexCanvas")
    
    renderer = new Renderer(canvas, dpr)
    renderer.setup()
    renderer.init()
    resize()
    
    if (renderer.test(source) === null) {
        renderer.updateShader(source)
    }
    
    window.addEventListener('resize', resize)
    
    const loop = (now) => {
        renderer.render(now)
        requestAnimationFrame(loop)
    }
    
    loop(0)
} 