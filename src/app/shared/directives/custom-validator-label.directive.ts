import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[CustomValidatorLabel]',
  standalone: true
})
export class CustomValidatorLabelDirective {

  private _errors?: ValidationErrors | null;
  private _touched?: boolean = false;
  private _htmlElement?: ElementRef<HTMLElement>;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  @Input() set touched(value: boolean) {
    this._touched = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this._htmlElement = el;
  }

  setErrorMessage(): void {
    if (!this._htmlElement) return;

    if (!this._errors) {
      this._htmlElement.nativeElement.innerHTML = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required') && this._touched) {
      this._htmlElement.nativeElement.innerHTML = 'Este campo es requerido.';
      return;
    }

    if (errors.includes('minlength') && this._touched) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this._htmlElement.nativeElement.innerHTML = `Minimo ${current}/${min} caracteres.`;
      return;
    }

    if (errors.includes('email') && this._touched) {
      this._htmlElement.nativeElement.innerHTML = 'No tiene el formato de Email.';
      return;
    }

  }
}