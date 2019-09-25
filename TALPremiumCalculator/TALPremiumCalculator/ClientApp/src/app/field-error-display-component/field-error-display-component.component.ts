import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display-component',
  templateUrl: './field-error-display-component.component.html'
})
export class FieldErrorDisplayComponentComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;
  constructor() { }

  ngOnInit() {
  }

}
