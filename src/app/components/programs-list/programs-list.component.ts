import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LaunchsService } from 'src/app/services/launchs.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [];
  @Input() cols;

  constructor(private _launchService:LaunchsService) {
  }

  ngOnInit(){
    this._launchService.launchsList$.subscribe(res=>this.cards = [...res])
  }
}
