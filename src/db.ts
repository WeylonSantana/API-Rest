import { Pool } from 'pg';

const connectionString = 'postgres://ugfgzfbx:hYnXsmgddkH2rYdFytyvWv1TYe0c4Prj@kesavan.db.elephantsql.com/ugfgzfbx';
const db = new Pool({ connectionString });
export default db;
