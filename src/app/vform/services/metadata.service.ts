import {Injectable} from '@angular/core';
import {VFormMetadata} from './VFormMetadata';
import {LayoutComponent} from '../components/layout/layout.component';
import * as _ from 'lodash';

@Injectable()
export class MetadataService {

  _components: VFormMetadata[] = [
     new VFormMetadata('2 Column layout', 'Divides the form into 2 columns.', 'LayoutComponent',
      {
        width: '100%', height: '100%', class: 'vform-default', padding: '0 0 0 0',
        alignItems: '', justifyContent: '', flexFlow: 'rows', flexGrow: 1, hidden: false, display: 'flex'
      }, [
        new VFormMetadata('Layout', '', 'LayoutComponent',
          {
            width: '50%', height: '100%',
            borderTop: '1px solid lightgray', borderRight: '0px solid lightgray',
            borderBottom: '1px solid lightgray', borderLeft: '1px solid lightgray',
            class: '', padding: '0 0 0 0',
            alignItems: '', justifyContent: '', flexFlow: 'rows wrap', flexGrow: 1, display: 'flex'
          }),
        new VFormMetadata('Layout', '', 'LayoutComponent',
          {
            width: '50%', height: '100%',
            borderTop: '1px solid lightgray', borderRight: '1px solid lightgray',
            borderBottom: '1px solid lightgray', borderLeft: '1px solid lightgray',
            class: '', padding: '0 0 0 0',
            alignItems: '', justifyContent: '', flexFlow: 'rows wrap', flexGrow: 1, display: 'flex'
          })
      ]),
    new VFormMetadata('2 Row layout', 'Divides the form into 2 rows.', 'LayoutComponent',
      {
        width: '100%',
        height: '100%',
        class: 'vform-default',
        padding: '0 0 0 0',
        alignItems: '',
        justifyContent: '',
        alignSelf: '',
        flexFlow: 'column',
        flexGrow: 1,
        hidden: false,
        display: 'flex'
      }, [
        new VFormMetadata('Layout', '', 'LayoutComponent',
          {
            width: '100%', height: '50%',
            borderTop: '1px solid lightgray', borderRight: '1px solid lightgray',
            borderBottom: '0px solid lightgray', borderLeft: '1px solid lightgray',
            class: '', padding: '0 0 0 0',
            alignItems: '', justifyContent: '', alignSelf: '', flexFlow: 'rows wrap', flexGrow: 1, hidden: false,
            display: 'flex'
          }),
        new VFormMetadata('Layout', '', 'LayoutComponent',
          {
            width: '100%', height: '50%',
            borderTop: '1px solid lightgray', borderRight: '1px solid lightgray',
            borderBottom: '1px solid lightgray', borderLeft: '1px solid lightgray',
            class: '', padding: '0 0 0 0',
            alignItems: '', justifyContent: '', alignSelf: '', flexFlow: 'rows wrap', flexGrow: 1, hidden: false,
            display: 'flex'
          })
      ]),
    new VFormMetadata('Layout', 'Divides the form into rows and columns.', 'LayoutComponent',
      {
        width: '50%', height: '50%',
        borderTop: '1px solid lightgray', borderRight: '1px solid lightgray',
        borderBottom: '1px solid lightgray', borderLeft: '1px solid lightgray',
        class: 'vform-default', padding: '0 0 0 0',
        alignItems: '', justifyContent: '', alignSelf: '', flexFlow: 'rows wrap', flexGrow: 1, hidden: false,
        display: 'flex'
      }),
    new VFormMetadata('Text Field', 'Text input.', 'InputComponent',
      {
        type: 'text', maxlength: 20, autocomplete: true, lineHeight: '1.2em', size: '25', required: false,
        containerClass: '', placeholder: 'Placeholder text.',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: '请输入唯一标识',
        vformValidatorMessage: 'Validation error.', vformValidatorExpression: ''
      }),
    new VFormMetadata('Password Field', 'Password input.', 'InputComponent',
      {
        type: 'password', maxlength: 20, autocomplete: false, size: '25', required: false,
        containerClass: '', placeholder: 'Password',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: '请输入唯一标识'
      }),
    new VFormMetadata('Number Field', 'Number input.', 'InputComponent',
      {
        type: 'number', size: '20', required: false,
        containerClass: ' ', placeholder: 'Number',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: '请输入唯一标识'
      }),
    new VFormMetadata('Date Field', 'Date input.', 'InputComponent',
      {
        type: 'date', size: '20', required: false,
        containerClass: ' ', placeholder: 'Number',
        containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: '请输入唯一标识'
      }),
    new VFormMetadata('HTML', 'Custom HTML.', 'HtmlComponent', {html: ''}),
    new VFormMetadata('Image', 'Image.', 'ImagePreviewComponent', {
      width: '206px',
      height: '265px',
      backgroundColor: 'lightgray',
      name: 'Image'
    }),
    new VFormMetadata('Select', 'Select from a list of options', 'SelectComponent', {tag: '',
      name: '请输入唯一标识', placeholder: 'Select an option', required: false, containerClass: '',
      containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%',
      options: '[{"name":"Option 1 Display","value":1},{"name":"Option 2 Display","value":2}]'
    }),
    new VFormMetadata('Radio', 'Select one option from a list of options', 'RadioComponent', {
      name: '请输入唯一标识', labelText: 'Select an option', required: false, containerClass: '',
      containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%',
      options: '[{"name":"Option 1 Display","value":1},{"name":"Option 2 Display","value":2}]'
    }),
    new VFormMetadata('Checkbox', 'Check box', 'CheckboxComponent',
    {
      height: '60px', 'text': '复选框', name: '请输入唯一标识'
    })
    ,
    new VFormMetadata('Submit Button', 'Submit the form', 'SubmitBtnComponent',
    {
      width: '150px', height: '60px', 'text': '提交'

    }),
    new VFormMetadata('Table', 'Insert a table', 'TableComponent', {
      name: 'table', containerClass: '',
      padding: '0 5px 0 5px', height: 'auto', width: '100%',
      tablePadding: '0 0 0 20px', tableName: 'TableName', showActions: true,
      showAddRowControl: true, automaticallyAddRow: true,
      columns: [{
        label: 'Column 1', class: '', width: '45%', metadata: new VFormMetadata('', '', 'InputComponent',
          {
            type: 'text', maxlength: 20, autocomplete: true, lineHeight: '1.2em', size: '25', required: false,
            containerClass: '', placeholder: 'Placeholder text.',
            containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'Column1'
          })
      }, {label: 'Column 2',  class: '', width: '45%', metadata: new VFormMetadata('', '', 'InputComponent',
        {
          type: 'text', maxlength: 20, autocomplete: true, lineHeight: '1.2em', size: '20', required: false,
          containerClass: '', placeholder: 'Placeholder text.',
          containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'Column2'
        })}]
    }),
    new VFormMetadata('E-signature', '.', 'ESignComponent', {
      border: '1px dashed lightgray', name: 'esignature',
      heading: 'e-sign form', dialogClass: '',
      dialogUsernameLabel: 'Username', dialogPasswordLabel: 'Password'
    }),
    new VFormMetadata('Treatment Progress', '', 'TreatmentProgressComponent', {}),
    new VFormMetadata('Label', '', 'LabelComponent', {name: 'LabelChangeMe'}),
    new VFormMetadata('Repeater', '', 'RepeaterComponent', {
      name: 'RepeaterChangeMe', containerClass: '',
      padding: '0 5px 0 5px', height: 'auto', width: '100%',
      tablePadding: '0 0 0 20px', tableName: 'TableName', showActions: true,
      showAddRowControl: true, automaticallyAddRow: true, showRepeatButton: true,
      flexFlow: 'row wrap',
      metadataTemplate: new VFormMetadata('Table', 'Insert a table', 'TableComponent', {
        name: 'table', containerClass: '', dynamicWidth: '100%', dynamicHeight: '100%',
        padding: '0 5px 0 5px', height: 'auto', width: '100%',
        tablePadding: '0 0 0 20px', tableName: 'TableName', showActions: true,
        showAddRowControl: true, automaticallyAddRow: true,
        columns: [{
          label: 'Column 1', class: '', width: '45%', metadata: new VFormMetadata('', '', 'InputComponent',
            {
              type: 'text', maxlength: 20, autocomplete: true, lineHeight: '1.2em', size: '25', required: false,
              containerClass: '', placeholder: 'Placeholder text.',
              containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'Column1'
            })
        }, {label: 'Column 2',  class: '', width: '45%', metadata: new VFormMetadata('', '', 'InputComponent',
          {
            type: 'text', maxlength: 20, autocomplete: true, lineHeight: '1.2em', size: '20', required: false,
            containerClass: '', placeholder: 'Placeholder text.',
            containerPadding: '0 5px 0 5px', containerHeight: 'auto', containerWidth: '100%', name: 'Column2'
          })}]
      })
    })
  ];

  constructor() {
  }

  public components(): VFormMetadata[] {
    return _.cloneDeep(this._components);
  }

  public getComponent(name: string): VFormMetadata {
    const filtered = _.filter(this._components, i => i.name === name);
    return filtered.length ? _.cloneDeep(filtered[0]) : null;
  }
}
