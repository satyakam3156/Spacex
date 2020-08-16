import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import { LaunchsService } from './launchs.service';
import * as _ from 'underscore';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public filters$: BehaviorSubject<Filters> = new BehaviorSubject({
    year:null,
    launchStatus:null,
    landingStatus:null
  })
  constructor(private _http:HttpClient, private _launchService:LaunchsService,private spinner:NgxSpinnerService) {
    this.filters$.subscribe(res=>{
      this.applyFilter();
    })
   }

  yearFilter(){

    let filtered = _.filter(this._launchService.allLaunches, (launch)=> launch['launch_year'] === this.filters$.value.year );
    this._launchService.launchsList$.next(filtered);
  } 

  launchFilter(){
    this.spinner.show();
      this._http.get(baseUrl+'&launch_success='+this.filters$.value.launchStatus).subscribe(res=>{
        console.log(res);
        
        this._launchService.launchsList$.next((res as Array<Object>));
        this.spinner.hide();
      })
  }

  landFilter(){
    let filters = this.filters$.value;
    let filtered = _.filter(this._launchService.allLaunches, (launch)=> launch['land_success'] === this.filters$.value.landingStatus );
    this._launchService.launchsList$.next(filtered);
    console.log(filtered);
    
  }

  launchLandFilter(){
    this.spinner.show();
      this._http.get(baseUrl+'&launch_success='+this.filters$.value.launchStatus+'&land_success='+this.filters$.value.landingStatus).subscribe(res=>{
        this._launchService.launchsList$.next((res as Array<Object>));
        this.spinner.hide();
      })
  }

  yearLandFilter(){
    let yearfiltered = _.filter(this._launchService.allLaunches, (launch)=> launch['launch_year'] === this.filters$.value.year );
    let combinedFilter = _.filter(yearfiltered, (launch)=> launch['land_success'] === this.filters$.value.landingStatus )
    this._launchService.launchsList$.next((combinedFilter as Array<Object>));
    
  }
  yearLaunchFilter(){
    let yearfiltered = _.filter(this._launchService.allLaunches, (launch)=> launch['launch_year'] === this.filters$.value.year );
    let combinedFilter = _.filter(yearfiltered, (launch)=> launch['launch_success'] === this.filters$.value.landingStatus )
    this._launchService.launchsList$.next((combinedFilter as Array<Object>));
    
  }
  combinedFilter(){
    this.spinner.show();
    this._http.get(baseUrl+'&launch_success='+this.filters$.value.launchStatus+'&land_success='+this.filters$.value.landingStatus+'&launch_year='+this.filters$.value.year).subscribe(res=>{
      this._launchService.launchsList$.next((res as Array<Object>));
      this.spinner.hide();
    })
  }


  reset(){
    this._launchService.fetchAllLaunches();
  }

  applyFilter(){
    let filters = this.filters$.value;
    filters.year && filters.launchStatus && filters.landingStatus?this.combinedFilter():null;
    filters.launchStatus && filters.landingStatus && !filters.year?this.launchLandFilter():null;
    filters.year && filters.landingStatus && !filters.launchStatus?this.yearLandFilter():null;
    filters.year && filters.launchStatus && !filters.landingStatus?this.yearLaunchFilter():null;
    filters.year && !filters.launchStatus && !filters.landingStatus?this.yearFilter():null
    !filters.year && filters.launchStatus && !filters.landingStatus?this.launchFilter():null;
    !filters.year && !filters.launchStatus && filters.landingStatus?this.landFilter():null;

  }
}

export interface Filters{
  year:number;
  launchStatus:boolean;
  landingStatus:boolean;
}
