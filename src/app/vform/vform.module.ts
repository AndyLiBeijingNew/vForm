import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {FormEditorComponent} from './editors/form-editor/form-editor.component';
import {MetadataService} from './services/metadata.service';
import {PropertyEditorComponent} from './editors/property-editor/property-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StateService} from './editors/property-editor/state.service';
import {InputComponent} from './components/input/input.component';
import {HtmlComponent} from './components/html/html.component';
import {FormComponent} from './components/form/form.component';
import {ImagePreviewComponent} from './components/image-preview/image-preview.component';
import {BreastBoardComponent} from './components/breast-board/breast-board.component';
import {InputFieldComponent} from './components/input-field/input-field.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SubmitBtnComponent } from "./components/button/button.component";
import {BrowserModule} from '@angular/platform-browser';
import {
  MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdRadioModule, MdSelectModule,
  MdTabsModule
} from '@angular/material';
import {CtRegionComponent} from './components/ct-region/ct-region.component';
import { SelectComponent } from './components/select/select.component';
import {RadioComponent} from './components/radio/radio.component';
<<<<<<< HEAD
import { CheckboxComponent } from './components/checkbox/checkbox.component';
=======
<<<<<<< HEAD
import { CheckboxComponent } from './components/checkbox/checkbox.component';
=======
>>>>>>> e937f5b2efe04605729fbcfcfc4f9d87fa98dcc5
import {TableComponent} from './components/table/table.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { ESignComponent } from './components/esign/esign.component';
import { ESignModalComponent } from './components/esign/esign-modal/esign-modal.component';

<<<<<<< HEAD
=======
>>>>>>> 30dcff9e3aa78c70bc3f01ac20942febe2c07e5e
>>>>>>> e937f5b2efe04605729fbcfcfc4f9d87fa98dcc5
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NoopAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    MdTabsModule,
    MdIconModule,
    MdSelectModule,
    MdRadioModule
  ],
  declarations: [LayoutComponent, FormEditorComponent, PropertyEditorComponent, InputComponent, HtmlComponent, FormComponent, ImagePreviewComponent,
<<<<<<< HEAD
    BreastBoardComponent, InputFieldComponent, CtRegionComponent, SelectComponent, RadioComponent, SubmitBtnComponent, CheckboxComponent, TableComponent, DynamicComponent, ESignComponent, ESignModalComponent],
  exports: [FormEditorComponent, FormComponent],
  providers: [MetadataService, StateService],
  entryComponents: [FormEditorComponent, LayoutComponent, InputComponent, HtmlComponent, FormComponent, ImagePreviewComponent,
    BreastBoardComponent, InputFieldComponent, PropertyEditorComponent, CtRegionComponent, SelectComponent, RadioComponent, SubmitBtnComponent, CheckboxComponent, TableComponent, ESignComponent, ESignModalComponent]
=======
<<<<<<< HEAD
    BreastBoardComponent, InputFieldComponent, CtRegionComponent, SelectComponent, RadioComponent, SubmitBtnComponent, CheckboxComponent],
  exports: [FormEditorComponent, FormComponent],
  providers: [MetadataService, StateService],
  entryComponents: [FormEditorComponent, LayoutComponent, InputComponent, HtmlComponent, FormComponent, ImagePreviewComponent,
    BreastBoardComponent, InputFieldComponent, PropertyEditorComponent, CtRegionComponent, SelectComponent, RadioComponent, SubmitBtnComponent, CheckboxComponent]
=======
    BreastBoardComponent, InputFieldComponent, CtRegionComponent, SelectComponent, RadioComponent, TableComponent, DynamicComponent, ESignComponent, ESignModalComponent],
  exports: [FormEditorComponent, FormComponent],
  providers: [MetadataService, StateService],
  entryComponents: [FormEditorComponent, LayoutComponent, InputComponent, HtmlComponent, FormComponent, ImagePreviewComponent,
    BreastBoardComponent, InputFieldComponent, PropertyEditorComponent, CtRegionComponent, SelectComponent, RadioComponent, TableComponent, ESignComponent, ESignModalComponent]
>>>>>>> 30dcff9e3aa78c70bc3f01ac20942febe2c07e5e
>>>>>>> e937f5b2efe04605729fbcfcfc4f9d87fa98dcc5
})
export class VformModule {
}
