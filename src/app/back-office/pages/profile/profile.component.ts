import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Profile, ApiResponse } from './profile.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: Profile;
  isLoading = true;
  profileSub: Subscription;
  private headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  };
  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.profileSub = this.httpClient
      .get<Profile>('/api/user', {
        headers: this.headers
      })
      .subscribe(response => {
        console.log(response);
        this.userProfile = response;
        this.isLoading = false;
        this.profileForm = this.fb.group({
          firstname: [this.userProfile.firstname, Validators.required],
          lastname: [this.userProfile.lastname, Validators.required],
          address: [this.userProfile.address, Validators.required],
          address2: [this.userProfile.address2],
          city: [this.userProfile.city],
          postal_code: [this.userProfile.postal_code],
          email: [this.userProfile.email, Validators.required],
          company_name: [this.userProfile.company_name, Validators.required],
          company_description: [this.userProfile.company_description]
        });
      });
  }

  updateProfile(updatedProfile: Profile): void {
    this.httpClient
      .post<ApiResponse>('/api/profile', updatedProfile, {
        headers: this.headers
      })
      .subscribe(response => {
        if (response.status === 200) {
          this.snackBar.open('Your change is saved! :)', 'Yes', {
            duration: 2000
          });
        } else {
          this.snackBar.open('Error, please try again', 'Ooops!!', {
            duration: 2000
          });
        }
      });
  }
}
