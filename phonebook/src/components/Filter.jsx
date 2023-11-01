const Filter = ({search,searchChange}) => {
    return (
        <div>
             Search<input value={search} onChange={searchChange}/>
        </div>
    )
}

export default Filter