import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FixerResponse } from 'src/app/models/FixerResponse-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conversions-details',
  templateUrl: './conversions-details.component.html',
  styleUrls: ['./conversions-details.component.scss'],
})
export class ConversionsDetailsComponent implements OnInit {
  from: string;
  to: string;
  breadcrumb: Array<any> = [];
  FixerResponse: FixerResponse = new FixerResponse();
  API_KEY: string = environment.API_KEY;
  startDate: string;
  historicResult: number;

  historicalDataFromBase = [];
  historicalDataFromOthers = [];

  constructor(private route: ActivatedRoute, private ApiService: ApiService) {}

  getOldDate() {
    let currentDay = new Date();
    let month: any = currentDay.getUTCMonth() + 1;
    let day: any = currentDay.getUTCDate();
    let year: any = currentDay.getUTCFullYear();
    month <= 9 ? (month = '0' + month) : month;
    day <= 9 ? (day = '0' + day) : day;
    this.startDate = year - 1 + '-' + month + '-' + day;
  }

  getHistorical() {
    let params = this.ApiService.createParams({
      access_key: this.API_KEY,
      symbols: `${this.from},${this.to}`,
    });

    this.ApiService.get(`/${this.startDate}?${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;
        let ratesOfCurrency = result.rates;
        let baseRate = ratesOfCurrency[this.from];
        let targetRate = ratesOfCurrency[this.to];
        this.historicResult = targetRate / baseRate;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCurrenciesFromBase() {
    let params = this.ApiService.createParams({
      access_key: this.API_KEY,
      foramt: 1,
    });

    this.ApiService.get(`/latest?${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;
        let ratesOfCurrency = result.rates;
        let baseRate = ratesOfCurrency[this.from];

        Object.entries(ratesOfCurrency).forEach(([key, value]) => {
          this.historicalDataFromBase.push({
            currency: key,
            rate: value / baseRate,
          });
        });

        Object.entries(ratesOfCurrency).forEach(([key, value]) => {
          this.historicalDataFromOthers.push({
            currency: key,
            rate: baseRate / value,
          });
        });

        this.historicalDataFromBase = this.historicalDataFromBase.slice(0, 20);
        this.historicalDataFromOthers = this.historicalDataFromOthers.slice(0, 20);
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

    this.getOldDate();
    this.getHistorical();
    this.getCurrenciesFromBase();
  }
}
