import Part from "./Part"
const Content = ({parts}) => {
    const totalSum = parts.reduce((accumulator ,current) => accumulator + current.exercises,0)
    return(
      <div>
       {parts.map((data)=>
        <Part key={data.id} data={data} /> 
        )}
         <h4>total of {totalSum} exercises</h4>
         </div>
    )
    }

export default Content