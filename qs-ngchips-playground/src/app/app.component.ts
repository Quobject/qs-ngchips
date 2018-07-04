import { Component } from '@angular/core';

@Component({
  selector: 'qs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qs';
  items = ['Pizza', 'Pasta', 'Parmesan'];

  onFormChange() {
    console.log('onFormChange');
  }

}
