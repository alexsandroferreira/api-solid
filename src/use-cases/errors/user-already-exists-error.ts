export class UserAlereadyExistsError extends Error {
  constructor() {
    super('Este email já existe.')
  }
}
