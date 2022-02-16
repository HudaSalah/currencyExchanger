import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ConverterModel } from 'src/app/models/converter-model';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  ConverterForm: FormGroup;
  ConverterObj: ConverterModel = new ConverterModel();
  currencyOutput = 0;
  currencyData = [
    { id: '', name: '' },
  ];;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private validation: FormValidatorService
  ) {}

  private initForm() {
    this.ConverterForm = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
  }

  getConverterFormControl() {
    return this.ConverterForm.controls;
  }

  hasError(itemName, errorName) {
    if (
      (this.getConverterFormControl()[itemName].dirty ||
        this.getConverterFormControl()[itemName].touched) &&
      this.getConverterFormControl()[itemName].invalid
    ) {
      if (this.getConverterFormControl()[itemName].errors[errorName]) {
        return true;
      }
    }
  }

  getServerErr(itemName) {
    return this.getConverterFormControl()[itemName].errors.serverError[0];
  }

  redirectTo() {
    // this.router.navigate(['/profile']);
  }

  setFromCurrency(){}
  setToCurrency(){}
  onSubmit(ConverterForm) {
    if (ConverterForm.invalid) {
      this.validation.validateAllFormFields(ConverterForm);
      return;
    }
    // call service
    // (err) => {
    //   console.log(err.response.data.errors);
    //   this.validation.validateAllErrorsFormFields(err, ConverterForm);
    // }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
