const express = require('express')
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentsController')


//router object
const router = express.Router()

//routes

//get all students list
router.get('/getall', getStudents);

//get students by id
router.get('/get/:id', getStudentById);

//create student || post
router.post('/create', createStudent);

//update student ||put
router.put('/update/:id',updateStudent);

//delect student || DELETE
router.delete('/delete/:id',deleteStudent)



module.exports = router;