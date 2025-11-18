import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import prisma from './prisma.js'
import authRoutes from './routes/auth.js'
import noteRoutes from './routes/notes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3010

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)

// Health check
app.get('/health', async (_req: Request, res: Response) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', message: 'Server is running', database: 'connected' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' })
  }
})

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  
  // Connect to database
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
