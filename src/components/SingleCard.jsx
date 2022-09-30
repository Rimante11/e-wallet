//importerar logos
import visaLogo from "../images/visalogo.png";
import reactlogo from "../images/reactlogo.png";
import swedbankLogo from "../images/swedbanklogo.png";
import icaLogo from "../images/icalogo.png";
import mastercardlogo from "../images/mastercardlogo.png";
import chiplogo from "../images/chiplogo.png";
import blip from "../images/blip.png";
import { useSelector } from "react-redux";

const SingleCard = (props) => {
  const { randomUser } = useSelector((state) => state.walletList); 
  console.log("Random user: ",randomUser);
  console.log("Firstname: ", randomUser.firstName, "Lastname: ", randomUser.lastName);

  return (
    <div>
      <div
        className={props.vendor === "Visa" ? "cardVisa"
            : props.vendor === "Swedbank" ? "cardSwedbank"
            : props.vendor === "React" ? "cardReact"
            : props.vendor === "Ica" ? "cardIca"
            : "card"
        }
      >
        <div className="emptyField"></div>
        <div className="mastercard">
          <img src={mastercardlogo} alt="" />
        </div>
        <div className="logo">
          {props.vendor === "Visa" ? ( <img src={visaLogo} alt="" /> ) 
            : props.vendor === "Swedbank" ? ( <img src={swedbankLogo} alt="" /> ) 
            : props.vendor === "React" ? ( <img src={reactlogo} alt="" /> ) 
            : props.vendor === "Ica" ? ( <img src={icaLogo} alt="" /> ) 
            : null
          }
        </div>
        <div className="chip">
          <img src={chiplogo} alt="" className="chip" />
        </div>
        <div className="blip">
          <img src={blip} alt="" className="blip" />
        </div>
        <div className="cardNumbers">
          <p>{props.cardNumber}</p>
        </div>
        {/*behåller random user name fixat */}
        <div className="name">
          <p>{randomUser.firstName} {randomUser.lastName}</p>
        </div>
        <div className="date">
          <p className="validThru">Valid Thru</p>
          <p>{props.validMonth}/{props.validYear}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;