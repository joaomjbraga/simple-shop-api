import { Router } from "express"
import { ClientsControllers } from "@/controllers/clients-controllers.js"

const UserRout = Router()
const UserControl = new ClientsControllers()

UserRout.get('/', UserControl.Index)
UserRout.get('/:id', UserControl.IndexUsers)

UserRout.post('/', UserControl.Create)
UserRout.put('/', UserControl.Upgrade)
UserRout.delete('/', UserControl.Delete)

export { UserRout }
