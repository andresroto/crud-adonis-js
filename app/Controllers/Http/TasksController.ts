import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ response }: HttpContextContract) {

    const tasks: object = await Task.all()

    return response.ok(tasks)
  }

  public async store({ request, response }: HttpContextContract) {
    
    const title: string = request.input('title')
    const description: string = request.input('description')
    const status: boolean = request.input('status')

    const task: object = await Task.create({ title, description, status })

    return response.json(task)
  }

  public async show({ params, response }: HttpContextContract) {
    const task: any = await Task.find(params.id)

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    return response.json(task)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const task: any = await Task.findOrFail(params.id)
    task.title = request.input('title')
    task.description = request.input('description')
    task.status = request.input('status')
    await task.save()

    return response.json(task)
  }

  public async destroy({ params, response }: HttpContextContract) {

    const task: any = await Task.find(params.id)

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }
    
    await task.delete()

    return response.ok({ message: 'Task deleted successfully.' })
  }
}
