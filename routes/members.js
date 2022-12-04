// Members Routes
const express = require('express')
const router = express.Router()
const { ensureAuth } = require("../middleware/auth");
const membersController = require("../controllers/members")

router.get('/', ensureAuth, membersController.getMembers)

router.post('/addMember', membersController.addMember)

// Important to keep at the bottom as the code cascades and will read anything after '/' as a paramter
// Same as the routers below but tidies it up
router
    .route("/:id")
    .get((req, res) => {
        res.send(`Finding member: ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Updating member: ${req.params.id}`)
    })
    .delete(membersController.deleteMember)



module.exports = router