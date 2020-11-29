import React, {useEffect, useState} from 'react';
import {currentMonth, currentYear} from '../../helpers/constants.js';
import handleDataDisplay from '../../helpers/handleDataDisplay.js';
import filtredCosts from '../../helpers/filtredCosts.js';
import filtredIncome from '../../helpers/filterdIncome.js';
import {useDispatch, useSelector} from 'react-redux';
import {authenticatedSelector} from '../../redux/auth/authSelectors';
import {getAllTransactions} from '../../redux/transactions/operations';
import {
  costTransactionsSelector,
  incomeTransactionsSelector,
} from '../../redux/transactions/selectors';
import Chart from './Chart';
import CategoryTable from './CategoryTable';

import style from './Statistics.module.css';

const Statistics = () => {
  const [inputMonth, setInputMonth] = useState(currentMonth);
  const [inputYear, setInputYear] = useState(currentYear);

  const token = useSelector(authenticatedSelector);
  const getCurrentTransactions = useDispatch();

  useEffect(() => {
    getCurrentTransactions(getAllTransactions(token));
  }, [getCurrentTransactions, token]);

  const filteredCost = useSelector(costTransactionsSelector);
  const filteredIncome = useSelector(incomeTransactionsSelector);
  const cost = filtredCosts(filteredCost, inputMonth, inputYear);
  const income = filtredIncome(filteredIncome, inputMonth, inputYear);
  const dataToDisplay = handleDataDisplay(cost, income);

  const updateInputMonth = e => {
    setInputMonth(e.target.value);
  };

  const updateInputYear = e => {
    setInputYear(e.target.value);
  };
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.header}>
          <span>Statistics</span>
        </div>
        <div className={style.StatisticsChart_wrapper}>
          <Chart chartData={dataToDisplay} />
        </div>
        <div className={style.CategoryTable}>
          <CategoryTable
            handleMonthUpdate={updateInputMonth}
            handleYearUpdate={updateInputYear}
            data={dataToDisplay}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
