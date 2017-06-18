import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FormEditorComponent } from './editors/form-editor/form-editor.component';
import {MetadataService} from './services/metadata.service';
import { PropertyEditorComponent } from './editors/property-editor/property-editor.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StateService} from './editors/property-editor/state.service';
import { InputComponent } from './components/input/input.component';
import { HtmlComponent } from './components/html/html.component';
import { FormComponent } from './components/form/form.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { BreastBoardComponent } from './components/breast-board/breast-board.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LayoutComponent, FormEditorComponent, PropertyEditorComponent, InputComponent, HtmlComponent, FormComponent, ImagePreviewComponent, BreastBoardComponent, InputFieldComponent],
  exports: [FormEditorComponent, FormComponent],
  providers: [MetadataService, StateService],
  entryComponents: [FormEditorComponent, LayoutComponent, InputComponent, HtmlComponent, FormComponent, ImagePreviewComponent, BreastBoardComponent, InputFieldComponent]
})
export class VformModule { }
