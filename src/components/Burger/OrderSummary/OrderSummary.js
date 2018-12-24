import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
//это должен быть функциональный компонент, 
//сделали классом для тестирования жизненных циклов
  componentWillUpdate(){
    console.log('[OrederSummary] WillUpdate()');
  }

  render(){
    const ingredientSummary =Object.keys(this.props.ingredients)
      .map(ingrdKey => {
        return (<li key={ingrdKey}>
          <span style={{textTransforn:'capitalize'}}>{ingrdKey}</span> : {this.props.ingredients[ingrdKey]}
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
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
        <p>Continue to Checkout?</p>
         <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
         <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}



export default OrderSummary;