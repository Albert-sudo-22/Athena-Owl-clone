import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.activatedRoute.root))
      )
      .subscribe((breadcrumbs) => (this.breadcrumbs = breadcrumbs));
  }

  private buildBreadcrumbs(route: ActivatedRoute, path: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeUrl: string = child.snapshot.url.map((segment) => segment.path).join('/');
      const label = child.snapshot.data['breadcrumb'];
      const nextUrl = path + '/' + routeUrl;

      if (label) {
        breadcrumbs.push({ label, url: nextUrl });
      }

      return this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}

export interface Breadcrumb {
  label: string;
  url: string;
}
