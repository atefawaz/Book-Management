import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LibrarianGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const librariang = request.headers['x-role'];
    if (librariang !== "librarian") {
      throw new ForbiddenException("Access denied , you dont have the permission")
    }

    return true;
  }
}
