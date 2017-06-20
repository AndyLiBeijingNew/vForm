import { Injectable } from '@angular/core';
import {VFormMetadata} from './VFormMetadata';
import {LayoutComponent} from '../components/layout/layout.component';
import * as _ from 'lodash';
import {Kv} from './Kv';

@Injectable()
export class MetadataService {

  _components: VFormMetadata[] = [
    new VFormMetadata('2 Column layout', 'Divides the form into 2 columns.', 'LayoutComponent',
      { width: '100%', height: '100%', border: '0px', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row', flexGrow: 1 }, [
        new VFormMetadata('Layout', '', 'LayoutComponent',
          { width: '50%', height: '100%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 1 }),
        new VFormMetadata('Layout', '', 'LayoutComponent',
          { width: '50%', height: '100%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 1 })
      ]),
    new VFormMetadata('2 Row layout', 'Divides the form into 2 rows.', 'LayoutComponent',
      { width: '100%', height: '100%', border: '0px', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'column', flexGrow: 1 }, [
        new VFormMetadata('Layout', '', 'LayoutComponent',
          { width: '100%', height: '50%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 1 }),
        new VFormMetadata('Layout', '', 'LayoutComponent',
          { width: '100%', height: '50%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
            alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 1 })
      ]),
    new VFormMetadata('Layout', 'Divides the form into rows and columns.', 'LayoutComponent',
      { width: '50%', height: '50%', border: '1px solid lightgray', class: '', padding: '0 0 0 0',
        alignItems: 'center', justifyContent: 'center', borderCollapse: '', flexFlow: 'row wrap', flexGrow: 1 }),
    new VFormMetadata('Text Field', 'Text input.', 'InputComponent',
      {type: 'text', maxlength: 20, autocomplete: true, lineHeight: '1.2em', size: '25', required: false,
        containerClass: '', placeholder: 'Placeholder text.',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'Text',
        vformValidatorMessage: 'Validation error.', vformValidatorExpression: ''}),
    new VFormMetadata('Password Field', 'Password input.', 'InputComponent',
      {type: 'password', maxlength: 20, autocomplete: false,size: '25', required: false,
        containerClass: '', placeholder: 'Password',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'password' }),
    new VFormMetadata('Number Field', 'Number input.', 'InputComponent',
      {type: 'number', size: '20', required: false,
        containerClass: ' ', placeholder: 'Number',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'number' }),
    new VFormMetadata('HTML', 'Custom HTML.', 'HtmlComponent', {html: ''}),
    new VFormMetadata('Image', 'Image.', 'ImagePreviewComponent', {width: '206px', height: '265px', backgroundColor: 'lightgray', name: 'Image'}),
    new VFormMetadata('Breast Board', '.', 'BreastBoardComponent', {border: '1px dashed lightgray', name: 'BreastBoard', type: 'hidden'})
  ];
  constructor() { }

  public components(): VFormMetadata[] {
    return _.cloneDeep(this._components);
  }

  public getComponent(name: string): VFormMetadata {
     const filtered = _.filter(this._components, i => i.name === name);
     return filtered.length ? _.cloneDeep(filtered[0]) : null;
  }
}
