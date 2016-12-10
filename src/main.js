let Promise = require("bluebird");

let createCanvas = (parent,WIDTH,HEIGHT) => {
        let canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.style.width = WIDTH;
        canvas.style.height = HEIGHT;
        parent.appendChild(canvas);
        return canvas;
}

let createCTX = (canvas) => {
        let ctx = null;
        try{
            ctx = canvas.getContext("experimental-webgl");
        }catch (e){
            ex = "Exception: " + e.toString();
        }
        if (!ctx){
            alert(exmsg);
            throw new Error(ex);
        }
        return ctx;
}

let ctxDefaultInit = () => {
    let canvas = createCanvas(document.body , window.innerHeight , window.innerWidth );
    let ctx = createCTX( canvas );
    return ctx
}

let sample = (ctx,i) => {
    ctx.clearColor(1.0 -  i * 0.01, 1.0 -  i * 0.01 ,1.0 -  i * 0.01 , 1.0);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
}

let loop = Promise.coroutine(function* (condition, action, value) {
    while(!condition(value)) {
        value = yield action(value);
        yield Promise.delay(100);
    }
});

let main = (ctx) => {
    // TODO : write main
    
    loop((i) => {return 0}, (i) => {
        sample(ctx,i);
        return Promise.resolve(i+1);
    }, 0);

}

let ctx = ctxDefaultInit();
main(ctx);
