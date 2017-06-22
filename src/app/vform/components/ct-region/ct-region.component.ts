import {Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {IVFormComponent} from '../../services/IVFormComponent';
import {FormGroup} from '@angular/forms';
import {VFormMetadata} from '../../services/VFormMetadata';
import {InputFieldComponent} from '../input-field/input-field.component';
import {StateService} from '../../editors/property-editor/state.service';
import * as _ from 'lodash';
import {VFormComponentBase} from '../VFormComponentBase';

@Component({
  selector: 'vform-ct-region',
  templateUrl: './ct-region.component.html',
  host: { '[hidden]': 'isHidden()' }
})
export class CtRegionComponent extends VFormComponentBase implements OnInit, IVFormComponent {
  @ViewChild('selectionData') selectionData: InputFieldComponent;
  @ViewChild('front') front: HTMLCanvasElement;
  @ViewChild('side') side: HTMLCanvasElement;

  regions: any = {front: {}, side: {}};
  private isDrawing = false;

  private selectionDataMetadata: VFormMetadata;

  constructor(stateService: StateService) {
    super(stateService);
    this.stateService.propertyChanged.subscribe(p => {
      stateService.propertyChanged.subscribe(tuple => {
        if (tuple[0] === this && _.includes(['frontHeight, frontWidth', 'sideHeight', 'sideWidth'], tuple[1])) {
          this.setCanvasSize();
        }
      });
    });
  }

  clickCanvas(e: MouseEvent, canvas: HTMLCanvasElement, region: any) {
    if (!this.isDrawing) {
      this.isDrawing = true;
      region.start = {x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop};
      region.end = {};
    } else {
      region.end = {x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop};
      this.isDrawing = false;
    }
    this.selectionData.value = JSON.stringify(this.regions);
  }

  mouseLeaveCanvas(e: MouseEvent, canvas: HTMLCanvasElement, region: any) {
    if (this.isDrawing) {
      this.isDrawing = false;
      region.end = {x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop};
      this.selectionData.value = JSON.stringify(this.regions);
    }
  }

  mouseMoveOnCanvas(e: MouseEvent, canvas: HTMLCanvasElement, region: any) {
    if (this.isDrawing) {
      region.end = {x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop};
      this.selectionData.value = JSON.stringify(this.regions);
    }
  }

  drawRegions(value: string) {
    const tmp = JSON.parse(value);
    if (tmp.front) {
      this.drawRegion(this.front, tmp.front);
    }
    if (this.regions.side) {
      this.drawRegion(this.side, tmp.side);
    }
  }

  drawRegion(canvas: HTMLCanvasElement, region: any) {
    const nativeElement = (<any>canvas).nativeElement;
    const c = <CanvasRenderingContext2D> nativeElement.getContext('2d');
    c.clearRect(0, 0, nativeElement.width, nativeElement.height);
    if (region.start && region.end && region.start.x >= 0 && region.start.y >= 0 && region.end.x >= 0 && region.end.y >= 0) {
      c.strokeStyle = this.metadata.properties.regionColor;
      c.strokeRect(region.start.x, region.start.y, region.end.x - region.start.x, region.end.y - region.start.y);
    }
  }

  ngOnInit(): void {
    this.selectionDataMetadata = new VFormMetadata('Hidden', 'Text input.', 'InputComponent',
      {
        type: 'hidden',
        showLabel: 'false', containerHeight: '0px', containerWidth: '0px', name: this.metadata.properties.name, size: 1
      });
    this.setCanvasSize();
  }

  private setCanvasSize() {
    (<any>this.front).nativeElement.height = this.metadata.properties.frontHeight;
    (<any>this.front).nativeElement.width = this.metadata.properties.frontWidth;
    (<any>this.side).nativeElement.height = this.metadata.properties.sideHeight;
    (<any>this.side).nativeElement.width = this.metadata.properties.sideWidth;
  }
}
