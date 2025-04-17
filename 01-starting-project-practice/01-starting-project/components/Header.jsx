import logo from '../src/assets/investment-calculator-logo.png';

export default function Header(){
    return <header id="header">
        <img src={logo} alt="header logo"/>
        <h1>Investment Calculator</h1>
    </header>
}