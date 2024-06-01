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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowroomRepo = void 0;
const OpeningTime_1 = require("../../model/Warehouse/Showroom/OpeningTime");
const Showroom_1 = require("../../model/Warehouse/Showroom/Showroom");
const ShowroomImages_1 = require("../../model/Warehouse/Showroom/ShowroomImages");
const Images_1 = require("../../model/Common/Images");
class ShowroomRepo {
    create(showroom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdShowroom = yield Showroom_1.Showroom.create({
                    name: showroom.name,
                    address: showroom.address,
                    googleLocation: showroom.googleLocation,
                    contactNo: showroom.contactNo,
                    description: showroom.description,
                    isLive: showroom.isLive,
                });
                const imgList = showroom.imageList;
                imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const img = yield Images_1.Image.create({
                        imageName: element.imageName,
                        imageData: element.imageData,
                        imageURL: element.imageURL,
                        imagelocation: element.imagelocation,
                        imageDescription: element.imageDescription,
                    });
                    const showroomImages = yield ShowroomImages_1.ShowroomImages.create({
                        showroomId: createdShowroom.id,
                        imageId: img.id,
                    });
                }));
                const timeList = showroom.timeList;
                timeList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const time = yield OpeningTime_1.OpenTime.create({
                        showroomId: createdShowroom.id,
                        day: element.day,
                        isOpen: element.isOpen,
                        openFrom: element.openFrom,
                        openTo: element.openTo
                    });
                }));
            }
            catch (err) {
                const result = yield Showroom_1.Showroom.findOne({ where: { name: showroom.name } });
                if (result) {
                    throw new Error("Failed to create Showroom! Showroom with this name already exists!");
                }
                throw new Error("Failed to create Showroom! | " + err.message);
            }
        });
    }
    update(showroom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Showroom_1.Showroom.findOne({ where: { id: showroom.id } });
                if (!result) {
                    return false;
                }
                result.name = showroom.name;
                result.address = showroom.address;
                result.googleLocation = showroom.googleLocation;
                result.contactNo = showroom.contactNo;
                result.description = showroom.description;
                result.isLive = showroom.isLive;
                yield result.save();
                const wimgList = yield ShowroomImages_1.ShowroomImages.findAll({ where: { showroomId: showroom.id } });
                yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                    yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                })));
                yield ShowroomImages_1.ShowroomImages.destroy({ where: { showroomId: showroom.id } });
                yield OpeningTime_1.OpenTime.destroy({ where: { showroomId: showroom.id } });
                const imgList = showroom.imageList;
                imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const img = yield Images_1.Image.create({
                        imageName: element.imageName,
                        imageData: element.imageData,
                        imageURL: element.imageURL,
                        imagelocation: element.imagelocation,
                        imageDescription: element.imageDescription,
                    });
                    const showroomImages = yield ShowroomImages_1.ShowroomImages.create({
                        showroomId: showroom.id,
                        imageId: img.id,
                    });
                }));
                const timeList = showroom.timeList;
                timeList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const time = yield OpeningTime_1.OpenTime.create({
                        showroomId: showroom.id,
                        day: element.day,
                        isOpen: element.isOpen,
                        openFrom: element.openFrom,
                        openTo: element.openTo
                    });
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Showroom! | " + err.message);
            }
        });
    }
    delete(showroomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Showroom_1.Showroom.findAll({ where: { id: showroomId } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = yield ShowroomImages_1.ShowroomImages.findAll({ where: { showroomId: element.id } });
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                    })));
                    yield ShowroomImages_1.ShowroomImages.destroy({ where: { showroomId: element.id } });
                })));
                yield Showroom_1.Showroom.destroy({ where: { id: showroomId } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Showroom! | " + err.message);
            }
        });
    }
    getById(showroomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Showroom_1.Showroom.findAll({ where: { id: showroomId } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = yield ShowroomImages_1.ShowroomImages.findAll({ where: { showroomId: element.id } });
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: imgElement.imageId } });
                        imgList.push(img);
                    })));
                    const tmList = yield OpeningTime_1.OpenTime.findAll({ where: { showroomId: element.id } });
                    const showroomTemp = {
                        id: element.id,
                        name: element.name,
                        address: element.address,
                        contactNo: element.contactNo,
                        googleLocation: element.googleLocation,
                        description: element.description,
                        imageList: imgList,
                        timeList: tmList,
                        isLive: element.isLive,
                        createdAt: element.createdAt,
                        updatedAt: element.updatedAt,
                    };
                    Wlist.push(showroomTemp);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Showroom! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Showroom_1.Showroom.findAll();
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = yield ShowroomImages_1.ShowroomImages.findAll({ where: { showroomId: element.id } });
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = yield Images_1.Image.findOne({ where: { id: imgElement.imageId } });
                        imgList.push(img);
                    })));
                    const tmList = yield OpeningTime_1.OpenTime.findAll({ where: { showroomId: element.id } });
                    const showroomTemp = {
                        id: element.id,
                        name: element.name,
                        address: element.address,
                        contactNo: element.contactNo,
                        googleLocation: element.googleLocation,
                        description: element.description,
                        imageList: imgList,
                        timeList: tmList,
                        isLive: element.isLive,
                        createdAt: element.createdAt,
                        updatedAt: element.updatedAt,
                    };
                    Wlist.push(showroomTemp);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Showroom! | " + err.message);
            }
        });
    }
}
exports.ShowroomRepo = ShowroomRepo;
