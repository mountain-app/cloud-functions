export const FIND_USER_BY_ID_OR_EMAIL_QUERY = `
    SELECT * FROM "User"
    WHERE id = $1 OR email = $2
`;

export const CREATE_USER_QUERY = `
    INSERT INTO "User" (id, email, name, updated_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *
`;
