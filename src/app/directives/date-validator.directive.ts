import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[DateValidator][ngModel], [DateValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidator), multi: true }
]
})
export class DateValidator implements Validator {
  constructor( @Attribute('DateValidator') public DateValidator: string) {}

  validate(c: AbstractControl): { [key: string]: any } {

    console.log('test');
    let e = c.root.get(this.DateValidator);
    if(e.value) return {DateValidator: false}
    
  }
}
