import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'msm-ui';
  public userId: any;
  public isLoggedIn= localStorage.getItem('isLoggedIn');
  constructor(
    private http: HttpClient,
    private router: Router,
    private ref: ChangeDetectorRef) {
    }
    
    ngOnInit() {
      setInterval(() => {
        if(JSON.parse(localStorage.getItem('isLoggedIn')) != this.isLoggedIn){
          this.isLoggedIn= localStorage.getItem('isLoggedIn');
          this.ngOnInit();
        }
      }, 500);
      console.log(`AppComponent -> isLoggedIn`, this.isLoggedIn);
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId');
    console.log('userId: ',localStorage.getItem('userId'))
    this.router.navigate(['/login']);
    //   this.http.put("http://localhost:3000/user/update", this.updateForm.value, {
    //     params: { userId: this.updateUserId }
    //   })
    //     .subscribe(
    //       (val: any) => {
    //         if (val.success)
    //           this.snackBar.open(`Updated successfully`, 'Close', {
    //             duration: 7000,
    //             panelClass: "success-snackbar",
    //           });
    //         this.router.navigate(['/profile']);
    //       },
    //       response => {
    //         console.log("POST call in error", response);
    //       },
    //       () => {
    //         console.log("The POST observable is now completed.");
    //       });
    // }
  }

}