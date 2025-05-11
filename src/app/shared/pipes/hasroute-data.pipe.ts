import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'hasRouteData',
  pure: false,
})
export class HasRouteDataPipe implements PipeTransform {
  private currentData: Record<string, any> = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.updateRouteData();
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.updateRouteData());
  }

  transform(key: string): boolean {
    return this.currentData[key] === true;
  }

  private updateRouteData(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.currentData = route.snapshot.data || {};
  }
}
