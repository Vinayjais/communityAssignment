const path = require('path');
const Group = require('../models/community');
const UsersInGroups = require('../models/usersInGroup');
const User = require('../models/user');
exports.getChatPage =( req,res,next) =>{
  
  res.sendFile(path.join(__dirname,'../','public','views','msgBox.html'));
};


exports.postGroupCreate = (req, res,next) =>{
      
   const GroupName = req.body.groupName;
   const userid = req.user.id;
  
     Group.create({
        name: GroupName,
        userId: userid
     })
     .then((response) =>{
       
        
       //  console.log(response.id);
       try {
         UsersInGroups.create({
            userId: userid,
            groupId: response.id
         })
         
         res.status(200).json({success : true});
       } catch (error) {
         console.log(error);
       }
        

       
     })
     .catch((err)=>{
      console.log(err);
     })
      

};

exports.getGroups =( req,res, next) =>{
  const userid = req.user.id;
    UsersInGroups.findAll({where: {userId: userid}})
    .then((groups) => {
     // console.log(groups.length)
       let groupIds = [];
       for(let i=0; i< groups.length ; i++){
            
          groupIds[i] = groups[i].groupId;

       }
      // console.log(groupIds);

       Group.findAll({where: {id : groupIds},
         attributes:['id','name']
         
      })
       .then((groupsName) =>{
  //console.log(groupsName[0])
          res.status(200).json({success: true, groups:groupsName});
       })
       .catch((err) => {
         console.log(err)
       })
    })
    .catch((err) =>{
      console.log(err)
    })

};

exports.postInUserGroup = (req,res,next) =>{
     
     const userId = req.body.userId;
      const groupId = req.body.GroupId;

      UsersInGroups.create({
        userId: userId,
        groupId: groupId

      })
      .then(() =>{
        res.status(200).json({success: true, message : 'user added in group'});
      })
      .catch((err)=>{
        console.log(err);
      })
};

exports.removerUserFromGroup =(req,res,next) =>{
    
     const userId = req.params.id;
     const GroupId = req.params.groupId;
    
        UsersInGroups.destroy({where: {userId:userId, groupId: GroupId}})
        .then((result) =>{
           res.status(200).json({success:true, msg: 'User Removed from group'});

        })
        .catch((err) => console(err));
      
   
}

exports.postSeeUsersInGroup = (req,res,next) =>{
      
        const groupId = req.body.groupId;

        UsersInGroups.findAll({where:{groupId: groupId},

            attributes:['userId']
        })
        .then((users)=>{
              
            
              const userIds = [];

              for(let i=0; i< users.length ; i++){
                userIds[i] = users[i].userId
              }
          
            User.findAll({where:{id: userIds},
               attributes:['id','name']
            })
            .then((result) =>{
                   res.status(200).json({success: true, users: result});
            })
            .catch((err)=>{
              console.log(err)
            })   
          

        })
        .catch((err) =>{
          console.log(err)
        })
};


exports.postFindAdmin =( req,res,next) =>{
  const groupId = req.body.groupid;
  const user = req.user.id;
  
   Group.findOne({where:{ id:groupId}})
   .then((result)=>{
      if(result.userId === user){
        res.status(200).json({isAdmin : true , admin: result.userId})

      }
      else{
       res.status(200).json({isAdmin : false})

      }

   })
   .catch((err) =>{
    res.status(200).json({isAdmin : false})

    console.log(err)
   })

}