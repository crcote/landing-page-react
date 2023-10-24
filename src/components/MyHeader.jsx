import logo from '../assets/imgs/logo.png';

function MyHeader() {
  return (
    <header style={{
      backgroundImage:`url(${logo})`
    }}></header>
  );
}

export default MyHeader;