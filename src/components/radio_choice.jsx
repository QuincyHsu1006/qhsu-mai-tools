

function RadioChoice ({value, name, state, onchange}){
    return (
        <>
            <div style={{'margin': '3px'}}>
                <label>
                    <input type="radio" value={value} checked={state === value} name={name} onChange={onchange}/>
                    {value}
                </label>
            </div>
        </>
    )
}

export default RadioChoice
