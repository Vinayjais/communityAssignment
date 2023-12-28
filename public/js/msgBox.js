



window.addEventListener('DOMContentLoaded', ()=>{
   const groupId = localStorage.removeItem('current_groupId');
   const userName= localStorage.getItem('UserName');
     const user = document.getElementById('userName');
     const text = document.createTextNode(`Profile : ${userName}`)
     user.appendChild(text);

    
   // fetchData();
    GroupinPanel();
});


  async function findAdminOfGroup(){
     const groupid = localStorage.getItem('current_groupId');
     const token = localStorage.getItem('token');

     await axios.post('/find_admin',{groupid},{headers:{"Authorization": token}})
     .then((result) =>{
      
         if(result.data.isAdmin === true){
            GroupAmin();
            localStorage.setItem('isAdmin', result.data.isAdmin );
         }
     })

     .catch((err)=>{
      console.log(err)
     })
      
     
  }

 function GroupAmin(){
   const addBtn = document.getElementById('addBtn').style.display = 'inline-block';
   const searchUser = document.getElementById('SearchUsers').style.display = 'inline-block';

    

 }



 async function CreateGroup(){
   
    const groupName = document.getElementById('GroupName').value;
    if(groupName){
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/groupcreate',{groupName}, {headers:{"Authorization": token}})
      .then((response)=>{
         if(response.data.success === true){
           
           alert(`${groupName} Group Created`);
          document.getElementById('GroupName').value = '';
         }
        
         
      })
      .catch((err) =>{
         console.log(err);
      })
  
    }
   



}



async function GroupinPanel (){

   function GroupList(group){
    
      const groupPanel = document.getElementById('groupPanel');
  
       const li = document.createElement('li');
         
       
      
       const groupName = document.createTextNode(group.name);
       li.appendChild(groupName);

       groupPanel.appendChild(li);
       li.addEventListener('click', function groupMessage  () {


           localStorage.setItem('current_groupId', group.id);
           const GName = document.getElementById('headGroupName');
             
            const hname = document.createTextNode(group.name);
            GName.firstChild.remove();
            GName.appendChild(hname);
            const Box = document.getElementById('Box');
            Box.firstChild.remove();
           
            const msgBoxDiv = document.createElement('div');
            msgBoxDiv.id = 'msgBox';
            Box.appendChild(msgBoxDiv);
            const groupId = localStorage.getItem('current_groupId');
            const room = `group${groupId}`;

            findAdminOfGroup();
         
       });

   }


   const token = localStorage.getItem('token');

   await axios.get('http://localhost:4000/get-groups',{headers:{"Authorization": token}})
   .then((response) => {
      var groupsName = response.data.groups;
    //  console.log(groupsName)
       const n = groupsName.length;
   
      for(let k=0; k< n ; k++){
         GroupList(groupsName[k]);
        
      }
   })
   .catch((err) =>{
      console.log(err)
   })

   
};

 function AddUserInGroup(){

   const searchUserDiv = document.getElementById('addUserPanel').style.display ='block';
   

};
function hideAddUserPanel(){
    
   const searchUserDiv = document.getElementById('addUserPanel').style.display ='none';
   
}


async function SearchUsers(){
   const inputEmail = document.getElementById('search').value;
   const token = localStorage.getItem('token');

   await axios.post('http://localhost:4000/searchUser',{inputEmail},{headers: {"Authorization": token}})
   .then((response) => {
              
      const ul = document.getElementById('groupMenbers');
      const li = document.createElement('li');
      const addbtn = document.createElement('button');
      const btnText =document.createTextNode('+');
      const space = document.createTextNode('  ');
      addbtn.appendChild(btnText)
      const text = document.createTextNode(response.data.user.name);
      li.appendChild(text);
      li.appendChild(space)
      li.appendChild(addbtn)
      ul.appendChild(li);
      document.getElementById('search').value = '';

      addbtn.addEventListener('click', addToGroup);

      async  function addToGroup(){
         const userId = response.data.user.id;
         const GroupId = localStorage.getItem('current_groupId');
         const token = localStorage.getItem('token');

          await axios.post('http://localhost:4000/add_to_group',{userId, GroupId },{headers:{"Authorization": token }})
          .then((result) => {
             if(result.data.success === true){
               alert(`${response.data.user.name} added in group`);
               ul.removeChild(li);
             }
          })
          .catch((err) =>{
               console.log(result);
          });
       }
   })
   .catch((err) =>{
      console.log(err);
   })

}

async function seeUserInGroup(){

         
    const isAdmin = localStorage.getItem('isAdmin');
    
     
     function participentsOfGroup(member){
     

      const GroupId = localStorage.getItem('current_groupId');
        console.log(GroupId)
         const ul = document.getElementById('membersofgroup');
         const li = document.createElement('li');
          li.id= "liuser";
         
         const text = document.createTextNode(member.name);
         li.appendChild(text);
             
                if(isAdmin){
                  console.log('in remove')
                  const remove = document.createTextNode('--');
                  const button = document.createElement('button');
                   button.appendChild(remove);
                     li.appendChild(button);
         
                button.addEventListener('click', async function(){
                  const userId = member.id;
                  const token = localStorage.getItem('token');
                  console.log(GroupId)

                  await axios.delete(`http://localhost:4000/removeUser/${userId}/${GroupId}`,{headers:{"Authorization": token }})
                  .then((result) => {
                     if(result.data.success === true){
                       alert(`${member.name} Removed from Group.`);
                       ul.removeChild(li);
                     }
                  })
                  .catch((err) =>{
                       console.log(result);
                  });
                 
             });
                }
           
         ul.appendChild(li);

     }


   const searchUserDiv = document.getElementById('addUserPanel').style.display ='block';

   const groupId = localStorage.getItem('current_groupId');
   const token = localStorage.getItem('token');
  
   await axios.post('http://localhost:4000/see_group_users',{groupId},{headers:{"Authorization": token}})
   .then((response)=>{
         console.log(response)
         const participents = response.data.users;

         for(let i=0; i< participents.length; i++){
            participentsOfGroup(participents[i]);
         }
   })
   .catch((err) =>{
      console.log(err)
   })

}
