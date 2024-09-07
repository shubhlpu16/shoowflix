class Clients {
  private static instance: Clients
  public clients: any = {}

  constructor() {
    if (!Clients.instance) {
      Clients.instance = this
    }
    return Clients.instance
  }

  getClients() {
    return this.clients
  }

  setClients(newClients: any) {
    this.clients = newClients
  }

  clearClients() {
    this.clients = {}
  }
}

const instance = new Clients()
Object.freeze(instance)

export default instance
