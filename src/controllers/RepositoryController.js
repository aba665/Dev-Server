import User from '../models/User.js';
import Repository from '../models/Repository.js';

class RepositoriesController {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const { q } = req.query;

            const user = await User.findById(user_id);

            if(!user) {
               return res.status(404).json({msg: "temos um problema"})
            }
            let query = {};

            if(q){
                query = { url: { $regex: q } }
            }
            const repositories = await Repository.find({
                userId: user_id,
                ...query
            });
            return res.json(repositories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    
    }
    async create(req, res) {
         try {
            const { user_id } = req.params;
            const { nome, url } = req.body;

            const user = await User.findById(user_id);

            if(!user) {
               return res.status(404).json()
            }
            const repository = await Repository.findOne({
                userId: user_id,
                url
            })
            if(repository){
                return res.status(422).json({msg: `Repository ${nome} already exists.`});
            }

            const newRepository = await Repository.create({
                nome,
                url,
                userId: user_id
            });
            return res.status(201).json(newRepository)
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
    async destroy(req, res) {
        const { user_id, id } = req.params;
        

        const user = await User.findById(user_id);

        if(!user) {
           return res.status(404).json()
        }
        const repository = await Repository.findOne({
            userId: user_id,
            id
        })
        if(!repository){
            return res.status(404).json();
        }
        await repository.deleteOne()

    }
    
   
}

export default 
new RepositoriesController;