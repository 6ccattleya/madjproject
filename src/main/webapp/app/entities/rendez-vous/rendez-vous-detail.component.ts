import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IRendezVous } from 'app/shared/model/rendez-vous.model';

@Component({
  selector: 'jhi-rendez-vous-detail',
  templateUrl: './rendez-vous-detail.component.html'
})
export class RendezVousDetailComponent implements OnInit {
  rendezVous: IRendezVous | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rendezVous }) => (this.rendezVous = rendezVous));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
