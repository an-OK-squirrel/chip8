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
}

Chip8.prototype.loadProgram = function(program) { // program is Uint8array
    program.forEach((value, index, array) => {this.memory[0x200 + index] = value})
}

Chip8.prototype.debug = function() {
    console.log("V Registers: ", this.registers);
    console.log("Index Register:", this.indexRegister);
    console.log("PC: ", this.programCounter);
    console.log("Bytes at PC:", this.memory[this.programCounter], this.memory[this.programCounter + 1])
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

}

var test = new Chip8();
test.loadProgram([0, 3]);
test.debug();
