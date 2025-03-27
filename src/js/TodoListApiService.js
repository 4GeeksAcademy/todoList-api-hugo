const Url = "https://playground.4geeks.com/todo"

export const ApiTodoList = {
    createUser: async (user) => {
        try {
            const request = await fetch(`${Url}/users/${user}`, {
                method: "POST"
            })
            const response = await request.json();
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    checkTaskUser: async (user) => {
        try {
            const request = await fetch(`${Url}/users/${user}`, {
                method: "GET"
            })
            const response = await request.json();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    },
    creattask: async (user, div) => {
        let task = {
            "is_done": false, "label": `${div}`
        };
        try {
            const request = await fetch(`${Url}/todos/${user}`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            const response = await request.json();
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    deleteTask: async (id) => {
        try {
            const request = await fetch(`${Url}/todos/${id}`, {
                method: "DELETE",

            })
            const response = await request.json();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    updateTask: async (id, label) => {
        let task = {
            "is_done": true, "label": `${label}`
        };
        try {
            const request = await fetch(`${Url}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            const response = await request.json();
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

