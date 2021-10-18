import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userId = localStorage.getItem('userId');

  constructor(private http: HttpClient, private router:Router) { }
  public registerForm = new FormGroup({
    contactEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    flatNumber: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  registerUser() {
    this.http.post("http://localhost:3000/register", this.registerForm.value)
      .subscribe(
        (val: any) => {
          if (val.success)
            this.router.navigate(['/profile']);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }
}
