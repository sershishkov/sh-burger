import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary =Object.keys(props.ingredients)
      .map(ingrdKey => {
        return (<li key={ingrdKey}>
          <span style={{textTransforn:'capitalize'}}>{ingrdKey}</span> : {props.ingredients[ingrdKey]}
          </li>
          )
      });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingradients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong> </p>
      <p>Continue to Checkout?</p>
       <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
       <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary;