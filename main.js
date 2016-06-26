function debugDOM() {

    // since map keeps the TypeArray, take this really crappy workaround!
    document.getElementById("vregs").innerHTML = "V Registers: " + this.v.join(" ").split(" ").map(e => toHex(parseInt(e, 10), 2)).join(" ");
    document.getElementById("pc").innerHTML = "Program Counter: " + this.programCounter.toString(16);
    document.getElementById("ireg").innerHTML = "Index Register: " + this.indexRegister.toString(16);
    document.getElementById("dt").innerHTML = "Delay Timer: " + this.delayTimer;
    document.getElementById("st").innerHTML = "Sound Timer: " + this.soundTimer;

}

var chip8 = new Worker("chip8.js");

chip8.onmessage = function(e) {
    console.log('Message received from main script');
    console.log(e.data)
}

chip8.postMessage(["startLoop"]);
chip8.postMessage(["debug"]);
