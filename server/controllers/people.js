const {people} = require('../src/data')

const getPerson = (req,res) => {
    // console.log(req.query.id);
    res.json({success: true, data:people})
}

const getPersonWithId = (req,res) => {
    // console.log(req.query.id);
    res.json({msg: "aarha h ye"})
}

const createPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).send({ success: true, data: [...people, name] })
  }

const updatePerson = (req,res) => {
    const {id} = req.params
    const {name} = req.body
    console.log(id);
    console.log(name);
    if(people.find((peeps)=>{
        return peeps.id == id
    }))
    {
        res.send(`id no. ${id} is present`)
    }
    else
    {
        res.send(`id no. ${id} is not present`)
    }
}

const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
      (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
  }

module.exports = {
    getPerson,
    getPersonWithId,
    createPerson,
    updatePerson,
    deletePerson
}