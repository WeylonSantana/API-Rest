import db from '../db';
import User from '../models/user.model';
import DatabaseError from '../models/errors/database.errors.model';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
    SELECT uuid, username
    FROM application_user
    `;

    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findUserByUuid(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT uuid, username
      FROM application_user
      WHERE uuid = $1
      `;

      const { rows } = await db.query<User>(query, [uuid]);
      return rows[0] || null;
    } catch (e) {
      throw new DatabaseError('Erro na consulta por ID', e);
    }
  }

  async create(user: User): Promise<String> {
    const query = `
    INSERT INTO application_user (username, password)
    VALUES ($1, crypt($2, gen_salt('bf')))
    RETURNING uuid
    `;

    const { rows } = await db.query<{ uuid: string }>(query, [user.username, user.password]);
    const [newUser] = rows;
    return newUser.uuid;
  }

  async update(user: User): Promise<void> {
    const query = `
    UPDATE application_user
    SET username = $1, password = crypt($2, gen_salt('bf'))
    WHERE uuid = $3
    `;

    await db.query(query, [user.username, user.password, user.uuid]);
  }

  async deleteUser(uuid: string): Promise<void> {
    const query = `
    DELETE FROM application_user
    WHERE uuid = $1
    `;

    await db.query(query, [uuid]);
  }
}
export default new UserRepository();
