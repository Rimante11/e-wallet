import saverLogo from "../images/saver.png";

const Header = () => {
  return (
    <div id="header">
      <h1 className="headerText">
        <img src={saverLogo} alt="" className="saverLogo" />
          E-WALLET WITH REACT
        <img src={saverLogo} alt="" className="saverLogo" />
      </h1>
    </div>
  );
};

export default Header;
