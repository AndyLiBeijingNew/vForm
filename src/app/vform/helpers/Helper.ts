import {FormGroup} from '@angular/forms';
import {IVFormComponent} from '../services/IVFormComponent';
import * as _ from 'lodash';

export class Helper {
  public static formExpression(form: FormGroup, expression: string): boolean {
    if (expression) {
      try {
        return eval(expression);
      } catch (e) {
        console.log('Invalid Expression. "' + expression + '". ' + e);
      }
      return false;
    }
  }

  public static getMetadata(c: IVFormComponent) {
    const m = _.cloneDeep(c.metadata);
    m.children = [];
    _.forEach(c.children, child => {
      m.children.push(Helper.getMetadata(child));
    });
    return m;
  }
}
