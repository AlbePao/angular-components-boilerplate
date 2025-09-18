import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { getUniqueId } from '@lib/utils/getUniqueId';
import { IconButtonComponent } from '../button';
import { IconComponent } from '../icon';
import { DragDropFilesDirective } from './drag-drop-files.directive';

export type FileUploaderType = 'single' | 'multiple';

@Component({
  selector: 'app-file-uploader',
  imports: [DragDropFilesDirective, IconButtonComponent, IconComponent],
  templateUrl: './file-uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgValueAccessor(FileUploaderComponent)],
  host: {
    '[id]': 'id()',
    class: 'block',
    '[class.opacity-50]': 'isDisabled()',
    '[class.pointer-events-none]': 'isDisabled()',
  },
})
export class FileUploaderComponent implements ControlValueAccessor {
  readonly id = input<string>(getUniqueId('app-file-uploader'));
  readonly type = input<FileUploaderType>('single');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly filesChange = output<File[]>();

  protected readonly isDragOver = signal<boolean>(false);
  private readonly _isDisabled = signal<boolean>(this.disabled());
  readonly isDisabled = computed(() => this.disabled() || this._isDisabled());
  readonly isMultiple = computed(() => this.type() === 'multiple');

  protected files: File[] = [];

  onChange: (value: File[] | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: File[] | null): void {
    this.files = value ?? [];
  }

  registerOnChange(fn: (value: File[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  addFile(fileList: FileList | null): void {
    if (fileList && fileList.length > 0) {
      if (this.isMultiple()) {
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList.item(i);
          if (file) {
            this.files = [...this.files, file];
          }
        }
      } else {
        const file = fileList.item(0);
        this.files = file ? [file] : [];
      }

      this.onChange(this.files);
      this.filesChange.emit(this.files);
    }
  }

  deleteAttachment(index: number): void {
    this.files.splice(index, 1);
    this.onChange(this.files);
    this.filesChange.emit(this.files);
  }
}
