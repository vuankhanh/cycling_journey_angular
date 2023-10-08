import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];
@Pipe({
  name: 'formatFileSize'
})
export class FormatFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm: boolean): string {
    if (!+sizeInBytes) return '0 Bytes';

    const units = longForm
      ? FILE_SIZE_UNITS_LONG
      : FILE_SIZE_UNITS;

    const k = 1024;
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

    const formattedSize = Math.round(sizeInBytes / Math.pow(k, i));
    const unit = units[i];

    return `${formattedSize} ${unit}`;
  }

}
