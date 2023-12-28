const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const signUpRouter = require('./routers/singUp');
const loginRouter = require('./routers/login');
const vchatRouter = require('./routers/vchat');
const sequelize = require('./util/database');
const User = require('./models/user')
const Group = require('./models/community');
const userGroup = require('./models/usersInGroup');
const port = 4000;
 const app = express();

const http = require('http').createServer(app);


app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public','css')));
app.use(express.static(path.join(__dirname,'public','js')));
app.use(express.static(path.join(__dirname,'public','views')));
app.use(express.static(path.join(__dirname,'public','src')));


app.use(signUpRouter);
app.use(loginRouter);
app.use(vchatRouter);


User.hasMany(Group);
Group.belongsTo(User);

User.hasMany(userGroup);
userGroup.belongsTo(User);
Group.hasMany(userGroup);
userGroup.belongsTo(Group);

app.get('*',(req,res) =>{
         res.send('Page Not Found ')
})
sequelize
//.sync({force:true})
.sync()
.then(()=>{
    http.listen(port,()=>{
        console.log(`Server running on port ${port} `);
    });
})
.catch((err) => {
     throw new Error(err)
})
