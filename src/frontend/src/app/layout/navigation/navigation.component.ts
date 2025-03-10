import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {

    if (sessionStorage.getItem('username') !== null) {
      const logout = document.getElementById('logout');
      console.log('logout:', logout);
      logout?.classList.remove('noLogin');
    }
  }

  deleteSession() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
