
class HelloController {
    async index(req, res) {
        return res.json({msg: "tudo bem?"});
    }
}

export default 
new HelloController;