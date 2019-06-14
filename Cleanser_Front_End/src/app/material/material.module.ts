import { NgModule } from '@angular/core';
import { MatGridListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatTabsModule  } from '@angular/material'

const MaterialComponents = [
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatTabsModule
]


@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
