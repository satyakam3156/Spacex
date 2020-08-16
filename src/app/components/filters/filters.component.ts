import { Component, OnInit } from '@angular/core';
import { FiltersService, Filters } from 'src/app/services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  years=['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
  '2016','2017','2018','2019','2020'];
  constructor(public _filterService:FiltersService) { }

  ngOnInit(): void {
  }

  filter(filterName,value){
    let filter = this._filterService.filters$.value;
    let updated = {};
    switch(filterName){
      case 'year':
         updated = {
          ...filter,
          year: value
        }
        this._filterService.filters$.next((updated as Filters));
        console.log('Updated filter',updated);
        break;
        case 'launch':
         updated = {
          ...filter,
          launchStatus: value
        }
        this._filterService.filters$.next((updated as Filters));
        console.log('Updated filter',updated);
        break;
        case 'land':
         updated = {
          ...filter,
          landingStatus: value
        }
        this._filterService.filters$.next((updated as Filters));
        console.log('Updated filter',updated);
        break;
        
    }
  }

  reset(){
    this._filterService.filters$.next({
      landingStatus:null,
      launchStatus:null,
      year:null
    })
    this._filterService.reset();
  }
}
