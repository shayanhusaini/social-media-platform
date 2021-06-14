export class GeneralError extends Error {
    code = 500;
    constructor(message) {
      super();
      this.message = message;
    }
  }

  export class BadRequest extends GeneralError { 
    code = 400;
  }
  export class NotFound extends GeneralError { 
    code = 404;
  }