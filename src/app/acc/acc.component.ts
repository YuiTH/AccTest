import { Component, OnInit } from '@angular/core';
import {fromEvent, timer} from 'rxjs';
import {debounce, throttle} from 'rxjs/operators';
import {Acc} from '../Acc';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.css']
})
export class AccComponent implements OnInit {
  acc = new Acc();
  accres = 'Test';
  private event: any;
  constructor() { }

  ngOnInit() {
    this.AddListener();
  }
  AddListener() {
    if (DeviceOrientationEvent) {
      console.log('mobile!');
      const source = fromEvent(window, 'deviceorientation')
        .pipe(throttle(() => timer(100)));
      const subscrible = source.subscribe(event => {
        const acc = new Acc();
        this.event = event;
        acc.x = this.event.alpha;
        acc.y = this.event.beta;
        acc.z = this.event.gamma;
        this.accres = acc.print();
        console.log(acc);
      });
      // }
      // if (DeviceOrientationEvent) {
      //   console.log("Mobile!");
      //   window.addEventListener('deviceorientation', this.deviceMotionHandler,false);
      //   this.is_mobile = true;
      //   if (this.article) {
      //     if (!this.content) {
      //       this.content = this.article.content;
      //     }
      //     this.article.content = this.content + this.acc.print();
      //   }
    } else {
      console.log('not Mobile!');
    }
  }
  deviceMotionHandler(event) {
    const acc = new Acc();
    acc.x = event.alpha;
    acc.y = event.beta;
    acc.z = event.gamma;
    this.accres = acc.print();
    console.log(acc);
  }

}
