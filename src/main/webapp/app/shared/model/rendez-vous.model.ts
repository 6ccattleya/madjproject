import { Moment } from 'moment';
import { IMedecin } from 'app/shared/model/medecin.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IRendezVous {
  id?: number;
  date?: Moment;
  details?: any;
  medecin?: IMedecin;
  patient?: IPatient;
}

export class RendezVous implements IRendezVous {
  constructor(public id?: number, public date?: Moment, public details?: any, public medecin?: IMedecin, public patient?: IPatient) {}
}
