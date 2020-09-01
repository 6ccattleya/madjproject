import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.MadjprojectPatientModule)
      },
      {
        path: 'medecin',
        loadChildren: () => import('./medecin/medecin.module').then(m => m.MadjprojectMedecinModule)
      },
      {
        path: 'rendez-vous',
        loadChildren: () => import('./rendez-vous/rendez-vous.module').then(m => m.MadjprojectRendezVousModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MadjprojectEntityModule {}
