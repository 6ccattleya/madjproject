export interface IPatient {
  id?: number;
  prenom?: string;
  nom?: string;
  telephone?: string;
  adresse?: string;
}

export class Patient implements IPatient {
  constructor(public id?: number, public prenom?: string, public nom?: string, public telephone?: string, public adresse?: string) {}
}
