"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
function resize(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filename: image } = photo;
        const newName = bcrypt.hashSync(image.split('.')[0].toString() + '.png');
        yield sharp(photo.path)
            .resize(200)
            .png({ quality: 30 })
            .toFile(path.resolve(photo.destination, 'resized', newName));
        fs.unlinkSync(photo.path);
        return newName;
    });
}
process.on('message', (photo) => __awaiter(void 0, void 0, void 0, function* () {
    process.send(yield resize(photo));
}));
