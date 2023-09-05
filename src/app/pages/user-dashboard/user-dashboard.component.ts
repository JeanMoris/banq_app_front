import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { LightInfoInput } from 'src/app/components/light-info/light-info.component';
import { HelperService } from 'src/app/services/helper/helper.service';
import { StatisticService } from 'src/app/services/services';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],


})
export class UserDashboardComponent implements OnInit{

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  selected: Date | null;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(
    private statisticsService: StatisticService,
    private helper: HelperService,
    private datePipe: DatePipe

  ){}


  ngOnInit(): void {
    this.initializeAccountInfo();

  }

  accountInfoList: Array<LightInfoInput> = [];
  private accountBalance = 0;
  private highestTransfer = 0;
  private highestDeposit = 0;
  chartType: ChartType = 'line';
  dataset: ChartDataset[] = [{data: [], label: '', spanGaps: true}];
  labels: string[] = []
  chartOptions: ChartOptions = {
    scales: {
      r:{
        ticks: {
          backdropPadding: {
             width: 500
          }
        }
      }
    },
    responsive: true,

    layout: {
      padding: {
        right: 2
      }
    },
    plugins:{
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      }
    }
  }

  // dateOptions: DatepickerOptions = {
  //   format: 'yyyy-MM-dd'
  // };
   startDate = this.range.value.start;
   endDate = this.range.value.end;

   filterStatistics(){
     this.statisticsService.findSumTransactionsByDate({
       "user-id": this.helper.userId,
       "start-date": this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd') as string,
       "end-date": this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd') as string
      }).subscribe({
        next: (values) => {
          this.dataset = []
          const chartDataSet: ChartDataset = {data: [], label: ''}
          const dataValues: Array<number> = [];

        for (let record of values){
          this.labels.push(record.transactionDate as string)
          dataValues.push(record.amount as number)
        }

        chartDataSet.data = dataValues;
        chartDataSet.label = "Sum transactions by day"
        this.dataset.push(chartDataSet)
        console.log(this.startDate)
      }
    })
  }






  private async initializeAccountInfo(){

    this.accountBalance = await lastValueFrom(
      this.statisticsService.getAccountBalance({
        "user-id": this.helper.userId
      })
    );

    this.highestDeposit = await lastValueFrom(
      this.statisticsService.highestDeposit({
        "user-id": this.helper.userId
      })
    );

    this.highestTransfer = await lastValueFrom(
      this.statisticsService.highestTransfer({
        "user-id": this.helper.userId
      })
    );

    this.accountInfoList = [
      {
        title: 'Account balance',
        amount: this.accountBalance,
        infoStyle: 'bg-primary'
      },
      {
        title: 'Highest transfer',
        amount: this.highestTransfer,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest deposit',
        amount: this.highestDeposit,
        infoStyle: 'bg-success'
      }
    ];
  }

  formatDateForDisplay(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') || '' : '';
  }




}
