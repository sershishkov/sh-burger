import React from 'react';


import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  console.log(props);
  let transformadIngredients = Object.keys(props.ingredients)
  .map((ingrKey) =>{
    return [...Array(props.ingredients[ingrKey])].map((item, i) =>{
     return  <BurgerIngredient key={ingrKey+i} type={ingrKey}/>
    });
  }).reduce((arr, el)=>{
    return arr.concat(el);
  },[]);
  // console.log(transformadIngredients);

  if(transformadIngredients.length === 0){
    transformadIngredients = (<p>Please start adding ingredients!!</p>)
    
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformadIngredients}
      
      <BurgerIngredient type="bread-bottom"/>
        
    </div>
  );
};

export default burger;