/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

export function catchErrors(fn) {
    return function (req, res, next) {
      const resp = fn(req, res, next);
      if (resp instanceof Promise) {
        return resp.catch(next);
      }
      return resp;
    };
  }
  
 
  