import {FormGroup} from '@angular/forms';
import {IVFormComponent} from '../services/IVFormComponent';
import * as _ from 'lodash';
import {isUndefined} from 'util';

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

  public static setProperty(o: object, key: string, value: any, onlyIfExists?: boolean) {
    if (!onlyIfExists) {
      o[key] = value;
    } else if (!isUndefined(o[key])) {
      o[key] = value;
    }
  }

  public static setBordersValues(e: Event, metadataProperties: any,
                   borders: { borderTop?: string; borderRight?: string; borderBottom?: string; borderLeft?: string }) {
    if (!isUndefined(borders.borderTop)) {
      Helper.setProperty(metadataProperties, 'borderTop', borders.borderTop, true);
    }
    if (!isUndefined(borders.borderRight)) {
      Helper.setProperty(metadataProperties, 'borderRight', borders.borderRight, true);
    }
    if (!isUndefined(borders.borderBottom)) {
      Helper.setProperty(metadataProperties, 'borderBottom', borders.borderBottom, true);
    }
    if (!isUndefined(borders.borderLeft)) {
      Helper.setProperty(metadataProperties, 'borderLeft', borders.borderLeft, true);
    }
    if (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }
}
