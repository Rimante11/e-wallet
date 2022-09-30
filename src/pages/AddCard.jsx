import AddNewCard from "../components/AddNewCard.jsx";
import { useState } from "react";
import yayLogo from "../images/yaylogo.png";
import yayReverse from "../images/yayreverse.png";
import { Link } from "react-router-dom";

const AddCard = () => {
  const [newCard, setNewCard] = useState(false);

  return (
    <div>
      <Link to="/">
        <div className="backToWallet">
          <button className="activeBtn returnToWalletBtn">Return to wallet</button>
        </div>
      </Link>

      {newCard ? (
        <h1>
          <img src={yayLogo} alt="" className="saverLogo" />
          New card added to your wallet!
          <img src={yayReverse} alt="" className="saverLogo" />
        </h1>
      ) : (
        <AddNewCard setNewCard={setNewCard} />
      )}
      
    </div>
  );
};
//exporterar
export default AddCard;