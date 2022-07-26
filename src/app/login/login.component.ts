import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
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
  loinForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loinForm= this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signup").subscribe((res)=>{
      const user = res.find((a:any)=>{
        return a.email === this.loinForm.value.email && a.password === this.loinForm.value.password
      })
      if(user){
        alert("login successfull")
        this.loinForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not found")
      }
    }, err=>{
      alert("some thing wrong")
    })
  }
}
