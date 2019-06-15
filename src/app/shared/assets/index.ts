import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

import { throwError } from 'rxjs';

export const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZmYTBmZmUxZGNlNDhlZTVmYzIyY2E5ZTE1ZDllYzA0MDhhYmViYTQwOWRhYzAwYWVjOGVkN2ViNWUxNjFmMjFjM2I1YTlhYmE3YmM3MDAzIn0.eyJhdWQiOiIyIiwianRpIjoiNmZhMGZmZTFkY2U0OGVlNWZjMjJjYTllMTVkOWVjMDQwOGFiZWJhNDA5ZGFjMDBhZWM4ZWQ3ZWI1ZTE2MWYyMWMzYjVhOWFiYTdiYzcwMDMiLCJpYXQiOjE1NjAzNjQxNTMsIm5iZiI6MTU2MDM2NDE1MywiZXhwIjoxNTkxOTg2NTUxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.q8Oxc5Glcvp6zGOZznoZtvzGJEJUSHNiLRQryQkWmQt1DsMlCFptdNqN3H0Y7SsTdKaZkNCLeXlX3k-qFpA92ZytQAi_iDI6bOCZlUGjvQOxoEVOmSVntl5Y8jhn5-WBlm0PaOYP2exhrhlaqypnv7KBkMIQjvgUmIhRGYnM6jtxnVJ9DcyGUPV_L6qDddg2h9NpvSQd8v5CpQyMeCvzWvbKYpA8b0eolTr9O84zcxwwdeqG0ts_mo-ip9_Uvd9W52mMpcpfF-oZSp22AZGJx8klbhTzLloT-Rz_I6eApeYkrKJ8hIJuZhFIoCfWkYF3LCosR5X-BAFblqoYTuo0ou3YEv2ZbHI3ZwGc-j5HMJ72DfcxktylTMgcHp5O19ML0F-ufJFygP8Yza2Y1zyiXAChMWfLy3CJQELeoWQEA-ojcqZwVGCQE9KOeobnueitKbG_QAM0hxG4r7XbDBgLIkiyG-0q-SKzo3dENhsQVW0Ce65ioDYeRbRWH8O35uvIbwJT8ZtezabC8WVtuVsSTgmKc6AOOAGlW2Q3yJQZRaHrjM7EEpVmXIcUtvG1eNJyptRpk7qO3fQv83MYFao-RxDQXTJmNyudb0IJK9iu5RnUoR9NMgSBNy_020vzuKnhWMrAAq4nLoDVoqm9m2jq4w-Q1kbYqxqBKJlgT4qFPME';
export function handleError(error: HttpErrorResponse) {
  let message;
  console.error(error);
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
    message = error.error.message;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
    message = error.error;
  }
  // return an observable with a user-facing error message
  return throwError(message);
}

export const getEventMessage = (event: HttpEvent<any>, file: File) => {
  switch (event.type) {
    case HttpEventType.Sent:
      return `Uploading file "${file.name}" of size ${file.size}.`;

    case HttpEventType.UploadProgress:
      // Compute and show the % done:
      const percentDone = Math.round(100 * event.loaded / event.total);
      return `File "${file.name}" is ${percentDone}% uploaded.`;

    case HttpEventType.Response:
      return `File "${file.name}" was completely uploaded!`;

    default:
      return `File "${file.name}" surprising upload event: ${event.type}.`;
  }
}
