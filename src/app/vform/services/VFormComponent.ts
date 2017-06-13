import {Type} from '@angular/core';
import {Kv} from './Kv';
export class VFormComponent {
  constructor(public name: string, public description: string = '', public type: string, public properties: any = {}) {  }
}
