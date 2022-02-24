import { Component, OnInit } from '@angular/core';
import { FixerResponse } from 'src/app/models/FixerResponse-model';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isloading = false;
  API_KEY: string = environment.API_KEY;
  FixerResponse: FixerResponse = new FixerResponse();
  convertedInfo;
  amountValues = [1, 5, 10, 15, 20, 25, 30];
  resultFromToValues = [];
  resultToFromValues = [];

  constructor(private ApiService: ApiService) {}

  getConvertedInfo(event) {
    this.convertedInfo = event;
    this.getResultValues(
      this.convertedInfo.base,
      this.convertedInfo.target,
      this.resultFromToValues
    );

    this.getResultValues(
      this.convertedInfo.target,
      this.convertedInfo.base,
      this.resultToFromValues
    );
  }

  getResultValues(from, to, arr) {
    let params = this.ApiService.createParams({
      access_key: this.API_KEY,
      symbols: `${from},${to}`,
      foramt: 1,
    });

    this.ApiService.get(`/latest?${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;
        let baseRate = result.rates[from];
        let targetRate = result.rates[to];

        this.amountValues.forEach((element) => {
          arr.push(element * (targetRate / baseRate));
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
