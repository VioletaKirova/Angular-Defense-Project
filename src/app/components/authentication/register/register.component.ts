import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: [null, [ Validators.required, Validators.minLength(6)] ],
        rePassword: [null, [ Validators.required]]
      }, {validator: this.confirmPasswords})
    });
  }

  confirmPasswords(frm: FormGroup) {
  // tslint:disable-next-line: no-string-literal
  return frm.controls['password'].value === frm.controls['rePassword'].value ? null : {mismatch: true};
  }

  register() {
    const { email, passwords } = this.form.value;
    const { password } = passwords;

    this.authService.registerUser(email, password);
  }
}
