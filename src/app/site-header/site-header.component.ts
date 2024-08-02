import { Component , OnInit} from '@angular/core';
import { IUser } from '_course-resources/user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  user:IUser | null = null;
 showSignOutMenu: Boolean = false;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.getUser().subscribe({
      next: (user) => { this.user = user }
    })
  }

  toggleSignOutMenu(){
    this.showSignOutMenu = !this.showSignOutMenu;
  }
  
  signOut() {
    this.userSvc.signOut();
    this.showSignOutMenu = false;
  }
}
