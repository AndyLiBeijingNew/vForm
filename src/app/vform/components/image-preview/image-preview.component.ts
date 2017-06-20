import {ChangeDetectorRef, Component, ComponentRef, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {StateService} from '../../editors/property-editor/state.service';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import * as _ from 'lodash';
import {InputComponent} from '../input/input.component';
import {InputFieldComponent} from '../input-field/input-field.component';

@Component({
  selector: 'vform-image-preview',
  templateUrl: './image-preview.component.html'
})
export class ImagePreviewComponent implements IVFormComponent, OnInit {

  children: IVFormComponent[];
  componentRef: ComponentRef<any>;

  @Input()
  form: FormGroup;

  @Input()
  metadata: VFormMetadata;

  @ViewChild('image') image: HTMLImageElement;
  @ViewChild('imageInput') imageInput: HTMLInputElement;
  @ViewChild('imageData') imageData: InputFieldComponent;
  private imageDataMetadata: VFormMetadata;

  constructor(private stateService: StateService) {

  }

  ngOnInit(): void {
    this.imageDataMetadata = new VFormMetadata('Text', 'Text input.', 'InputComponent',
      {type: 'hidden', required: this.metadata.properties.required,
        showLabel: 'false', containerHeight: '0px', containerWidth: '0px', name: this.metadata.properties.name, size: 1 });
  }

  clickImage() {
    (<any>this.imageInput).nativeElement.click();
  }

  setImage(data: any) {
    (<any> this.image).nativeElement.src = data;
  }

  imageChanged(event: Event) {
    const files: FileList  = (<any> event.target).files;
    if (files && files.length > 0) {
      const f = files[0];
      const fr = new FileReader();
      fr.onload = (e: Event) => {
        const data = (<any>e.target).result;
        if (data) {
          (<any> this.image).nativeElement.src = data;
          this.imageData.value = data;
        }
      };
      fr.readAsDataURL(f);
    }
  }
}
