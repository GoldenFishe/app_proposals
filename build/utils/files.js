"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResourcesFolder = exports.getAttachmentPath = exports.getAvatarPath = exports.getAttachmentFile = exports.deleteAvatarFile = exports.getAvatarFile = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var resourcesPath = (0, path_1.join)(__dirname, '..', 'resources');
var avatarsPath = (0, path_1.join)(resourcesPath, 'avatars');
var attachmentsPath = (0, path_1.join)(resourcesPath, 'attachments');
function getAvatarFile(filename) {
    var avatarPath = (0, path_1.join)(avatarsPath, filename);
    try {
        (0, fs_1.accessSync)(avatarPath);
    }
    catch (e) {
        avatarPath = null;
    }
    return avatarPath;
}
exports.getAvatarFile = getAvatarFile;
function deleteAvatarFile(avatarFilename) {
    var avatarPath = (0, path_1.join)(__dirname, avatarFilename);
    (0, fs_1.rmSync)(avatarPath, { force: true });
}
exports.deleteAvatarFile = deleteAvatarFile;
function getAttachmentFile(filename) {
    var attachmentPath = (0, path_1.join)(attachmentsPath, filename);
    try {
        (0, fs_1.accessSync)(attachmentPath);
    }
    catch (e) {
        attachmentPath = null;
    }
    return attachmentPath;
}
exports.getAttachmentFile = getAttachmentFile;
function getAvatarPath(avatarFilename) {
    return "/resources/avatars/" + avatarFilename;
}
exports.getAvatarPath = getAvatarPath;
function getAttachmentPath(attachmentFilename) {
    return "/resources/attachments/" + attachmentFilename;
}
exports.getAttachmentPath = getAttachmentPath;
function createResourcesFolder() {
    [resourcesPath, avatarsPath, attachmentsPath].forEach(function (folderPath) {
        if (!(0, fs_1.existsSync)(folderPath)) {
            (0, fs_1.mkdirSync)(folderPath);
        }
    });
}
exports.createResourcesFolder = createResourcesFolder;
