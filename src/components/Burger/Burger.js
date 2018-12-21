import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformadIngredients = Object.keys(props.ingredients)
  .map((ingrKey) =>{
    return [...Array(props.ingredients[ingrKey])].map((item, i) =>{
     return  <BurgerIngredient key={ingrKey+i} type={ingrKey}/>
    });
  });
  // console.log(transformadIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformadIngredients}
      <BurgerIngredient type="bread-bottom"/>
        
    </div>
  );
};

export default burger;