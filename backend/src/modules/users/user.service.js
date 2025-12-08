import { db } from "../../config/db.js";

export const getAllUsersService = async () => {
    const result = await db.query(
        "SELECT id, name, email, role, created_at FROM users ORDER BY id"
    );
    return result.rows;
};
