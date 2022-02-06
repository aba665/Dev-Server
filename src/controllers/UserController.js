import User from '../models/User';

import { createPasswordHash } from '../services/auth';

class UserController {
    async index(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async show(req, res) {
        return res.json({msg: "tudo bem?"});
    }

    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User. findOne({ email });
            if(user){
                return res.status(422).json({message: `User ${email} already exist.`})
            }
            // cri
            const encryptedPassword = await createPasswordHash(password);

            const newUser = await User.create({ email, password: encryptedPassword });
            return res.status(201).json(newUser);
        } catch (error) {
             console.log(error);
              return res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async update(req, res) {
        return res.json({msg: "tudo bem?"});
    }

    async destroy(req, res) {
        return res.json({msg: "tudo bem?"});
    }
}

export default 
new UserController;