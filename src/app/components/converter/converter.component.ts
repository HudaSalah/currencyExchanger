import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
// import { ConverterModel } from 'src/app/models/converter-model';
import { FixerResponse } from 'src/app/models/FixerResponse-model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  ConverterForm: FormGroup;
  // ConverterObj: ConverterModel = new ConverterModel();
  FixerResponse: FixerResponse = new FixerResponse();
  @Input() From;
  @Input() To ;
  @Input() disableInput ;

  @Output() convertedInfo : EventEmitter<object> =   new EventEmitter();
  convertedVal;
  currencyData = [];
  isloading = false;
  API_KEY: string = environment.API_KEY;
  constructor(
    private router: Router,
    private validation: FormValidatorService,
    private ApiService: ApiService,
    private dataService: DataService,
    @Inject(DOCUMENT) private document: Document,
    private serializer: UrlSerializer
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

  redirectTo() {
    // this.router.navigate(['/profile']);
  }

  getCurrencies() {
    let params = this.createParams();
    this.ApiService.get(`/symbols${params}`).subscribe(
      (res) => {
        console.log(res);
        let result = res as FixerResponse;

        Object.entries(result.symbols).forEach(([key, value]) => {
          this.currencyData.push({ id: key, name: value });
        });
        this.currencyData = [...this.currencyData];
        console.log(this.currencyData);
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

  createParams(values?) {
    // debugger
    const tree = this.router.createUrlTree([], {
      queryParams: {
        access_key:this.API_KEY,
        from : values?.base,
        to : values?.target,
        amount : values?.amount
      },
    });
    // let params = this.serializer.serialize(tree).substring(1);
    let params = `?access_key=${this.API_KEY}`
    return params;
  }

  onSubmit(ConverterForm) {
    console.log(ConverterForm.value)
    if (ConverterForm.invalid) {
      this.validation.validateAllFormFields(ConverterForm);
      return;
    }

    this.convertedVal = ConverterForm.value;
    this.convertedVal.result = '233';
    this.convertedInfo.emit(this.convertedVal);

    // let params = this.createParams(ConverterForm.value);
    // this.ApiService.get(`/convert${params}`).subscribe(
    //   (res) => {
    //     console.log(res);
    //     let result = res as FixerResponse;
    //     this.convertedVal.result = result.result;
    //     this.convertedInfo.emit(this.convertedVal);
    //   },
    //   (err) => {
    //     console.log(err.response.data.errors);
    //     this.validation.validateAllErrorsFormFields(err, ConverterForm);
    //   }
    // );
  }

  setDropdownVal(){
    this.ConverterFormControl.base.setValue(this.From);
    this.ConverterFormControl.target.setValue(this.To);
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrencies();
    this.setDropdownVal();
  }
}
