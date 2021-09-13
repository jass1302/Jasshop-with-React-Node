import expres from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = expres.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(
        data.users
    );
    res.send({ createdUsers });
}));

userRouter.post('/signin', expressAsyncHandler(
    async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (await bcrypt.compareSync(req.body.password, user.pass)) {
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
        res.status(401).send({ message: 'Usuario o contraseña invalidos' });
    }
));

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name, email: req.body.email,
        pass: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();
    res.send(
        {
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        }
    );

}));
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
}));
export default userRouter;