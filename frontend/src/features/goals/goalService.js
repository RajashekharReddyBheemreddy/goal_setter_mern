import axios from 'axios'

const API_URL = '/api/goals/'

// create new goal
const createGoal = async(goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

// Get goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}
// delete goals
const deleteGoals = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL+id, config)

    return response.data
}
// update goals
const updateGoal = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL+userData.id, userData, config)
  
    return response.data
}

const goalService = {createGoal, getGoals, deleteGoals, updateGoal}

export default goalService