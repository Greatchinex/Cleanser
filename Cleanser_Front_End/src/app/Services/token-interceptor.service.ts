import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private Injector: Injector) { }

  intercept(req, next) {
    let authService = this.Injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Token ${authService.loadToken()}`,
      }
    })
    return next.handle(tokenizedReq)
  }
}
