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
      try {
          const { id } = req.params;
          const user = await User.findById(id);
          if(!user){
              return res.status(404).json();
          }

          return res.status(200).json(user);


      } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
      }
    }

    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(user){
                return res.status(422).json({message: `User ${email} already exist.`})
            }
 // Processo de criptografia de senha

            const encryptedPassword = await createPasswordHash(password);

            const newUser = await User.create({ email, password: encryptedPassword });
            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await User.findById(id);
            if(!user){
                return res.status(404).json();
            }
            const encryptedPassword = await createPasswordHash(password);
            await user.updateOne({ email, password: encryptedPassword });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    } 

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if(!user){
                return res.status(404).json();
            }
            
            await User.deleteOne(user);
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

export default 
new UserController;