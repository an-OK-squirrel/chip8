function Chip8() {
    this.memory = new Uint8Array(4096); // General RAM
    this.registers = new Unit8Array(8); // registers
    this.programCounter = 200;
    this.indexRegister = 0;
    this.delayTimer = 0;
    this.soundTimer = 0;
}

Chip8.prototype.reset() = function() {
    this.programCounter = 200;
    this.indexRegister = 0;
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.indexRegister = 0;
    this.memory.fill(0);
    this.registers.fill(0)
}
