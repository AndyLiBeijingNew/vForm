import {Type} from '@angular/core';
import {Kv} from './Kv';
export class VFormMetadata {
  constructor(public name: string, public description: string = '', public type: string, public properties: any = {}, public children: VFormMetadata[] = []) {  }
}
