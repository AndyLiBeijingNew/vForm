import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {VFormComponentBase} from '../VFormComponentBase';
import {StateService} from '../../editors/property-editor/state.service';
import {Helper} from '../../helpers/Helper';
import {IVFormContainerComponent} from '../../services/IVFormContainerComponent';

@Component({
  selector: 'vform-dynamic',
  templateUrl: './dynamic.component.html',
  host: { '[style.width]': '"100%"', '[style.height]': '"100%"', '[style.display]': '"flex"' }
})
export class DynamicComponent extends VFormComponentBase implements OnInit, IVFormContainerComponent {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(stateService: StateService, private resolver: ComponentFactoryResolver) {
    super(stateService);
  }

  ngOnInit() {
    Helper.createComponent(this, this.metadata, this.resolver);
  }

}
