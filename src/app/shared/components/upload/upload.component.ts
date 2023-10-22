import { Component,Inject } from '@angular/core';
import { MaterialModule } from '../../modules/material';
import { DragDropDirective, FileHandle } from '../../directives/drag-drop.directive';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlbumService } from '../../services/api/backend/album.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharingPipesModule } from '../../pipes/sharing-pipes.module';
import { Album, Media } from '../../models/Album';

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
  filesToBeDeleted: Array<string> = [];
  fileGroup!: FormGroup;
  
  subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlbumData,
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
      media: [[]],
    });
    if(this.data.data){
      this.fileGroup.patchValue(this.data.data);
    }
  }

  filesDropped(files: FileHandle[]): void {
    this.files = this.files.concat(files);
    const blobFiles: Array<Blob> = [];
    for(const [index, file] of this.files.entries()){
      blobFiles.push(file.file)
    }
  }

  removePreparingFile(i: number){
    this.files.slice(i, 1);
  }

  markOrUnmarkFileWillRemove(file: Media){
    file.willRemove = !file.willRemove;
  }

  get mediaControl(): FormArray{
    return this.fileGroup.controls['media'] as FormArray;
  }

  get arrFileWillRemove(): Array<string>{
    const media: Array<Media> = this.mediaControl.value;
    return media.filter(m=>{
      return m.willRemove ? m._id : false;
    }).map(m=>m._id);
  }

  submit(){
    this.data.state === 'update' ? this.update() : this.create();
  }

  create(){
    if(this.fileGroup.valid){
      const name: string = this.fileGroup.value.name;
      const blobFiles: Array<Blob> = this.files.map(file=>file.file);
      const description: string = this.fileGroup.value.description;
      this.subscription.add(
        this.albumService.create(name, description, blobFiles).subscribe(res=>{
          this.dialogRef.close(res.metaData)
        })
      )
    }
  }
  
  update(){
    if(this.fileGroup.valid){
      const id: string = this.data.data!._id;
      const name: string = this.fileGroup.value.name;
      const blobFiles: Array<Blob> = this.files.map(file=>file.file);
      const description: string = this.fileGroup.value.description;
      const filesWillRemove = this.arrFileWillRemove;
      
      this.subscription.add(
        this.albumService.modify(id, name, description, blobFiles, filesWillRemove).subscribe(res=>{
          console.log(res);
          
          this.dialogRef.close(res.metaData)
        },(err)=>{
          console.log(err);
          
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
export interface AlbumData{
  state: 'new' | 'update',
  data: Album | null
}