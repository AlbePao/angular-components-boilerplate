import { NgModule } from '@angular/core';
import { DragDropFilesDirective } from './drag-drop-files.directive';
import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
  imports: [DragDropFilesDirective, FileUploaderComponent],
  exports: [DragDropFilesDirective, FileUploaderComponent],
})
export class FileUploaderModule {}
