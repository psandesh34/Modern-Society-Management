import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateComponent } from '../update/update.component';

export interface memberInterface {
  firstName:string;
  mobileNumber: number;
  contactEmail: string;
  gender:string;
  _id: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public data: any;
  public token: string;
  public userId: string;
  public isVisible= false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if(this.userId == '5f27dca3d2893440549a79bb') this.isVisible = true;
    if(!this.userId) this.router.navigate(['/login']);
    this.http.get("http://localhost:3000/user", {
      params: { userId: this.userId }
    })
      .subscribe(
        (val: any) => {
          if (val.success) {
            this.data = val.data;
            console.log(val.data);
            this.isVisible = true;
          }
        },
        response => {
          this.snackBar.open(`Error: ${response.erorr.errorMessages[0].message}`, 'Close', {
            duration: 7000,
            panelClass: "snackbar",
            verticalPosition: "bottom"
          });
        });
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId');
    console.log('userId: ',localStorage.getItem('userId'))
    this.router.navigate(['/login']);
  }
}
