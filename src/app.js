const express = require('express');
const app = express();





const todoArr = [];

app.post('/todo/'), (req,res) => {
    
    todoArr = {
        title:req.body.title,
        description: req.body.description,
        isActive: req.body.isActive
    }

    todoArr.save().then((result) => {
        res.status(200).send({
            result: todoArr,
            message:"Successfully saved"
        })
        }).catch((e) => {
            res.status(500).send({
                "message":"Interserver Error",
                "error":e
            })
    })

app.get('/todo/getTodo'), (req,res) =>{
    const todoList = new todoArr.find().then((todoResult) => {
        res.status(200).send({
            result: todoList,
            message: "Todo List"
        })
    }).catch((err) => {
        res.status(500).send({
            message:"Internet server error"
        })
    })

}

app.post('/todo/updateTodo'),(req,res) => {
    const updateTodo = new todoArr.findOne(req.body.id);
    const updateData = {
        $set : {
            title:req.body.title,
            description: req.body.description,
            isActive: req.body.isActive
        }
    }
    
    const result = updateTodo.updateOne({id},{updateData});
    if(result.length==0) {
        res.status(200).send({
            message:"Already Updated"
        })

    }else {
        res.status(200).send({
            data: result
        })
    }
}

app.delete('/todo/deleteTodo'),(req,res) => {
    const deleteTodoById = new todoArr.find(req.body.id).then((result)=> {
        res.status(200).send({
            "message":"successfully Deleted"
        })

    }).catch((e) => {
        res.status(500).send({
            "message":"Error",
            "error" :e
        })
    })
   
}


app.listen(3000, () => {
    console.log("Server is running port 3000");
});