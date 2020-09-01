import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from './medecin.service';
import { MedecinDeleteDialogComponent } from './medecin-delete-dialog.component';

@Component({
  selector: 'jhi-medecin',
  templateUrl: './medecin.component.html'
})
export class MedecinComponent implements OnInit, OnDestroy {
  medecins?: IMedecin[];
  eventSubscriber?: Subscription;

  constructor(protected medecinService: MedecinService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.medecinService.query().subscribe((res: HttpResponse<IMedecin[]>) => (this.medecins = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedecins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedecin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedecins(): void {
    this.eventSubscriber = this.eventManager.subscribe('medecinListModification', () => this.loadAll());
  }

  delete(medecin: IMedecin): void {
    const modalRef = this.modalService.open(MedecinDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medecin = medecin;
  }
}
