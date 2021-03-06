import styles from './order-details.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../types/hooks';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../loader/loader';
import React from 'react';
import { RESET_ORDER_NUMBER } from '../../services/actions/order-details';

export default function OrderDetails(): JSX.Element {
  const dispatch = useDispatch();
  const { orderNumber } = useSelector(store => store.orderDetails);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_ORDER_NUMBER });
    };
  }, [dispatch]);

  return !orderNumber ? (
    <Loader />
  ) : (
    <div className={`${styles.card}`}>
      <h3 className={`${styles.order} pt-3 text text_type_digits-large`}>{orderNumber}</h3>
      <p className="text text_type_main-medium pt-1">Идентификатор заказа</p>
      <span className={`${styles.icon} mt-20 mb-20`}>
        <CheckMarkIcon type="primary" />
      </span>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-10 pt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
