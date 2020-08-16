import { Component, OnInit, HostListener } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public cols=4;
  public rows;
  constructor() { }

  ngOnInit(): void {
    this.panelLoad();
  }

  @HostListener('window:resize',['$event'])
  onResize=(event)=>{
    this.panelLoad(); 
  }
  panelLoad = _.throttle(this.panelLayout(),300,{leading:true});
  panelLayout():Function{
    return function () {
      console.log(window.innerWidth);
      if(window.innerWidth <= 1024 && window.innerWidth > 700 ){
        this.cols = 2;
      }
      if(window.innerWidth <=700){
        this.cols = 1;
      }
      if(window.innerWidth>1024){
        this.cols = 4;
      }
    }
  }
}