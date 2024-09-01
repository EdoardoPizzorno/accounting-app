import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(public platform: Platform, private profileService: ProfileService) { }

  async ngOnInit() {
    await this.profileService.getUser();
  }

}
