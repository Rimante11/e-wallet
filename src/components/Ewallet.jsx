import { useSelector, useDispatch } from "react-redux";
import SingleCard from "./SingleCard";
import { Link } from "react-router-dom";
import { changeActive, deleteCard } from "../redux/slices/walletSlice";


const Wallet = () => {
  const dispatch = useDispatch();
  const { listOfCards: cardsList, randomUser } = useSelector((state) => state.walletList);

  return (
    <div>
      <h3 className="activeCardText">Active card</h3>
        <div>
          {cardsList.slice(0, 1).map((card, i) => {
            return (
              <div key={i}>
                <SingleCard
                  cardNumber={card.cardNumber}
                  firstName={randomUser.firstName}
                  lastName={randomUser.lastName}
                  cvc={card.cvc}
                  validMonth={card.validMonth}
                  validYear={card.validYear}
                  vendor={card.vendor}
                />
              </div>
            );
          })}
        </div>

      <br></br>
      <div>
        {/*max 4 */}
        {cardsList.slice(1, 4).map((card, i) => {
          return (
            <div key={i}>
              <div onClick={() => dispatch(changeActive(card))}>
                <SingleCard
                  cardNumber={card.cardNumber}
                  firstName={randomUser.firstName}
                  lastName={randomUser.lastName}
                  cvc={card.cvc}
                  validMonth={card.validMonth}
                  validYear={card.validYear}
                  vendor={card.vendor}
                />
              </div>
              <button className="deleteButton" onClick={() => dispatch(deleteCard(card.id))}>
                Remove card from wallet
              </button>
            </div>
          );
        })}
      </div>
      {/*kollar hur många kort, icke mer än 4 */}
      {cardsList.length < 4 ? (
        <Link to={{ pathname: "/addcard" }}>
          <button className="activeBtn">Add new card</button>
        </Link>
      ) : 
      <div>
            <button disabled className="disabledBtn">Add new card</button>
            <br />
            <small style={{color:"red"}}>* You can have max 4 cards in your wallet.</small>
        </div>
      }
    </div>
  );
};

export default Wallet;
