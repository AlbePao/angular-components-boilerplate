import { NgModule } from '@angular/core';
import { RoundedToggleComponent } from './rounded-toggle.component';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [ToggleComponent, RoundedToggleComponent],
  exports: [ToggleComponent, RoundedToggleComponent],
})
export class ToggleModule {}
