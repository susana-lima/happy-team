import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor() { }

    startAnimationForLineChart(chart){
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function(data) {
            if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if(data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };
    startAnimationForBarChart(chart){
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function(data) {
            if(data.type === 'bar'){
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

      const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------========== Completed Tasks Chart initialization - Emotions by Hours ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['9a', '10a', '11a', '12p','1p', '2p', '3p', '4p','5p','6p','7p'],
          series: [
              [ 1,2,1, 2, 3, 4,5,6,7] /*Values for graph*/
          ]
      };

      const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------========== Emails Subscription Chart initialization - AVG working task per day ==========---------- */
      var datawebsiteViewsChart = {
          labels: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
          series: [
              // first stack
              {
                  data: [0.25, 0.50, 0.25, 0.75, 1],
                  stack: 0
              }, {
                  data: [0.75, 0.25, 0.25, 0.25, 0.75],
                  stack: 1
              }
          ]
      };
      var optionswebsiteViewsChart = {
          stackbars:true,
          axisX: {
              showGrid: true
          },
          reverseData: false,
          horizontalBars: false,
          stack:'normal',
          low: 0,
          high: 1,
          chartPadding: { top: 0, right: 10, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
              seriesBarDistance: 2,
              axisX: {
                  labelInterpolationFnc: function (value) {
                      return (value.onlyInteger);
                  }
              }
          }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
//start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);

  }

}
