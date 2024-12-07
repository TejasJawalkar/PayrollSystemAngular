import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatLabel,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatTooltip,
    MatSidenavModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatLabel,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatTooltip,
    MatSidenavModule,
  ],
})
export class MaterialModule {}
