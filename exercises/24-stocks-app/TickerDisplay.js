(function () {
  let lineChartCounter = 0;

  class TickerDisplay extends HTMLElement {

    attachedCallback() {
      this.appendChild(this._title = document.createElement('h2'));
      this.appendChild(this._closeButton = document.createElement('button'));
      this.appendChild(this._chart = document.createElement('div'));
      this._closeButton.onclick = () => this.remove();
      this._closeButton.innerText = 'remove';

      const { data, title } = this;
      const self = this;

      const data$ = Rx.Observable.from(data);

      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });

      const elemId = `line-chart-${lineChartCounter++}`;

      this._chart.id = elemId;

      new Highcharts.Chart({
        chart: {
          renderTo: elemId,
          type: 'spline',
          animation: true,
          marginRight: 10,
          events: {
            load: function () {

              // set up the updating of the chart each second
              let series = this.series[0];

              if (!data$) {
                throw new Error('no data stream provided');
              }

              self.subscription = data$.subscribe(
                y => series.addPoint([(new Date()).getTime(), y], true, true)
              );
            }
          }
        },
          title: {
            text: title
          },
          xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
          },
          yAxis: {
            title: {
              text: 'Value'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
            }
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          series: [{
            name: 'Random data',
            data: (function () {
              // generate an array of random data
              let data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                data.push({
                  x: time + i * 1000,
                  y: 0
                });
              }
              return data;
            }())
          }]
      });
    }

    detachedCallback() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  document.registerElement('x-ticker-display', TickerDisplay);
  window.TickerDisplay = TickerDisplay;
} ());
