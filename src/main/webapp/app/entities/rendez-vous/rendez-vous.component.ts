import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRendezVous } from 'app/shared/model/rendez-vous.model';
import { RendezVousService } from './rendez-vous.service';
import { RendezVousDeleteDialogComponent } from './rendez-vous-delete-dialog.component';

@Component({
  selector: 'jhi-rendez-vous',
  templateUrl: './rendez-vous.component.html'
})
export class RendezVousComponent implements OnInit, OnDestroy {
  rendezVous?: IRendezVous[];
  eventSubscriber?: Subscription;

  constructor(
    protected rendezVousService: RendezVousService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.rendezVousService.query().subscribe((res: HttpResponse<IRendezVous[]>) => (this.rendezVous = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRendezVous();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRendezVous): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInRendezVous(): void {
    this.eventSubscriber = this.eventManager.subscribe('rendezVousListModification', () => this.loadAll());
  }

  delete(rendezVous: IRendezVous): void {
    const modalRef = this.modalService.open(RendezVousDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rendezVous = rendezVous;
  }
}
