import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  seconds: number = 0;
  url: string;
  responseString: string;
  timer;
  running: boolean = false;
  public startStop = "Start";
  public output = [];
  finished: boolean;
  config;
  getUrl;
     
  constructor(public http: HttpClient) {
    http.get('./assets/app-config.json').subscribe(
        (result: any) => {
            //this.getUrl = result.geturl;
            this.getUrl = result.get;  
        }
    );
  }
    
  toggleInterval() {
      if (!this.running) {
          this.timer = setInterval( () => {
              
              this.http.get(this.getUrl + this.url, {responseType: 'text'}).subscribe(
                (result) => {
                    if (result.indexOf(this.responseString) === -1) {
                        this.output.push(result);
                        this.resetUI();
                    }else{
                        this.output.push(result);
                    }
                },
                (error) => {
                   this.output.push(error.message);
                   this.resetUI();
                }
              );
              
          }, (this.seconds*1000) );
          this.startStop = "Stop";
      }else{
          this.startStop = "Start";
          clearInterval(this.timer);
      }
      this.running = !this.running;
  }
    
  resetUI() {
      this.startStop = "Start";
      clearInterval(this.timer);
      this.finished = true;
  }
}
