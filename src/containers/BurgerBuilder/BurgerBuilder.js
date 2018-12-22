import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
  salad:0.5,
  bacon:0.4,
  cheese:1.3,
  meat:0.7
}
 class BurgerBuilder extends Component {
   state = {
     ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
     },
     totalPrice:4,
     purchasable:false,
     purchasing:false,
     
   }

   purchaseHandler = ()=>{
     this.setState({
       purchasing:true
     })
   }

   purchaseCancelHandler = ()=>{
    this.setState({
      purchasing:false
    })
  }
  purchaseContinueHandler = ()=>{
    alert('You continue');
  }

   updatePurchaseState(ingredients){    
    const sum = Object.keys(ingredients)
    .map(ingrKey =>{
      return ingredients[ingrKey];
    }).reduce((sum, el)=>{
      return sum + el;
    },0);

    this.setState({
      purchasable: sum > 0
    })
   }

   addIngredientHandler = (type) =>{
     const oldCount = this.state.ingredients[type];
     const upddatedCount = oldCount + 1;
     const updatedUngredients = {
       ...this.state.ingredients
     }
     updatedUngredients[type] = upddatedCount;
     const priceAddition = INGREDIENT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice + priceAddition;

     this.setState({
      totalPrice:newPrice,
      ingredients:updatedUngredients
     });
    this.updatePurchaseState(updatedUngredients);

   }

   removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const upddatedCount = oldCount - 1;
    const updatedUngredients = {
      ...this.state.ingredients
    }
    updatedUngredients[type] = upddatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
     totalPrice:newPrice,
     ingredients:updatedUngredients
    });
    this.updatePurchaseState(updatedUngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
      <Modal 
      show={this.state.purchasing}
      modalClosed={this.purchaseCancelHandler}>
        <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        />
      </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler}
        price={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;
