import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { StorageService } from '../storage.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private notifier: NotifierService;
  email: string = '';
  password: string = '';
  gender: string = '';
  name: string = '';
  confirmPassword: string = '';

  /**
   * Constructor
   *
   * @param {NotifierService} notifier Notifier service
   */
  constructor(private loginService: RegisterService,
    private router: Router,
    private localStorage: StorageService, notifier: NotifierService) {
    this.notifier = notifier;
  }


  ngOnInit(): void {
  }

  register(): void {

    try {
      if (!this.email || !this.password || !this.gender || !this.name || !this.confirmPassword) {
        throw new Error('Preencha todos os campos');
      }

      if (this.password != this.confirmPassword)
        throw new Error('As senhas não coincidem');

      this.loginService.register(this.email, this.name, this.gender, this.password,).subscribe((user) => {
        this.localStorage.set('authorization', btoa(this.email + ':' + this.password));
        this.router.navigate(['/']);
      }, () => {
        throw new Error('Não foi possível realizar o cadastro no momento, tente novamente mais tarde');
      });

      this.notifier.notify('success', 'Conta criada com sucesso');

    } catch (ex: any) {
      this.notifier.notify('error', ex);
    }

  }

}

