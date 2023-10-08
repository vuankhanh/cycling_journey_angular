import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material';
import { DragDropDirective, FileHandle } from '../../directives/drag-drop.directive';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlbumService } from '../../services/api/backend/album.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { SharingPipesModule } from '../../pipes/sharing-pipes.module';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SharingPipesModule,

    //Directives
    DragDropDirective
  ]
})
export class UploadComponent {
  files: FileHandle[] = [];
  fileGroup!: FormGroup;
  
  subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    private formBuilder: FormBuilder,
    private albumService: AlbumService
  ){

  }

  ngOnInit(){
    this.initForm();
  }

  private initForm(){
    this.fileGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      files: [[], Validators.required]
    })
  }

  filesDropped(files: FileHandle[]): void {
    this.files = this.files.concat(files);
    const blobFiles: Array<Blob> = [];
    for(const [index, file] of this.files.entries()){
      blobFiles.push(file.file)
    }
    
    console.log(this.files);
    this.fileGroup.controls['files'].setValue(blobFiles);
  }

  submit(){
    if(this.fileGroup.valid){
      const name: string = this.fileGroup.value.name;
      const blobFiles: Array<Blob> = this.fileGroup.value.files;
      const description: string = this.fileGroup.value.description;
      this.subscription.add(
        this.albumService.create(name, blobFiles, description).subscribe(res=>{
          console.log(res);
          this.dialogRef.close(res.metaData)
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
