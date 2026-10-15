import PropTypes from 'prop-types';
import Plotly from 'plotly.js-basic-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const factory = createPlotlyComponent.default || createPlotlyComponent;
const Plot = factory(Plotly);

export default function PriceChart({ categories, currency }) {
  const data = [
    {
      type: 'scatter',
      mode: 'lines+markers+text',
      name: 'Средняя цена',
      x: categories.map((c) => c.category),
      y: categories.map((c) => c.avgPrice),
      customdata: categories.map((c) => [c.count, c.minPrice, c.maxPrice]),
      text: categories.map((c) => `${c.avgPrice}`),
      textposition: 'top center',
      textfont: { size: 12, color: '#1a1a1a' },
      line: { color: '#b83a17', width: 3, shape: 'spline' },
      marker: { color: '#b83a17', size: 10, line: { color: '#ffffff', width: 2 } },
      hovertemplate:
        '<b>%{x}</b><br>' +
        `Средняя цена: %{y:.2f} ${currency}<br>` +
        'Товаров в категории: %{customdata[0]}<br>' +
        `Диапазон цен: %{customdata[1]}–%{customdata[2]} ${currency}` +
        '<extra></extra>',
    },
  ];

  const layout = {
    title: { text: 'Средняя цена товаров по категориям', font: { size: 18 }, x: 0.02 },
    font: { family: 'Inter, Arial, sans-serif', color: '#1a1a1a' },
    xaxis: { title: { text: 'Категория товаров' }, showgrid: false, fixedrange: true },
    yaxis: {
      title: { text: `Средняя цена, ${currency}` },
      rangemode: 'tozero',
      gridcolor: '#ece9e3',
      zeroline: false,
      fixedrange: true,
    },
    margin: { t: 60, r: 24, b: 70, l: 70 },
    plot_bgcolor: '#ffffff',
    paper_bgcolor: '#ffffff',
    hoverlabel: { bgcolor: '#1a1a1a', font: { color: '#ffffff', family: 'Inter, Arial, sans-serif' } },
    showlegend: false,
  };

  const config = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'],
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      useResizeHandler
      style={{ width: '100%', height: '440px' }}
    />
  );
}

PriceChart.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      avgPrice: PropTypes.number.isRequired,
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  currency: PropTypes.string,
};
