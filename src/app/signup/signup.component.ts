import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signup", this.signUpForm.value).subscribe((res)=>{
      alert("success")
      this.signUpForm.reset();
      this.router.navigate(["login"]);
    }, err=>{
      console.log("some went wrong")
    })
  }

}
