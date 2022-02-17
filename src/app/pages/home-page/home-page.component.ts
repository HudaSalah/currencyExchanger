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
    this.resultFromToValues = this.getResultValues(this.convertedInfo.base, this.convertedInfo.target);
    this.resultToFromValues = this.getResultValues(this.convertedInfo.target, this.convertedInfo.base);
    console.log(this.convertedInfo);
  }

  getResultValues(from, to) {
    let resultValues = [];
    let params = {
      access_key: this.API_KEY,
      from: from,
      to: to,
      amount: 1,
    };
    this.ApiService.get(`/convert${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;
        let output = result.result; // 15
        this.amountValues.forEach((element) => {
          resultValues.push(element * output);
        });
      },
      (err) => {
        console.log(err);
      }
    );
    return resultValues;
  }

  ngOnInit(): void {}
}
