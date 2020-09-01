export interface IMedecin {
  id?: number;
  prenom?: string;
  nom?: string;
  telephone?: string;
  specialite?: string;
}

export class Medecin implements IMedecin {
  constructor(public id?: number, public prenom?: string, public nom?: string, public telephone?: string, public specialite?: string) {}
}
