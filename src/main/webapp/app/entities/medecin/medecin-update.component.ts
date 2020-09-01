import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedecin, Medecin } from 'app/shared/model/medecin.model';
import { MedecinService } from './medecin.service';

@Component({
  selector: 'jhi-medecin-update',
  templateUrl: './medecin-update.component.html'
})
export class MedecinUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    prenom: [],
    nom: [],
    telephone: [],
    specialite: []
  });

  constructor(protected medecinService: MedecinService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medecin }) => {
      this.updateForm(medecin);
    });
  }

  updateForm(medecin: IMedecin): void {
    this.editForm.patchValue({
      id: medecin.id,
      prenom: medecin.prenom,
      nom: medecin.nom,
      telephone: medecin.telephone,
      specialite: medecin.specialite
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medecin = this.createFromForm();
    if (medecin.id !== undefined) {
      this.subscribeToSaveResponse(this.medecinService.update(medecin));
    } else {
      this.subscribeToSaveResponse(this.medecinService.create(medecin));
    }
  }

  private createFromForm(): IMedecin {
    return {
      ...new Medecin(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      specialite: this.editForm.get(['specialite'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedecin>>): void {
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
}
