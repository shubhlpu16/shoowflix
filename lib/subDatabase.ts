class SubDatabase {
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

  setDatabase(newDatabase) {
    this.subDatabase = newDatabase
  }

  clearDatabase() {
    this.subDatabase = {}
  }
}

const instance = new SubDatabase()
Object.freeze(instance)

export default instance
