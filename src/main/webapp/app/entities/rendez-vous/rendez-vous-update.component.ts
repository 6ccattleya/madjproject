import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IRendezVous, RendezVous } from 'app/shared/model/rendez-vous.model';
import { RendezVousService } from './rendez-vous.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from 'app/entities/medecin/medecin.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';

type SelectableEntity = IMedecin | IPatient;

@Component({
  selector: 'jhi-rendez-vous-update',
  templateUrl: './rendez-vous-update.component.html'
})
export class RendezVousUpdateComponent implements OnInit {
  isSaving = false;
  medecins: IMedecin[] = [];
  patients: IPatient[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    details: [],
    medecin: [],
    patient: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected rendezVousService: RendezVousService,
    protected medecinService: MedecinService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rendezVous }) => {
      if (!rendezVous.id) {
        const today = moment().startOf('day');
        rendezVous.date = today;
      }

      this.updateForm(rendezVous);

      this.medecinService
        .query({ filter: 'rendezvous-is-null' })
        .pipe(
          map((res: HttpResponse<IMedecin[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMedecin[]) => {
          if (!rendezVous.medecin || !rendezVous.medecin.id) {
            this.medecins = resBody;
          } else {
            this.medecinService
              .find(rendezVous.medecin.id)
              .pipe(
                map((subRes: HttpResponse<IMedecin>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMedecin[]) => (this.medecins = concatRes));
          }
        });

      this.patientService
        .query({ filter: 'rendezvous-is-null' })
        .pipe(
          map((res: HttpResponse<IPatient[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPatient[]) => {
          if (!rendezVous.patient || !rendezVous.patient.id) {
            this.patients = resBody;
          } else {
            this.patientService
              .find(rendezVous.patient.id)
              .pipe(
                map((subRes: HttpResponse<IPatient>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPatient[]) => (this.patients = concatRes));
          }
        });
    });
  }

  updateForm(rendezVous: IRendezVous): void {
    this.editForm.patchValue({
      id: rendezVous.id,
      date: rendezVous.date ? rendezVous.date.format(DATE_TIME_FORMAT) : null,
      details: rendezVous.details,
      medecin: rendezVous.medecin,
      patient: rendezVous.patient
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('madjprojectApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rendezVous = this.createFromForm();
    if (rendezVous.id !== undefined) {
      this.subscribeToSaveResponse(this.rendezVousService.update(rendezVous));
    } else {
      this.subscribeToSaveResponse(this.rendezVousService.create(rendezVous));
    }
  }

  private createFromForm(): IRendezVous {
    return {
      ...new RendezVous(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details'])!.value,
      medecin: this.editForm.get(['medecin'])!.value,
      patient: this.editForm.get(['patient'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRendezVous>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
