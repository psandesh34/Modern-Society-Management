import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
const URL = 'http://localhost:3000/upload';
@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file'
  });
  public userId : string;
  public isVisible: boolean;
  
  constructor(private router: Router) {
    
  }
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    console.log(`UploadfilesComponent -> ngOnInit -> this.userId`, this.userId);
    if(this.userId == '5f27dca3d2893440549a79bb') this.isVisible = true;
    console.log(`UploadfilesComponent -> ngOnInit -> this.isVisible`, this.isVisible);
    
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId');
    console.log('userId: ',localStorage.getItem('userId'))
    this.router.navigate(['/login']);
  }
}
