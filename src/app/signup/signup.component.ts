import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators   } from '@angular/forms';
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
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]] 
    })
  }
  signUp(){
   if(this.signUpForm.valid){
    console.log(this.signUpForm.value)
    this.http.post<any>("http://localhost:3000/signup", this.signUpForm.value).subscribe((res)=>{
      alert("success")
      this.signUpForm.reset();
      this.router.navigate(["login"]);
    }, err=>{
      console.log("some went wrong")
    })
   }else{
    alert("please enter valid")
   }
  }

}
