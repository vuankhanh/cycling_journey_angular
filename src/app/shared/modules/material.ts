import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CdkMenuModule } from '@angular/cdk/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [CommonModule],
    exports: [
        CommonModule,
        
        CdkMenuModule,
        ClipboardModule,

        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        
    ]
})
export class MaterialModule {}