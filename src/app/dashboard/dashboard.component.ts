import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as ChartistLegend from 'chartist-plugin-legend';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

      /*const dataDailySalesChart: any = {
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

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);*/

      var data = {
          series: [5, 3, 4]
      };

      var sum = function(a, b) { return a + b };

      var dailySalesChart = new Chartist.Pie('#dailySalesChart', data, {
          labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
          }
      });

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------========== Completed Tasks Chart initialization - Emotions by Hours ==========---------- */
    
    var completedTasksChart = new Chartist.Bar('#completedTasksChart', 
    {
    labels: ['Bugs', 'Meet', 'Dev'],
    series: [
      [10, 10, 80],
      [20, 40, 5],
      [70, 50, 15]
    ]
  }, 
  {
    stackBars: true,
    low: 0,
    high: 100,
    plugins: [ChartistLegend({legendNames: ['Happy', 'Sad', 'Fearful']})],
    reverseData: true,
    horizontalBars: true,
    axisX: {
      labelInterpolationFnc: function(value) {
        return (value) + '%';
      }
    },
    onlyInteger: true
  }).on('draw', function(data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 25px'
      });
    }
  });
  this.startAnimationForLineChart(completedTasksChart);


      /* ----------========== Emails Subscription Chart initialization - AVG working task per day ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['Mon','Tue','Wed','Thu','Fri'],
        series: [
            // first stack
            {
                data: [5, 4, 7, 5,3],
                stack: 0
            }, {
                data: [3,4, 1, 3, 4],
                stack: 1

            }
        ]
    };
    var optionswebsiteViewsChart = {
        stackbars:true,
        axisX: {
            showGrid: true
        },
        reverseData: true,
        horizontalBars: true,
        stack:'normal',
        low: 0,
        high: 7,
        chartPadding: { top: 0, right: 10, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 10,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);

      /*Jira tasks by Month jiraMonthChart*/
      var dataJira = {
          series: [1.5, 2, 6.5]
      };

      var sumJira = function(a, b) { return a + b };

      var jiraMonthChart = new Chartist.Pie('#jiraMonthChart', dataJira, {
          labelInterpolationFnc: function(value) {
              return Math.round(value / dataJira.series.reduce(sumJira) * 100) + '%';
          }
      });

      this.startAnimationForLineChart(jiraMonthChart);
  }

}
