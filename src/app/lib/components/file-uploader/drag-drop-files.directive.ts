import { Directive, output } from '@angular/core';

@Directive({
  selector: '[appDragDropFiles]',
  host: {
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  },
})
export class DragDropFilesDirective {
  readonly fileDropped = output<FileList>();

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
