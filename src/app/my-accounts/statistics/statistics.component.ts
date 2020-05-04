import { Component, OnInit } from '@angular/core';
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {Account} from "../../models/account.model";
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  income: number = 0;
  expenses: number = 0;

  tIncome: number = 0;
  tExpenses: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.store.select('account')
      .subscribe( ({ items }) => this.generateStatistic(items) )
  }

  generateStatistic( items: Account[] ) {
    this.tIncome = 0;
    this.tExpenses = 0;
    this.income = 0;
    this.expenses = 0;
    for ( const item of items){
      if( item.type === 'income' ) {
        this.tIncome += item.amount;
        this.income++;
      } else {
        this.tExpenses += item.amount;
        this.expenses++;
      }
    }

    this.doughnutChartData = [ [this.tIncome, this.tExpenses] ];
  }

}
