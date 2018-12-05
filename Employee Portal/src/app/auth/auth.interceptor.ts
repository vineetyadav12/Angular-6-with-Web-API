import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpUserEvent, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') { return next.handle(req.clone()); }

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            // console.log(' all looks good');
                            // http response status code
                            // console.log(event.status);
                        }
                    }, error => {
                        // http response status code
                        console.log('----response----');
                        console.error('status code:');
                        console.error(error.status);
                        console.error(error.message);
                        console.log('--- end of response---');
                        if (error.status === 401) { this.router.navigateByUrl('/login'); }
                    }));
        } else {
            this.router.navigateByUrl('/login');
        }
    }
}

