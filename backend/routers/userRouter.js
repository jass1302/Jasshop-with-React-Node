import expres from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = expres.Router();

userRouter.get('/seed', expressAsyncHandler (async (req, res) =>{
   // await User.remove({});
    const createdUsers = await User.insertMany(
        data.users
    );
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(
    async (req, res) =>{
        console.log(req.body);
        const user = await User.findOne({email: req.body.email});
        if (user) {
            console.log("Usuario encontrado");
            if (bcrypt.compareSync(req.body.pass, user.pass)) {
                console.log("Pass correcta");
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return;
            }
        }
        res.send(401).send({message: "Usuario o contraseña invalidos"});
    }
));
export default userRouter;