import express, { response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()


app.use(express.json())
app.use(cors())

app.post('/users', async (request, response) => {

    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(request.body)

})

app.get('/users', async (request, response) => {

    const users = await prisma.user.findMany()
    response.status(200).json(users)
})


app.put('/users/:id', async (request, response) => {

    await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(request.body)

})

app.delete('/users/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })

    response.status(200).json({ message: "Usuário Deletado com Sucesso" })
})


/*

    1) Tipo de Rota / Método HTTP
    2) Endereço=


*/


app.listen(4000)

/* 
OBJETIVO 
 CRIAR NOSSA API DE USUARIOS

 - Criar um usuário
 - Listar todos os Usuarios
 - Editar um usuário
 - Deletar um usuário
*/


/* 
banco de dados
    usuario : lukatonny
   senha: 16092007
*/