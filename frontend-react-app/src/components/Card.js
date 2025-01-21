// src/components/Card.js
import React from 'react';

const Card = ({ fruit, quantity }) => {
    fruit = fruit.toLowerCase();

    const styles = {
      card: {
        width: '200px',
        height: '300px',
        border: '1px solid black',
        borderRadius: '10px',
        position: 'relative',
      },
      image: {
        width: '50px',
        height: '50px',
        position: 'absolute',
      },
    };

    const getImageStyles = (index) => {
      switch (quantity) {
        case 1:
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        case 2:
          if (index === 0) return { top: '10%', left: '10%' };
          else return { bottom: '10%', right: '10%' };
        case 3:
          if (index === 0) return { top: '10%', left: '10%' };
          else if (index === 1) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
          else return { bottom: '10%', right: '10%' };
        case 4:
          if (index === 0) return { top: '10%', left: '10%' };
          else if (index === 1) return { top: '10%', right: '10%' };
          else if (index === 2) return { bottom: '10%', left: '10%' };
          else return { bottom: '10%', right: '10%' };
        case 5:
          if (index === 0) return { top: '10%', left: '10%' };
          else if (index === 1) return { top: '10%', right: '10%' };
          else if (index === 2) return { bottom: '10%', left: '10%' };
          else if (index === 3) return { bottom: '10%', right: '10%' };
          else return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        default:
          return {};
      }
    };

    return (
      <div className="card" style={styles.card}>
        {Array.from({ length: quantity }).map((_, index) => (
          <img key={index} src={`images/${fruit}.jpg`} alt={fruit} style={{ ...styles.image, ...getImageStyles(index) }} />
        ))}
      </div>
    );
  };

export default Card;
