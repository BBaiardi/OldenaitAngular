import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../core/services/club.service';
import { Club } from '../../core/models/club';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  clubs: Club[];

  lat: number;
  lng: number;

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.userGetLocation();
    this.clubService.getClubs().subscribe(clubs => {
      this.clubs = clubs;
    });
  }

  private userGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}
