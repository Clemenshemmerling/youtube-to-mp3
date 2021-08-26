import { Component, OnInit } from '@angular/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  siteKey: string = '6LcgSSQcAAAAABDUlhWqBZUCxexjSTJWtSmY0t4x';
  URL: string = '';
  loader: boolean = false;
  info: any = null;

  constructor(
    private reCaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  createLink() {
    this.loader = true;
    this.info = null;
    this.reCaptchaV3Service.execute(this.siteKey, 'homepage', (token) => {
      const headers = {
        token,
        'x-api-key': 'OLR7QKp2np9ImJ0RVnE5K5fp2G1AzxY4CAHjCbt3',
      };

      const code = this.URL.replace('https://www.youtube.com/watch?v=', '');
      this.http
        .get(
          `https://clemensk.korconnect.io/youtube-music/dl?id=${code}`,
          { headers }
        )
        .subscribe((response) => {
          this.info = response;
          this.loader = false;
          this.URL = '';
        });
    });
  }
}
