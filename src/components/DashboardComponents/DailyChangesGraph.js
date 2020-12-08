import { map } from 'lodash';
import React, { useEffect } from 'react';
import Chart from 'chart.js';
import {
  getToday,
  getDataForGraphForExpense,
  getDataForGraphForEarnings,
  extractKeys,
  getEarningsOfDay,
  getExpenseOfDay,
} from '../../helpers';
import PopOver from './PopOver';

const DailyChangesGraph = ({ data }) => {
  const {
    details: { account },
  } = data;

  const { expenseList, earningsList } = account;
  const graphForExpense = getDataForGraphForExpense(expenseList);
  const graphForEarnings = getDataForGraphForEarnings(earningsList);
  const combined = [...expenseList, ...earningsList];
  const labels = extractKeys(combined);

  const lineChartRef = React.createRef();

  const dataSet = {
    labels: map(labels, (date) => date),
    datasets: [
      {
        data: map(graphForExpense, ({ value }) => value),
        label: 'Expense',
        borderColor: '#F5AD42',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: true,
        pointBackgroundColor: '#F5AD42',
      },
      {
        data: map(graphForEarnings, ({ value }) => value),
        label: 'Earnings',
        borderColor: '#316CD3',
        fill: true,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: '#316CD3',
      },
    ],
  };

  const options = {
    animation: {
      duration: 500,
      easing: 'easeInSine',
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          display: false,
          drawOnChartArea: false,
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(lineChartRef.current, {
      type: 'line',
      data: dataSet,
      options,
    });
  }, [dataSet, lineChartRef, options]);

  const Content = (label) => (
    <div>
      <p className="popover-data-expense">
        Expense: <span>{getExpenseOfDay(expenseList, label)}</span>
      </p>
      <p className="popover-data-earnings">
        Earnings: <span>{getEarningsOfDay(earningsList, label)}</span>
      </p>
    </div>
  );

  return (
    <div>
      <div className="card-header">
        <p>Activity</p>
      </div>
      <div className="graph">
        <canvas ref={lineChartRef} />
      </div>
      <div className="graph-labels">
        {map(labels, (label) => (
          <PopOver placement="bottom" content={() => Content(label)}>
            <button type="button" className={`${getToday() === label ? 'today' : ''}`}>
              <p>{label}</p>
            </button>
          </PopOver>
        ))}
      </div>
    </div>
  );
};

export default DailyChangesGraph;
