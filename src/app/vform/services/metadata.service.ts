import { Injectable } from '@angular/core';
import {VFormComponent} from './VFormComponent';
import {LayoutComponent} from '../components/layout/layout.component';
import * as _ from 'lodash';
import {Kv} from './Kv';

@Injectable()
export class MetadataService {

  _components: VFormComponent[] = [
    new VFormComponent('Layout', 'Divides the forms into rows and columns.', 'LayoutComponent',
      { width: '100%', height: 'auto', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap' }),
    new VFormComponent('Text Field', 'Text input.', 'InputComponent',
      {type: 'text', maxlength: 20, autocomplete: true, inputClass: 'form-control', lineHeight: '1.2em', size: '25', required: false,
        containerClass: 'form-group', placeholder: 'Placeholder text.', showLabel: 'true', label: 'Label text',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%' }),
    new VFormComponent('Password Field', 'Password input.', 'InputComponent',
      {type: 'password', maxlength: 20, autocomplete: true, inputClass: 'form-control', lineHeight: '1.2em', size: '25', required: false,
        containerClass: 'form-group', placeholder: 'Password', showLabel: 'true', label: 'Label text',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%' })
  ];
  constructor() { }

  public components(): VFormComponent[] {
    return _.cloneDeep(this._components);
  }

  public getComponent(name: string): VFormComponent {
     const filtered = _.filter(this._components, i => i.name === name);
     return filtered.length ? _.cloneDeep(filtered[0]) : null;
  }
}
