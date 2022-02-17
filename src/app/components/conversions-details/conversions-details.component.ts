import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversions-details',
  templateUrl: './conversions-details.component.html',
  styleUrls: ['./conversions-details.component.scss'],
})
export class ConversionsDetailsComponent implements OnInit {
  from;
  to;
  breadcrumb: Array<any> = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.from = this.route.snapshot.params.from;
    this.to = this.route.snapshot.params.to;
    this.breadcrumb = [
      {
        routeLink: '/',
        pageName: 'Home Page',
      },
      {
        routeLink: `/details/${this.from}/${this.to}`,
        pageName: 'Conversions Details',
      },
    ];
  }
}
