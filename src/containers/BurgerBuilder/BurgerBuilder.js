import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad:0.5,
  bacon:0.4,
  cheese:1.3,
  meat:0.7
}
 class BurgerBuilder extends Component {
   state = {
     ingredients:null,
     totalPrice:4,
     purchasable:false,
     purchasing:false,
     loading:false,
     error:false
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
    // alert('You continue');
    // this.setState({loading:true});
    // const order = {
    //   ingredients:this.state.ingredients,
    //   price:this.state.totalPrice,
    //   customer:{
    //     name: "Ser Shishkov",
    //     address:{
    //       street:"Main street 1",
    //       zipCode:'69005',
    //       country:"Ukraine"
    //     },
    //     email:"test@test.com"
    //   },
    //   deliveryMethod:"fastest"
    // }
    // axios.post('/orders.json', order)
    // .then(response => {
    //   this.setState({loading:false, purchasing:false });
    // })
    // .catch(error => {
    //   this.setState({loading:false, purchasing:false });
    // });

    this.props.history.push("/checkout");
  }

  componentDidMount(){
    console.log(this.props);
    axios.get('https://sh-burger.firebaseio.com/ingredients.json')
    .then(response =>{
      this.setState({ingredients:response.data})
    })
    .catch(error =>{
      this.setState({error:true});
    });
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
    let orderSummary = null;    
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p>:<Spinner/>;

    if(this.state.ingredients){
      burger = (
        <Aux>
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
        );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
    />;
    }

    if(this.state.loading){
      orderSummary = <Spinner/>;
    }
    

    return (
      <Aux>
      <Modal 
        show={this.state.purchasing}
        modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
