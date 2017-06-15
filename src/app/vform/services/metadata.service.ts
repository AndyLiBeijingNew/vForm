import { Injectable } from '@angular/core';
import {VFormComponent} from './VFormMetadata';
import {LayoutComponent} from '../components/layout/layout.component';
import * as _ from 'lodash';
import {Kv} from './Kv';

@Injectable()
export class MetadataService {

  _components: VFormComponent[] = [
    new VFormComponent('2 Column layout', 'Divides the form into 2 columns.', 'LayoutComponent',
      { width: '100%', height: '100%', border: '0px', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row', flexGrow: 0 }, [
        new VFormComponent('Layout', '', 'LayoutComponent',
          { width: '50%', height: '100%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 0 }),
        new VFormComponent('Layout', '', 'LayoutComponent',
          { width: '50%', height: '100%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 0 })
      ]),
    new VFormComponent('2 Row layout', 'Divides the form into 2 rows.', 'LayoutComponent',
      { width: '100%', height: '100%%', border: '0px', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'column', flexGrow: 0 }, [
        new VFormComponent('Layout', '', 'LayoutComponent',
          { width: '100%', height: '50%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 0 }),
        new VFormComponent('Layout', '', 'LayoutComponent',
          { width: '100%', height: '50%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 0 })
      ]),
    new VFormComponent('Layout', 'Divides the form into rows and columns.', 'LayoutComponent',
      { width: '50%', height: '50%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 1 }),
    new VFormComponent('Text Field', 'Text input.', 'InputComponent',
      {type: 'text', maxlength: 20, autocomplete: true, inputClass: 'form-control', lineHeight: '1.2em', size: '25', required: false,
        containerClass: 'form-group', placeholder: 'Placeholder text.', showLabel: 'true', label: 'Label text',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'Text'}),
    new VFormComponent('Password Field', 'Password input.', 'InputComponent',
      {type: 'password', maxlength: 20, autocomplete: false, inputClass: 'form-control', lineHeight: '1.2em', size: '25', required: false,
        containerClass: 'form-group', placeholder: 'Password', showLabel: 'true', label: 'Label text',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'password' }),
    new VFormComponent('Number Field', 'Number input.', 'InputComponent',
      {type: 'number', inputClass: 'form-control', lineHeight: '1.2em', size: '20', required: false,
        containerClass: 'form-group', placeholder: '#', showLabel: 'true', label: 'Label text',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'number' }),
    new VFormComponent('HTML', 'Custom HTML.', 'HtmlComponent', {html: ''})
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
