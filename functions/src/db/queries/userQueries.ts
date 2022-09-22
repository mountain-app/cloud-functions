export const FIND_USER_BY_ID_OR_EMAIL = `
    SELECT * FROM "User" WHERE id = $1 OR email = $2
`;

export const SAVE_USER = `
    INSERT INTO "User" (
        id, email, first_name, last_name, birthday, gender, updated_at
    ) VALUES (
        $1, $2, $3, $4, $5, $6, NOW()
    ) RETURNING *
`;
