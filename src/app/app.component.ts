import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stocks';
  public isMenuOpen: boolean = false;

  myFunction() {
    console.log(`myFunction used`);
    var x = document.getElementById("myLinks") as HTMLElement;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
