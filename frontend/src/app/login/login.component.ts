import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar:MatSnackBar
  ) { }
  public loginForm = new FormGroup({
    contactEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }
  login() {
    this.http.post("http://localhost:3000/login", this.loginForm.value)
      .subscribe(
        (val: any) => {
          if(val.success)
          {
            localStorage.setItem('token', val.data.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', val.data.id);
            localStorage.setItem('userRole', val.data.role);
            this.router.navigate(['/profile']);
          }
          else {
            this.snackbar.open(`Error: ${val.errorMessages[0].message}`,'Close', {
              duration:10000,
              panelClass: "snackbar",
            });
          }
        },
        response => {
          console.log("Error", response);
        });
  }

}
