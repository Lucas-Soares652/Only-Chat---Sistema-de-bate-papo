import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './authenticated.guard';
import { FriendsComponent } from './friends/friends.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddfriendComponent } from './addfriend/addfriend.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addfriend', component: AddfriendComponent, canActivate: [AuthenticatedGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthenticatedGuard] },
  { path: 'friends/:id/chat', component: ChatComponent, canActivate: [AuthenticatedGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  //mports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
