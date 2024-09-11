import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';



@Component({
  selector: 'app-register-user',
  standalone: true,

  imports: [CommonModule, FormsModule, RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: [
    './register-user.component.scss',
    './register-user.component.media.scss',
  ]
})

export class RegisterUserComponent {

  myForm: FormGroup; // name - just for now
  securityForm: FormGroup; // name just for now

  constructor(private fb: FormBuilder) {

    /*
    age-validator - IF NEEDED
    function ageValidator(control: FormControl): { [key: string]: boolean } | null {
      if (control.value !== null && control.value < 18) {
        return { 'ageInvalid': true }; 
      }
      return null;
    }
    this.myForm = new FormGroup({
      age: new FormControl('', [ageValidator])
    });
    */

    const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
    const antiSqlPattern = '^[^\'";]*$';
    const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

    /*
    IMPORTANTE
      -> pwd - reg-ex:
        at least one uppercase letter,
        at least one lowercase letter,
        at least one number,
        at least one special character,
        a minimum length of 8 characters.
      -> anti-sql - reg-ex:
        no ' or " or ;   // to be checked - may be edited
    */
   
    // if u got two forms, i.e.: security & myForm -> do this twice, for each form

    this.securityForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        // Validators.minLength(5), 
        Validators.pattern(antiSqlPattern)  
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8), // for this case, norm:18+
        Validators.pattern(passwordPattern)  
      ])
    });

    this.myForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
        // Validators.minLength(5)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(emailPattern)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      terms: new FormControl(false, [
        Validators.requiredTrue // is checkbox marked or not
      ])
    });

    // another way of writing that : (causes problems when more than 1 formGroup)
    // this.myForm = this.fb.group({ // fb - FormBuilder angular intern shortcut
    //   name: ['', Validators.required, Validators.minLength(5)],
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   terms: [false, Validators.requiredTrue]
    // });
  }

  onSubmit() {
    if (this.myForm.valid && this.securityForm.valid) {
      console.log('current (valid) form is: ', this.myForm.value);
    } else {
      console.log('Form is invalid, go home! .. or else ..');
    }
  }
}
