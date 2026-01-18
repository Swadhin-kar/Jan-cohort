import express from 'express'
import { Router } from 'express'

const router = Router()

router.get('/login', (req, res) => {
    res.send("login page")
})

router.get('/register', (req, res) => {
    res.send("register page")
})



export default router 