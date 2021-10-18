import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public userId: string;
  public updateUserId: string;
  public data: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }
  public updateForm = new FormGroup({
    contactEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    flatNumber: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.updateUserId = this.activatedRoute.snapshot.paramMap.get('userId');
    console.log(this.updateUserId);
    this.http.get("http://localhost:3000/user", {
      params: { userId: this.updateUserId }
    })
      .subscribe(
        (val: any) => {
          console.log(val);
          if (val.success) {
            this.data = val.data;
            this.setValueOfTextbox(
              val.data.contactEmail,
              val.data.password,
              val.data.firstName,
              val.data.lastName,
              val.data.mobileNumber,
              val.data.flatNumber,
              val.data.gender
            );
          }
        },
        response => {
          this.snackBar.open(`Error: ${response.erorr.errorMessages[0].message}`, 'Close', {
            duration: 7000,
            panelClass: "snackbar",
          });
        });
  }

  setValueOfTextbox(
    contactEmail: string,
    password: string,
    firstName: string,
    lastName: string,
    mobileNumber: string,
    flatNumber: string,
    gender: string
  ) {
    this.updateForm.controls.contactEmail.setValue(contactEmail);
    this.updateForm.controls.password.setValue(password);
    this.updateForm.controls.firstName.setValue(firstName);
    this.updateForm.controls.lastName.setValue(lastName);
    this.updateForm.controls.mobileNumber.setValue(mobileNumber);
    this.updateForm.controls.flatNumber.setValue(flatNumber);
    this.updateForm.controls.gender.setValue(gender);
  }

  updateUser() {
    console.log(this.updateForm.value);
    this.http.put("http://localhost:3000/user/update", this.updateForm.value, {
      params: { userId: this.updateUserId }
    })
      .subscribe(
        (val: any) => {
          if (val.success)
            this.snackBar.open(`Updated successfully`, 'Close', {
              duration: 7000,
              panelClass: "snackbar-success",
            });
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
