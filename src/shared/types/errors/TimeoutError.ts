export class TimeoutError extends Error {
  constructor(props) {
    super(props);
    this.name = 'TimeoutError'
  }
}