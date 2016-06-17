function leftPad(str, pad) {
    return pad.substring(0, pad.length - str.length) + str
}

function toHex(number, digits) {
    return leftPad(number.toString(16), "0".repeat(digits))
}

function Chip8() {
    this.memory = new Uint8Array(4096); // General RAM
    this.registers = new Uint8Array(8); // registers
    this.reset();
}

Chip8.prototype.reset = function() {
    this.programCounter = 0x200;
    this.indexRegister = 0;
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.indexRegister = 0;
    this.memory.fill(0);
    this.registers.fill(0)

    this.stack = [];
}

Chip8.prototype.loadProgram = function(program) { // program is Uint8array
    program.forEach((value, index, array) => {this.memory[0x200 + index] = value})
}

Chip8.prototype.debug = function() {
    console.log("V Registers: ", this.registers.map(e => toHex(e, 2)));
    console.log("Index Register:", toHex(this.indexRegister, 4));
    console.log("PC: ", toHex(this.programCounter, 3));
    console.log("Bytes at PC:", toHex((this.memory[this.programCounter] << 8) + this.memory[this.programCounter + 1], 4))
}

Chip8.prototype.debugDOM = function () {

    document.getElementById("vregs").innerHTML = "V Registers: " + this.registers.map(e=>e.toString(16)).join(" ");
    document.getElementById("pc").innerHTML = "Program Counter: " + this.programCounter.toString(16);
    document.getElementById("ireg").innerHTML = "Index Register: " + this.indexRegister.toString(16);

}

Chip8.prototype.cycle = function() {

    // read opcode
    var opcode = this.memory[this.programCounter] << 8 + this.memory[this.programCounter + 1];

    switch (opcode & 0xf000 >> 12) {
        case 0:
            console.log("memes", opcode);
            break;
        default:
            console.log("Incorrect opcode.") // this shouldn't happen when all opcodes are implemented
    }

    this.programCounter += 2; // move onto next
}

var test = new Chip8();
test.loadProgram([0xa5, 0x36]);
test.debug();
test.debugDOM();
