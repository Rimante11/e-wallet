import { useDispatch, useSelector } from "react-redux";
import SingleCard from "./SingleCard";
import { addCard } from "../redux/slices/walletSlice";
import { useState } from "react";


const AddNewCard = (props) => {
  const dispatch = useDispatch();
  //Hur det ser ut på tumt kort useState xxxx...
  const [cardNumber, setCardNumber] = useState("xxxx xxxx xxxx xxxx");
  const [validMonth, setValidMonth] = useState("xx");
  const [validYear, setValidYear] = useState("xx");
  const [vendor, setVendor] = useState("");
  const [value, setValue] = useState("default"); //för option meny
  const { randomUser } = useSelector((state) => state.walletList);
  const [cvc, setCvc] = useState("xxx"); //extra som riktig kort

  const addNewBankCard = () => {
    props.setNewCard(true);
      dispatch (addCard ({
          cardNumber: cardNumber,
          randomUser: {
            firstName: randomUser.firstName,
            lastName: randomUser.lastName,
          },
          validMonth: validMonth,
          validYear: validYear,
          cvc: cvc,
          id: Date.now(), //utan kort tas bort om fler än 2
          vendor: vendor,
      }));
  };

  let changeCardNumber = (event) => {
    // g=modifier replace all copies of the matched string with the replacement string you provide.
    const value = event.target.value.replace(/ /g, ""); 
    console.log("Card number: ",value);
    console.log(setValue);
    let inputNums = value.replace(/\D/g, "");
    //kollar kort nummer inputs om det är större än det ska
    if (inputNums.length > 16) {
      //substra string från 0 till 16
      inputNums = inputNums.substr(0, 16);
    }
    //adding spaces mellan värje 4de siffra i kortnr hittat på nättet
    const spacesBtwCardNum = inputNums.match(/.{1,4}/g);
    let insertSpaces = "";
    if (spacesBtwCardNum) {
      insertSpaces = spacesBtwCardNum.join(" ");
    }
    setCardNumber(insertSpaces);
    console.log("Card number with spaces: ", insertSpaces);
  };

  //sätter card month, year, cvc, vendor option
  let chooseValidMonth = (event) => {
    setValidMonth(event.target.value);
    console.log("Valid month: ", event.target.value);
  };
  let chooseValidYear = (event) => {
    setValidYear(event.target.value);
  };
  let chooseCvc = (event) => {
    setCvc(event.target.value);
  };
  let changeVendor = (event) => {
    setVendor(event.target.value);
  };

  //ritar ut new card
  return (
    <div>
      <h2 className="activeCardText">Add new card</h2>

      <SingleCard
        cardNumber={cardNumber}
        firstName={randomUser.firstName}
        lastName={randomUser.lastName}
        validMonth={validMonth}
        validYear={validYear}
        cvc={cvc}
        vendor={vendor}
      />
     <br/>

      <form className="addCardForm" onSubmit={() => {
          addNewBankCard();
        }}>

        <div>
          {/*pass input value onChange */}
          {/* kortnummer input */}
          <input 
            required
            name="cardNumber"
            id="cardNumber"
            placeholder="Card number"
            maxLength="16"
            pattern="[0-9]{16}"
            onChange={changeCardNumber}
          />

          {/* CVC input */}
          <input
            required
            type="text"
            name="cvc"
            id="cvc"
            placeholder="CVC"
            onChange={chooseCvc}
            pattern="[0-9]{3}"
            maxLength="3"
            
          />
        </div>

        <div>
          {/* firstname input behåller random user */}
          <input
            type="text"
            placeholder={randomUser.firstName}
            id="firstName"
            disabled
          />

          {/* lastname input */}
          <input
            type="text"
            placeholder={randomUser.lastName}
            id="lastName"
            disabled
          />
        </div>

        <div>
          {/* giltig månad */}
          <input
            type="text"
            name="validMonth"
            id="validMonth"
            placeholder="Month"
            onChange={chooseValidMonth}
            pattern="[0-9]{2}"
            maxLength="2"
            required
          />
          
          {/* år giltig */}
          <input
            type="text"
            name="validYear"
            id="validYear"
            placeholder="Year"
            onChange={chooseValidYear}
            pattern="[0-9]{2}"
            maxLength="2"
            required
          />
        </div>

        <div>
          {/* dropdown vendor ica, visa, osv */}
          <select className="selectVendor"
            name="vendor"
            id="vendor"
            defaultValue={value}
            onChange={changeVendor}
            required
          >
            <option value="default" disabled hidden>
              Vendor
            </option>
            <option value="Visa">Visa</option>
            <option value="React">React </option>
            <option value="Swedbank">Swedbank</option>
            <option value="Ica">Ica </option>
          </select>
        </div>
        {/* kollar if vendor lika med value ex visa osv */}
        {vendor === "Visa" ? (
            <button type="submit" className="activeBtn">Add card</button>
          ) : vendor === "Swedbank" ? (
            <button type="submit" className="activeBtn">Add card</button>
          ) : vendor === "React" ? (
            <button type="submit" className="activeBtn">Add card</button>
          ) : vendor === "Ica" ? (
            <button type="submit" className="activeBtn">Add card</button>
          ) : 
          <div>
            <button type="submit" disabled className="disabledBtn">Add card</button>
            <br />
            <p><small style={{fontSize:"12px", color: "red",}}>* Please choose a vendor before adding a new card.</small></p>
          </div>
        }
        
      </form>
    </div>
  );
};
export default AddNewCard;