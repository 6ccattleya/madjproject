import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MadjprojectSharedModule } from 'app/shared/shared.module';
import { RendezVousComponent } from './rendez-vous.component';
import { RendezVousDetailComponent } from './rendez-vous-detail.component';
import { RendezVousUpdateComponent } from './rendez-vous-update.component';
import { RendezVousDeleteDialogComponent } from './rendez-vous-delete-dialog.component';
import { rendezVousRoute } from './rendez-vous.route';

@NgModule({
  imports: [MadjprojectSharedModule, RouterModule.forChild(rendezVousRoute)],
  declarations: [RendezVousComponent, RendezVousDetailComponent, RendezVousUpdateComponent, RendezVousDeleteDialogComponent],
  entryComponents: [RendezVousDeleteDialogComponent]
})
export class MadjprojectRendezVousModule {}
