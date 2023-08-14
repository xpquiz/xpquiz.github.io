import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent]
      })
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
    }
  );

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should play sound on ngOnInit', () => {
    const spy: jest.SpyInstance = jest.spyOn(app['windowReadySound'], 'play')
    spy.mockImplementation(async () => {});

    app.ngOnInit();

    expect(spy).toBeCalled();
  });
});
