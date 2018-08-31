import { RutasModule } from './rutas.module';

describe('RutasModule', () => {
  let rutasModule: RutasModule;

  beforeEach(() => {
    rutasModule = new RutasModule();
  });

  it('should create an instance', () => {
    expect(rutasModule).toBeTruthy();
  });
});
