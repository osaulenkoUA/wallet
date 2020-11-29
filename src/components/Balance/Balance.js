import React from 'react';
import {useSelector} from 'react-redux';
import filtredCosts from '../../helpers/filtredCosts.js';
import filtredIncome from '../../helpers/filterdIncome.js';
import handleDataDisplay from '../../helpers/handleDataDisplay.js';
import useTableScreen from '../../hooks/UseTableScreen';
import {
  costTransactionsSelector,
  incomeTransactionsSelector,
} from '../../redux/transactions/selectors';

import style from './Balance.module.css';

const Balance = () => {
  const filteredCost = useSelector(costTransactionsSelector);
  const filteredIncome = useSelector(incomeTransactionsSelector);
  const cost = filtredCosts(filteredCost);
  const income = filtredIncome(filteredIncome);
  const dataToDisplay = handleDataDisplay(cost, income);

  const tableScreen = useTableScreen();

  return (
    <div className={style.box}>
      {(Number(tableScreen) < 768 || Number(tableScreen) > 1279) && (
        <div className={style.balance}>
          <span className={style.text}>Balance</span>
          <span className={style.amount}>
            {dataToDisplay.globalBalance} UAH
          </span>
        </div>
      )}
    </div>
  );
};

export default Balance;
