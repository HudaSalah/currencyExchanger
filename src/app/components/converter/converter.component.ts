import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FixerResponse } from 'src/app/models/FixerResponse-model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  ConverterForm: FormGroup;
  FixerResponse: FixerResponse = new FixerResponse();
  @Input() From;
  @Input() To;
  @Input() disableInput;
  @Output() convertedInfo: EventEmitter<object> = new EventEmitter();

  convertedVal;
  currencyData = [];
  isloading = false;
  API_KEY: string = environment.API_KEY;
  constructor(
    private validation: FormValidatorService,
    private ApiService: ApiService
  ) {}

  private initForm() {
    this.ConverterForm = new FormGroup({
      base: new FormControl(null, [Validators.required]),
      target: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  get ConverterFormControl() {
    return this.ConverterForm.controls;
  }

  hasError(itemName, errorName) {
    if (
      (this.ConverterFormControl[itemName].dirty ||
        this.ConverterFormControl[itemName].touched) &&
      this.ConverterFormControl[itemName].invalid
    ) {
      if (this.ConverterFormControl[itemName].errors[errorName]) {
        return true;
      }
    }
  }

  getServerErr(itemName) {
    return this.ConverterFormControl[itemName].errors.serverError[0];
  }

  getCurrencies() {
    // this.isloading = true;
    this.ApiService.get(`/symbols?access_key=${this.API_KEY}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;

        Object.entries(result.symbols).forEach(([key, value]) => {
          this.currencyData.push({ id: key, name: value });
        });
        this.currencyData = [...this.currencyData];
        // this.isloading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  swap() {
    let temp = this.ConverterFormControl.base.value;
    this.ConverterFormControl.base.setValue(
      this.ConverterFormControl.target.value
    );
    this.ConverterFormControl.target.setValue(temp);
  }

  onSubmit(ConverterForm) {
    console.log(ConverterForm.value);
    if (ConverterForm.invalid) {
      this.validation.validateAllFormFields(ConverterForm);
      return;
    }

    let params = this.ApiService.createParams({
      access_key: this.API_KEY,
      symbols: `${ConverterForm.value.base},${ConverterForm.value.target}`,
      foramt: 1,
    });

    this.ApiService.get(`/latest?${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;
        let ratesOfCurrency = result.rates;

        let baseRate = ratesOfCurrency[ConverterForm.value.base];
        let targetRate = ratesOfCurrency[ConverterForm.value.target];
        let amount = ConverterForm.value.amount;

        this.convertedVal = ConverterForm.value;
        this.convertedVal.result = (targetRate / baseRate) * amount;
        this.convertedInfo.emit(this.convertedVal);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setDropdownVal() {
    this.ConverterFormControl.base.setValue(this.From);
    this.ConverterFormControl.target.setValue(this.To);
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrencies();
    this.setDropdownVal();
  }
}
