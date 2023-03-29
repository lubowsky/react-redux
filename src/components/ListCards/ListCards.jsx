import React from 'react';

import Card from '../Card/Card';


const ListCards = ({ cardsData, remove }) => {
  return (
    <>
      {cardsData.map((item) => {
        return (
          <Card item={item} key={item.timestamp} remove={remove} />
        )
      })}
    </>       
  );
};

export default ListCards;
