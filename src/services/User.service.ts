import {query} from "../utils/db";
import IUser from "../interfaces/User.interface";

class UserService {
    async selectByLoginAndPassword(login: string, password: string): Promise<IUser> {
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE login='${login}' AND password='${password}'`);
        return user;
    }

    async add(login: string, password: string): Promise<IUser> {
        const [user]: IUser[] = await query(`INSERT INTO users (login, password) VALUES ('${login}', '${password}') RETURNING *`);
        return user;
    }
}

export default new UserService();