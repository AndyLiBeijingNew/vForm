import {VFormMetadata} from '../services/VFormMetadata';
import {MetadataService} from '../services/metadata.service';
import * as _ from 'lodash';
import {ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef} from '@angular/core';
import {IVFormComponent} from '../services/IVFormComponent';
import {IVFormContainerComponent} from '../services/IVFormContainerComponent';
import {FormGroup} from '@angular/forms';
import { InputFieldBase } from "../components/input-field/InputFieldBase";
import {FormComponent} from '../components/form/form.component';
import { IListItemIndex } from "../components/IListItemIndex";
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
}
