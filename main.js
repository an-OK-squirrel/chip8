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
    var opcode = (this.memory[this.programCounter] << 8) + this.memory[this.programCounter + 1];
    var x = (opcode & 0x0f00) >> 8
    var y = (opcode & 0x00f0) >> 4
    var n = [opcode & 0x000f, opcode & 0x00ff, opcode & 0x0fff]; // constants always end the opcode

    console.log(opcode, x, y)

    switch ((opcode & 0xf000) >> 12) {
        case 0:
            // TODO: Graphics opcodes
            switch opcode {
                case 0x00ee:
                    this.programCounter = this.stack.pop();
                    break;

            }
            break;

        case 1:
            this.programCounter = n[2];
            break;

        case 2:
            this.stack.push(this.programCounter);
            this.programCounter = n[2];
            break;

        case 3:
            if (this.v[x] == n[1]) {
                this.programCounter += 2;
            }
            break;

        case 4:
            if (this.v[x] != n[1]) {
                this.programCounter += 2;
            }
            break;

        case 5:
            if (this.v[x] == this.v[y]) {
                this.programCounter += 2;
            }
            break;

        case 6:
            this.v[x] = n[1];
            break;

        case 7:
            this.v[x] += n[1];
            break;

        case 8:
            switch n[0] {
                case 0: //
                    this.v[x] = this.v[y];
                    break;

                case 1:
                    this.v[x] |= this.v[y];
                    break;

                case 2:
                    this.v[x] &= this.v[y];
                    break;

                case 3:
                    this.v[x] ^= this.v[y];
                    break;

                case 4:
                    if (this.v[x] + this.v[y] > 256) {
                        this.v[15] = 1;
                    } else {
                        this.v[15] = 0
                    }

                    this.v[x] += this.v[y];
                    break;

                case 5:
                    if (this.v[x] - this.v[y] < 0) {
                        this.v[15] = 0;
                    } else {
                        this.v[15] = 1;
                    }
                    this.v[x] -= this.v[y];
                    break;

                case 6:
                    this.v[15] = this.v[x] & 1;
                    this.v[x] = this.v[x] >> 1;
                    break;

                case 7:
                    if (this.v[y] - this.v[x] < 0) {
                        this.v[15] = 0;
                    } else {
                        this.v[15] = 1;
                    }
                    this.v[x] = this.v[y] - this.v[x];
                    break;

                case 14:
                    this.v[15] = this.v[x] & 0x8000 >> 15;
                    this.v[x] = this.v[x] << 1;
                    break;

            }
            break;

        case 9:
            if (this.v[x] != this.v[y]) {
                this.programCounter += 2;
            }
            break;

        case 0xA:
            this.indexRegister = n[2];
            break;

        case 0xB:
            this.programCounter = n[2] + v[0];
            break;

        case 0xC:
            this.v[x] = (Math.random() * 4) | n[1];
            break;

        default:
            console.log("Incorrect opcode.") // this shouldn't happen when all opcodes are implemented
    }

    this.programCounter += 2; // move onto next
}

var test = new Chip8();
test.loadProgram([0x05, 0x36]);
test.debug();
test.debugDOM();
test.cycle();
