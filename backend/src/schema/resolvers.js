const person = [
    {
        id: 1,
        name: 'Nishant',
        age: 25
    },
    {
        id: 2,
        name: 'Akash',
        age: 25
    }
]

export default {
    Query: {
        allPerson: () => person
    }
}
