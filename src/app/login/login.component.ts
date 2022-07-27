import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.minLength(4)]]
    })
  }
  login(){
   if(this.loginForm.valid){
    this.http.get<any>("http://localhost:3000/signup").subscribe((res)=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      if(user){
        alert("login successfull")
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not found")
      }
    }, err=>{
      alert("some thing wrong")
    })
   }else{
    alert("Please enter valid details")
   }
  }








}
