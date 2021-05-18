import {accessSync} from 'fs';
import {join} from "path";

export default class Utils {
    static getAvatar(userId: number) {
        let avatarPath: string | null = join(Utils.avatarsPath, `avatar_${userId}`);
        try {
            accessSync(avatarPath);
        } catch (e) {
            avatarPath = null;
        }
        return avatarPath;
    }

    static get resourcesPath() {
        return join(__dirname, 'resources')
    }

    static get avatarsPath() {
        return join(Utils.resourcesPath, 'avatars')
    }
}