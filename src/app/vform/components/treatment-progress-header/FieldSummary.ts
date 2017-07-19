export class FieldSummary {
  constructor(public fieldId: string, public fieldName: string, public energy: string, public mu: number, public gantryRotation: number,
              public collimatorRotation: number, public collimatorX: number, public collimatorY: number, public collimatorMode: string,
              public couchLat: number, public couchLong: number, public couchVrt: number, public wedge: string, public technique: string) {
  }
}
