

function SelectOption({value, text}){
    return (
        <>
            <option value={value}>{value} ({text})</option>
        </>
    )
}

export default SelectOption;