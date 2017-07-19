import {FieldSummary} from './FieldSummary';
export class PlanSummary {
  constructor(public planSetupId:string, public planSetupName: string, public deliveredFractions: number = 0, public plannedFractions: number,
  public deliveredDose: number = 0, public plannedDose: number, public fields: FieldSummary[]) {

  }
}
