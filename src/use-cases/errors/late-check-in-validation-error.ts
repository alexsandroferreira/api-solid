export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check in só pode ser validado em menos de 20 minutos')
  }
}
