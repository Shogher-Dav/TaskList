import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';







@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        // MatSortModule
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule

    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        // MatSortModule
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule

    ]
})
export class MaterialModule { }
