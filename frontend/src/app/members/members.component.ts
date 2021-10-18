import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  public userId: string;
  public userRole: string;
  public data: any;
  public isVisible = false;
  public isActive = false;
  public isAdmin = false;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router:Router
    ) { }
  public displayedColumns = ['flatNumber', 'firstName', 'lastName', 'mobileNumber', 'contactEmail'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole == 'admin') this.displayedColumns.push('deleteAction')
    this.http.get("http://localhost:3000/users")
      .subscribe(
        (val: any) => {
          if (val.success) {
            this.data = new MatTableDataSource<memberInterface>(val.data);
            this.isVisible = true;
            this.data.paginator = this.paginator;
          }
        },
        response => {
          this.snackBar.open(`Error: ${response.erorr.errorMessages[0].message}`, 'Close', {
            duration: 7000,
            panelClass: "snackbar",
          });
        });
  }

  onDelete(userId: string) {
    console.log(userId);
    this.http.patch("http://localhost:3000/user/delete", {userId})
      .subscribe(
        (val: any) => {
          if (val.success) {
            this.snackBar.open(`Deleted successfully`, 'Close', {
              duration: 7000,
              panelClass: "snackbar-success",
            });
            this.ngOnInit();
          }
          console.log(val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }
}


export interface memberInterface {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  flatNumber: string;
  _id: string;
}
