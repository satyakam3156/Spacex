import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

import {baseUrl} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LaunchsService {

  public launchsList$:BehaviorSubject<Array<Object>> = new BehaviorSubject<Array<Object>>([]);
  public allLaunches:Array<object> = []; 


  constructor(private _http:HttpClient, private spinner:NgxSpinnerService) {
    this.fetchAllLaunches();
   }

  fetchAllLaunches(){
    this.spinner.show();
    this._http.get(baseUrl).subscribe(res=>{
      this.launchsList$.next((res as Array<Object>));
      this.allLaunches = (res as Array<Object>);
      this.spinner.hide()
    })
  }
}
