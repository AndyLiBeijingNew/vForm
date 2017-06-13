import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { FormEditorComponent } from './editors/form-editor/form-editor.component';
import {MetadataService} from './services/metadata.service';
import { PropertyEditorComponent } from './editors/property-editor/property-editor.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToggleEditorService} from './editors/property-editor/toggle-editor.service';
import { InputComponent } from './components/input/input.component';
import { HtmlComponent } from './components/html/html.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LayoutComponent, FormEditorComponent, PropertyEditorComponent, InputComponent, HtmlComponent],
  exports: [FormEditorComponent],
  providers: [MetadataService, ToggleEditorService],
  entryComponents: [FormEditorComponent, LayoutComponent, InputComponent, HtmlComponent]
})
export class VformModule { }
