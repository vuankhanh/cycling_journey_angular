import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ShowToastInterceptor implements HttpInterceptor {

  constructor(
    private toastrService: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        // Operation failed; error is an HttpErrorResponse
        error: (error: HttpErrorResponse) => {
          const errorMessage = `- code: ${error.error.status}
          - message: ${error.error.message}`
          this.toastrService.error(errorMessage, 'Error');
        }
      })
    );
  }
}
