export default function CoreConcept({title, image, description}){
  return(
    <li>
      <img src={image} alt={title}/>
      <h1>{title}</h1>
      <p>{description}</p>
    </li>
  )
}