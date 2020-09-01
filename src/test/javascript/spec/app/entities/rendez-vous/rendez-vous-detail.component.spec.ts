import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { MadjprojectTestModule } from '../../../test.module';
import { RendezVousDetailComponent } from 'app/entities/rendez-vous/rendez-vous-detail.component';
import { RendezVous } from 'app/shared/model/rendez-vous.model';

describe('Component Tests', () => {
  describe('RendezVous Management Detail Component', () => {
    let comp: RendezVousDetailComponent;
    let fixture: ComponentFixture<RendezVousDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ rendezVous: new RendezVous(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MadjprojectTestModule],
        declarations: [RendezVousDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RendezVousDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RendezVousDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load rendezVous on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rendezVous).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
