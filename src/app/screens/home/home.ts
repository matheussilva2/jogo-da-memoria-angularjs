import { Component, inject } from '@angular/core';
import { AuthService } from "../../services/auth";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private auth = inject(AuthService);
  private router = inject(Router);
  
  nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  login(event: SubmitEvent) {
    event.preventDefault();

    const player_name = this.nameControl.value;

    if(this.nameControl.valid) {
      this.auth.login(player_name);
      this.router.navigate(['/jogar']);
    }
  }
}
