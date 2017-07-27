import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, Input} from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {HelperService} from '../../editors/property-editor/helper.service';
import {Helper} from '../../helpers/Helper';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';

@Component({
  selector: 'vform-dynamic',
  templateUrl: './dynamic.component.html',
  host: { '[style.width]': 'metadata.properties.dynamicWidth || "100%"', '[style.height]': 'metadata.properties.dynamicHeight || "100%"', '[style.display]': '"flex"' }
})
export class DynamicComponent extends VFormComponentBase implements OnInit, IVFormContainerComponent {

  @Input()
  itemIndex: number;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(stateService: HelperService, private resolver: ComponentFactoryResolver) {
    super(stateService);
  }

  ngOnInit() {
    Helper.createComponent(this, this.metadata, this.resolver, ++ this.itemIndex);
  }

}
