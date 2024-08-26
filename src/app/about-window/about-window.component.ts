import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PathsEnum} from "../../model/enums/PathsEnum";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-about-window',
  templateUrl: './about-window.component.html',
  styleUrls: ['./about-window.component.sass']
})
export class AboutWindowComponent {

  protected readonly PathsEnum = PathsEnum;

  public showFeedbackWindow: boolean = false;
  public feedbackForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    message: [undefined, Validators.required]
  });

  constructor(
    public readonly router: Router,
    public readonly formBuilder: FormBuilder
  ) {
  }

  protected toggleFeedbackWindow(): void {
    this.feedbackForm.reset();
    this.showFeedbackWindow = !this.showFeedbackWindow;
  }

  public async onSubmit(): Promise<void> {
    const subject: string = `XPQuiz - Suggestions from ${this.feedbackForm.controls['name'].value}`;
    const body: string = encodeURI(this.feedbackForm.controls['message'].value)

    window.location.href = `mailto:xpquiz.github.io@gmail.com?subject=${subject}&body=${body}`;
  }

  public shouldDisableSendButton(): boolean {
    return !this.feedbackForm.valid;
  }

  public shouldShowErrorMessage(formControlName: string): boolean {
    const formControl: AbstractControl = this.feedbackForm.controls[formControlName];

    if (!this.feedbackForm.touched && !formControl.touched)
      return false;

    return !formControl.valid;
  }
}
