const db = require("../config/db");

//get all student list
const getStudents = async(req, res) =>{

    try{
        const data = await db.query(' SELECT * FROM students')
        if(!data){
            return res.status(404).send({
                success:false,
                message: 'no records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All students record',
            totalStudents: data[0].length,
            data: data[0],
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in get all student api",
            error
        })

    }
};



//get students by id
const getStudentById = async(req,res) =>{
    try{
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false, 
                message: 'invalid id'
            })
        }

        // const data = await db.query(`SELECT * FROM students where id=` +studentId)

        const data = await db.query(`SELECT * FROM students WHERE id= ?`,[studentId])
        if(!data){
            return res.status(404).send({
                success:false,
                message: "no record found"
            })
        }
        res.status(200).send({
            success:true,
            studentDetail: data[0],
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'error in get student by id',
            error
        })
    }
}


//create studnet record
const createStudent = async(req, res)=>{
    try{
        const {name,roll_no,fees} = req.body
        if(!name || !roll_no|| !fees){
            return res.status(500).send({
                success:false,
                message: "please provide all details"
            })
        }

        const data = await db.query(`INSERT INTO students (name, roll_no,fees) VALUES (?, ? , ?)`,[name,roll_no,fees])
        if(!data){
            return res.status(404).send({
                success:false,
                message: "error in insert",
            })
        }
        res.status(201).send({
            success:true,
            message: "new record added"
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in craeate student api",
            error
        })
    }

}


//update student record
const updateStudent = async(req, res) =>{
    try{
        const studentid = req.params.id
        if(!studentid){
            return res.status(404).send({
                success:false,
                message:"invalid student id",
            })
        }
        const {name,roll_no,fees} = req.body
        //here u can do validation id name or roll no is null or any invalid input etc.

        const data = await db.query(`UPDATE students SET name = ?, roll_no = ?, fees = ? WHERE id = ?`, [name,roll_no, fees, studentid])
        if(!data){
            return res.status(500).send({
                success:false,
                message: "error in update",
            })
        }
        res.status(200).send({
            success:true,
            message: 'students details updated',
        });

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update",
            error
        })

    }
}


//delete students
const deleteStudent = async(req,res)=>{

    try{
        const studentid = req.params.id
        if(!studentid){
            return res.status(404).send({
                success:false,
                message: "please provide valid student id"
            })
        }
        await db.query(`DELETE FROM students WHERE id = ?`,[studentid])
        res.status(200).send({
            success:true,
            message:"student record deleted"
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in deletion",
            error
        })
    }

}





module.exports = { getStudents , getStudentById , createStudent,updateStudent, deleteStudent};