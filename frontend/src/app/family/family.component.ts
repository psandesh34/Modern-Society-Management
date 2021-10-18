import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
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
  public displayedColumns = ['flatNumber', 'firstName', 'lastName', 'mobileNumber', 'contactEmail', 'deleteAction'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole == 'admin') this.displayedColumns.push('deleteAction')
    this.http.get("http://localhost:3000/family")
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

}

export interface memberInterface {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  flatNumber: string;
  _id: string;
}
