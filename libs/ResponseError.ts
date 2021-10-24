export class ResponseError extends Error {
  constructor(public statusCode: number, e?: string) {
    super(e)
  }
}
