import values from './values.js';

for (let i = 0; i < values.length; i++) {
  if (i == 0) {
    values[i][3] = values[i][1];
    values[i][4] = values[i][2];
  } else {
    values[i][3] = values[i][1] + values[i - 1][3];
    values[i][4] = values[i][2] + values[i - 1][4];
  }
}

const plot = (id, { field, cumulative = false, color = '#1f77b4' }) => {
  let fieldIdx;
  let title;

  if (field == 'daily deaths') {
    fieldIdx = cumulative ? '4' : '2';
    title = cumulative ? 'Cumulative Deaths' : 'Daily Deaths';
  } else {
    fieldIdx = cumulative ? '3' : '1';
    title = cumulative ? 'Cumulative Cases' : 'Daily Cases';
  }

  let spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    width: 'container',
    height: 400,
    title,
    data: {
      values,
    },
    layer: [
      {
        mark: cumulative ? 'point' : 'bar',
        encoding: {
          x: { 
            field: '0', 
            type: 'temporal',
            axis: {
              title: null,
              labelAngle: 90,
            },
          },
          y: { 
            field: fieldIdx, 
            type: 'quantitative',
            axis: {
              title: null,
            },
          },
          tooltip: [
            { field: '0', type: 'temporal', title: 'Date' },
            { field: fieldIdx, type: 'quantitative', title },
          ],
          color: {
            condition: {
              selection: 'brush', 
              value: '#ff7f0e',
            },
            value: color,
          },
        },
        selection: {
          brush: {
            type: 'single',
            on: 'mouseover',
            empty: 'none',
          },
        },
      },
    ],
  };

  if (!cumulative) {
    spec.layer.push({
      mark: { type: 'rule' },
      encoding: {
        y: { field: fieldIdx, type: 'quantitative', aggregate: 'median' },
        color: { value: '#d62728' },
        size: {
          value: 1,
        },
      },
    });
  }

  vegaEmbed(id, spec);
};

plot('#daily-cases', { field: 'daily cases' });
plot('#cumulative-cases', { field: 'daily cases', cumulative: true });
plot('#daily-deaths', { field: 'daily deaths', color: '#636363' });
plot('#cumulative-deaths', { field: 'daily deaths', cumulative: true, color: '#636363' });