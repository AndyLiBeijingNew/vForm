import {
  Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Input,
  AfterContentInit
} from '@angular/core';
import { VFormComponentBase } from '../VFormComponentBase';
import { HelperService } from '../../editors/property-editor/helper.service';
import { Helper } from '../../helpers/Helper';
import { IVFormContainerComponent } from '../../services/IVFormContainerComponent';
import { IVFormComponent } from '../../services/IVFormComponent';
import { IListItemIndex } from '../IListItemIndex';

@Component({
  selector: 'vform-dynamic',
  templateUrl: './dynamic.component.html',
  host: { '[style.width]': 'metadata.properties.dynamicWidth || "100%"', '[style.height]': 'metadata.properties.dynamicHeight || "100%"', '[style.display]': '"flex"' }
})
export class DynamicComponent extends VFormComponentBase implements OnInit, AfterContentInit, IVFormContainerComponent {

  @Input()
  itemIndex: IListItemIndex;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(helperService: HelperService, private resolver: ComponentFactoryResolver) {
    super(helperService);
  }

  private childComponent: IVFormComponent;

  ngOnInit() {
    this.childComponent = this.helperService.createComponent(this, this.metadata);
  }

  ngAfterContentInit() {
    if (this.itemIndex && this.itemIndex != null) {
      this.passItemIndex(this.itemIndex);
    }
  }

  private passItemIndex(value: IListItemIndex) {
    if (this.childComponent && 'setItemIndex' in this.childComponent.componentRef.instance) {
      this.childComponent.componentRef.instance.setItemIndex(value);
    }
  }

}
