const express = require('express');
const vchatController = require('../controllers/vchat');
const authenticat = require('../middleware/auth');


const router = express.Router();


router.get('/vchat', vchatController.getChatPage);
router.post('/groupcreate',authenticat.authentication, vchatController.postGroupCreate);
router.get('/get-groups',authenticat.authentication, vchatController.getGroups)
router.post('/add_to_group',authenticat.authentication,vchatController.postInUserGroup);
router.post('/see_group_users',authenticat.authentication,vchatController.postSeeUsersInGroup);
router.post('/find_admin', authenticat.authentication, vchatController.postFindAdmin);
router.delete('/removeUser/:id/:groupId',authenticat.authentication, vchatController.removerUserFromGroup);



module.exports = router;