import {FormControl, FormGroup} from '@angular/forms';
import {Compiler} from '@angular/core';
export function expressionValidator(formInstance: FormGroup, expression: string, message: string) {
  return (c: FormControl) => {
    let errorObj: any = null;
    if (expression && message) {
      const f = (form, control) => {
        let result = false;
        try {
          result = eval(expression);
        } catch (e) {
          console.log('Invalid ExpressionValidator for control.' + e);
        }
        if (! result) {
          return {'vform-error': message};
        }
        return null;
      };
      errorObj = f(formInstance, c);
    }
    return errorObj;
  };
}
