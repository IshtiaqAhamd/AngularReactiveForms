import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Reactive Forms';
  myHobbies: string[] = ["Coding", "Programming", "Testing", "Debugging"];
  reactiveForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    age: new FormControl("", [Validators.required, Validators.min(18), Validators.max(65)]),
    email: new FormControl("", [Validators.required, Validators.pattern('^([0-9a-zA-Z]([-\\.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$')]),
    password: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue]),
    hobbies: new FormArray([], [Validators.required])
  });

  formData() {

    console.log(this.reactiveForm.value);
    
  }

  get control() {

    return this.reactiveForm.controls;
  }
  onChange(e: any) {
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    console.log(checkedValue, checked);

    const checkedArray = this.reactiveForm.get('hobbies') as FormArray;

    if (checked) {
      checkedArray.push(new FormControl(checkedValue));
    }
    else {
      let i: number = 0;
      checkedArray.controls.forEach((item) => {
        if (item.value == checkedValue) {
          checkedArray.removeAt(i);
        }
        i++;
      })
    }
  }

}
