import {join} from "path";
import {accessSync, rmSync} from "fs";

const resourcesPath = join(__dirname, 'resources');
const avatarsPath = join(resourcesPath, 'avatars');
const attachmentsPath = join(resourcesPath, 'attachments');

export function getAvatarFile(filename: string) {
    let avatarPath: string | null = join(avatarsPath, filename);
    try {
        accessSync(avatarPath);
    } catch (e) {
        avatarPath = null;
    }
    return avatarPath;
}

export function deleteAvatarFile(avatarFilename: string) {
    let avatarPath: string | null = join(__dirname, avatarFilename);
    rmSync(avatarPath, {force: true});
}

export function getAttachmentFile(filename: string) {
    let attachmentPath: string | null = join(attachmentsPath, filename);
    try {
        accessSync(attachmentPath);
    } catch (e) {
        attachmentPath = null;
    }
    return attachmentPath;
}

export function getAvatarPath(avatarFilename: string) {
    return `/resources/avatars/${avatarFilename}`;
}

export function getAttachmentPath(attachmentFilename: string) {
    return `/resources/attachments/${attachmentFilename}`;
}