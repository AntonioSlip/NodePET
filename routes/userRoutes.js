const express = require("express");
const UserRouters = express.Router();
const User = require("../model/User");

UserRouters.post("/user", async (request, response) => {
    const {name, email} = request.body;
    const user = {
        name: name,
        email: email
    }

    try {
        await User.create(user);
        response.status(201).json({msg: "Usuário criado com sucesso!!!"});
    } catch (error) {
        response.status(500).json({error: error});
    }
    
});

UserRouters.get("/user", async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({error: error});
    } 
});

UserRouters.get("/", (request, response) => {
    response.json({msg: "Usando o nodemon"});
});

UserRouters.get("/user/:id" , async (request, response) => {
    const id = request.params.id;

    try {
        const user = await User.findOne({_id: id});
        if(!user) {
            response.status(422).json({msg: "Usuário não encontrado!!!"});
            return
        }
        else {
            response.status(200).json(user);
        }

    } catch (error) {
        response.status(500).json({error: error});
    }
});

UserRouters.patch("/user/:id", async (request, response) => {
    const id = request.params.id;
    const {name, email} = request.body;

    const user = {
        name,
        email
    }

    try {
        const userUpdate = await User.updateOne({_id: id}, user);
        if(userUpdate.matchedCount === 0) {
            response.status(500).json({msg: "Usuário não encontrado!!!"});
        }
        else {
            response.status(200).json(user);
        }
    } catch (error) {
        response.status(500).json({error: error});
    }
    
});

UserRouters.delete("/user/:id", async (request, response) => {
    const id = request.params.id;
    const user = await User.findOne({_id: id})

    if(!user) {
        response.status(422).json({msg: "Usuário não encontrado!!!"})
    }

    try {
        await User.deleteOne({_id: id});
        response.status(200).json({msg: "Usuário deletado com sucesso!!!"});
    } catch (error) {
        response.status(500).json({error: error});
    }

});

module.exports = UserRouters;