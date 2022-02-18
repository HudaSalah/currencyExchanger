import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FixerResponse } from 'src/app/models/FixerResponse-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversions-details',
  templateUrl: './conversions-details.component.html',
  styleUrls: ['./conversions-details.component.scss'],
})
export class ConversionsDetailsComponent implements OnInit {
  from:string;
  to:string;
  breadcrumb: Array<any> = [];
  FixerResponse: FixerResponse = new FixerResponse();
  API_KEY: string = environment.API_KEY;
  startDate:string;
  endDate:string;
  historicalData=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private serializer: UrlSerializer
  ) {}

  getMarginDates() {
    let currentDay = new Date();
    let month = currentDay.getUTCMonth() + 1;
    let day = currentDay.getUTCDate();
    let year = currentDay.getUTCFullYear();
    this.startDate = year + '-' + month + '-' + day;
    this.endDate = year - 1 + '-' + month + '-' + day;
  }

  createParams(values?) {
    const tree = this.router.createUrlTree([], {
      queryParams: {
        access_key: this.API_KEY,
        from: values?.base,
        to: values?.target,
        amount: values?.amount,
        start_date: this.startDate,
        end_date: this.endDate,
        base: this.from,
        symbols: this.to,
      },
    });
    let params = this.serializer.serialize(tree).substring(1);
    return params;
  }

  getHistorical() {
    let params = this.createParams();
    // this.historicalData = Object.entries(this.FixerResponse.rates).map((e) => ( { [e[0]]: e[1] } ));
    // console.log(this.historicalData)
    this.ApiService.get(`/timeseries${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;
        this.historicalData = Object.entries(result.rates).map((e) => ( { [e[0]]: e[1] } ));
      },
      (err) => {
        console.log(err);
      }
    );
  }

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

    this.getMarginDates();
    this.getHistorical();
  }
}
