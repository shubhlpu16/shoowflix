class SubDatabase {
  static instance: any
  subDatabase: any

  constructor() {
    if (!SubDatabase.instance) {
      this.subDatabase = {} as any
      SubDatabase.instance = this
    }

    return SubDatabase.instance
  }

  getDatabase() {
    return this.subDatabase
  }

  setDatabase(newDatabase: any) {
    this.subDatabase = newDatabase
  }

  clearDatabase() {
    this.subDatabase = {}
  }
}

const instance = new SubDatabase()
Object.freeze(instance)

export default instance
