import User from '../models/User';
import Repository from '../models/Repository';

class RepositoriesController {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if(!user) {
               return res.status(404).json({msg: "temos um problema"})
            }
            const repositories = await Repository.find({
                UserId: user_id
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
                nome
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