import update from "immutability-helper";
import { useCallback } from "react";
import Card from "./Card";
import {AiFillEye} from 'react-icons/ai'
import { FiXCircle } from "react-icons/fi";


const Container = ({
  setImageUrl,
  imageUrl,
  handleRemoveImage,
  pdf,
  pdfName,  
}) => {
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setImageUrl((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [setImageUrl]
  );

  // console.log("pdfName ....", pdfName);
  const renderCard = useCallback(
    (card, i) => {
      
      return (
        <Card
          key={i + 1}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          image={card}
          handleRemoveImage={handleRemoveImage}
        />
      );
    },
    [moveCard, handleRemoveImage]
  );
  return (
    <>
      {pdf === true ? (
        <>
          { pdfName && pdfName[0] && (
            <div className="flex ...">
                  <a
                  href={imageUrl && imageUrl[0]}  // Provide the URL or file path to your PDF here
                  target="_blank"
                  className="flex-none ... text-sm flex justify-center items-center gap-1 cursor-pointer"
                >
                  <AiFillEye /> {pdfName && pdfName[0]}
                </a> 

                <button
                  type="button"
                  className="flex-auto w-64 ... mx-2 top-0 right-0 text-red-500 focus:outline-none"
                  onClick={() => handleRemoveImage(imageUrl)}
                  // handleRemoveImage={handleRemoveImage}
                >
                  <FiXCircle />
                </button>

            </div>
          )}
        </>
      ) : ( 
        <>{imageUrl?.map((card, i) => renderCard(card, i))}</>
      )}
    </>
  );
};

export default Container;
