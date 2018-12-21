import React from 'react';

import Aux from '../../../hoc/Aux';

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
      <p>Continue to Checkout?</p>
    </Aux>
  )
}

export default orderSummary;