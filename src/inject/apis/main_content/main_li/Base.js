'use strict'

export default class Base {
  get name(){
    return ''
  }

  get relationships(){
    return []
  }

  createDataWithRelationship(dataFromStorage){
    let merged = this.mergedData(dataFromStorage)
    let baseData = merged[this.name]

    if(baseData === undefined) return {}

    Object.keys(baseData).forEach(key => {
      let unitResource = baseData[key]
      unitResource.relationships = {}

      this.relationships.forEach(relationship => {
        let foreignKeyName = relationship.name + '_id'
        let foreignKey = unitResource[foreignKeyName]
        unitResource.relationships[relationship.name] = merged[relationship.name][foreignKey]
      })

      baseData[key] = unitResource
    })

    return baseData
  }

  // private
  mergedData(dataFromStorage){
    let result = dataFromStorage.reduce((base, data) => {
      Object.assign(base, data)
      return base
    },{})
    return result
  }
}
