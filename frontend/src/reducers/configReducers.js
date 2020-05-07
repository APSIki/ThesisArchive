export default function config(state = getDefaultState(), action) {
    switch (action.type) {
        default: 
            return state;
    }
}

const getDefaultState = () => {
    return {
        theses: [
            {
                "id": "123",
                "type": "Praca inżynierska",
                "description": "Sieci transportowe w technologii MPLS"
            },
            {
                "id": "456",
                "type": "Praca magisterska",
                "description": "Sieci transportowe w technologii EON"
            }
        ]
    }
}