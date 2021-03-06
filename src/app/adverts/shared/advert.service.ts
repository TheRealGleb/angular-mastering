import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AdvertHttpService} from '../../core/providers/advert-http.service';

@Injectable()
export class AdvertService {

  constructor(private http: AdvertHttpService) { }

  getAdvertList(offset: string, limit: string) {
    const options = {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
    };
    return this.http.getAdvertList(options)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAdvertDetail(pk: string) {
    return this.http.getAdvertDetail(pk)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
