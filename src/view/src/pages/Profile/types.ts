export type Settings = {
    login: string | undefined;
    username: string | undefined;
    password: string | undefined;
    avatar: { file: File, fileList: File[] } | undefined;
}