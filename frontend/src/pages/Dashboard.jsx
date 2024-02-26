import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { GoalForm } from "../components/GoalForm"
import { getGoals, reset } from "../features/goals/goalSlice"
import {Spinner} from '../components/Spinner'
import { GoalItem } from "../components/GoalItem"

export const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {goals, isLoading, isError, message} = useSelector(state => state.goals)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        dispatch(getGoals())
        return () => {
            dispatch(reset())
        }
    },[user,navigate, dispatch])

    if(isError){
        console.log(message)
    }

    if(isLoading){
        return <Spinner />
    }
    return(
        <>
        <section className="heading">
            <h1>Welcome {user && user.name}</h1>
            <p>Goals Dashboard</p>
        </section>
        <GoalForm />
        <section className="content">
            {goals.length > 0 ? (
                goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
            ))) : (
            <h3>You have not set any goals</h3>
            )}
        </section>
        </>
    )
}