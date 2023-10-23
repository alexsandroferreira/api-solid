export class InvalidCredentialsError extends Error {
  constructor() {
    super('Usuário não autorizado')
  }
}
