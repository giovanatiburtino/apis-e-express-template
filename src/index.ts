import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
})

app.get('/courses/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = courses.filter(
    (course) => course.name.toLowerCase().includes(q.toLowerCase()))

    res.status(200).send(result)
})

app.post('/courses', (req: Request, res: Response) => {
    // const id = req.body.id as string
    // const name = req.body.name as string
    // const lessons = req.body.lessons as number
    // const stack = req.body.stack as COURSE_STACK

    const {id, name, lessons, stack} = req.body as TCourse

    const newCourse = {
        id: id,
        name: name,
        lessons: lessons,
        stack: stack
    }

    courses.push(newCourse)

    res.status(201).send("Curso registrado com sucesso")
})

app.get("/students", (req: Request, res: Response) => {
    res.status(200).send(students)
})

app.get("/students/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const filteredStudents = students.filter(
        (student) => student.name === q
    )

    res.status(200).send(filteredStudents)
})

app.post('/students', (req: Request, res: Response) => {
    const { id, name, age } = req.body as TStudent

    const newStudent = {
        id,
        name,
        age
    }

    students.push(newStudent)

    res.status(201).send("Cadastro do estudante criado com sucesso")
})