import {PlanSummary} from './PlanSummary';
export class TreatmentProgressSummary {
  constructor(public lastTreatmentDate: Date, public plans: PlanSummary[]) {
  }
}
