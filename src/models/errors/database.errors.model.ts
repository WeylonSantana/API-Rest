class DatabaseError extends Error {
  constructor(public message: string, public error?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export default DatabaseError;
