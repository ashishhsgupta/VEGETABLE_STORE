
export const commonButton = ({label, icon, callback=null, className=null}) =>{
    return (
        <button type="submit" className={`btn btn_cta mb-3 ${className}`} onClick={callback}>
            <span className="text">{label}</span>
                {icon ? <i className={`bi bi-${icon}`}></i> : null}
        </button>
    )
}