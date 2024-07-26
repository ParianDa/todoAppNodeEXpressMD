const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Todo = require('./models/todo.js')

const app = express()

//connect to database

mongoose.connect('mongodb://localhost:27017/todo-app')
.then(() => console.log('connected to mongoose'))
.catch(err => console.error('Could not connect to mongo db',err))



//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.set('view engine','ejs')

//Home - list todos
app.get('/', async(req,res) => {
    const todos = await Todo.find({})
    res.render('index', {todos})
});

//new todo form
app.get('/todos/new', (req,res) => {
    res.render('new')
})
//create a todo
app.post('/todos', async (req,res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title
        });
        await newTodo.save();
        res.redirect('/')
    } catch(err) {
        console.error("Error Creating Todo",err);
        res.status(500).send('Error Creating todo');
    }
})

app.get('/todos/:id/edit', async (req,res) => {
    const todo = await Todo.findById(req.params.id)
    res.render('edit',{todo})
})

app.put('/todos/:id', async (req,res) => {
    await Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        completed: req.body.completed === 'on'
    });
    res.redirect('/')
})

//edit a todo

//delete todo
app.delete('/todos/:id', async (req,res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
})


app.listen(3000, () => {
    console.log("Todo App is running on http://localhost:3000")
})