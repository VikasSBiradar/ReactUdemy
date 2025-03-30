export default function TabButton({children, onSelect, isSelected}){
    

    return(
        <li><button className = {isSelected == true ? 'active' : ''} onClick={onSelect}>{children}</button></li>
    )
}