import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateGoal } from "../features/goals/goalSlice"


export const EditGoal = ({id}) => {
    const [editer, setEditer] = useState(id.text)
    const dispatch = useDispatch()


    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {id:id._id, text: editer}
        dispatch(updateGoal(userData))
        window.location.reload()
    }
    return <>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group" style={{display:'flex'}}>
                <input type="text" name="text" id="text" value={editer} onChange={e => setEditer(e.target.value)}/>
            <button className="btn" style={{marginTop: '-7px', marginLeft:'5px'}} type="submit">Edit Goal</button>
            </div>
        </form>
       </section>
    </>
}