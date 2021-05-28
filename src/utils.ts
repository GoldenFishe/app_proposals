import {accessSync, rmSync} from 'fs';
import {join} from "path";

export default class Utils {
    static getAvatarFile(filename: string) {
        let avatarPath: string | null = join(Utils.avatarsPath, filename);
        try {
            accessSync(avatarPath);
        } catch (e) {
            avatarPath = null;
        }
        return avatarPath;
    }

    static deleteAvatarFile(avatarFilename: string) {
        let avatarPath: string | null = join(__dirname, avatarFilename);
        rmSync(avatarPath, {force: true});
    }

    static getAttachmentFile(filename: string) {
        let attachmentPath: string | null = join(Utils.attachmentsPath, filename);
        try {
            accessSync(attachmentPath);
        } catch (e) {
            attachmentPath = null;
        }
        return attachmentPath;
    }

    static getAvatarPath(avatarFilename: string) {
        return `/resources/avatars/${avatarFilename}`;
    }

    static getAttachmentPath(attachmentFilename: string) {
        return `/resources/attachments/${attachmentFilename}`;
    }

    static get resourcesPath() {
        return join(__dirname, 'resources')
    }

    static get avatarsPath() {
        return join(Utils.resourcesPath, 'avatars')
    }

    static get attachmentsPath() {
        return join(Utils.resourcesPath, 'attachments')
    }
}