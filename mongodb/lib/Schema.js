class Schema {
  constructor(data) {
    this.structure = data;
  }

  exclude(objB) {
    let objA = {};
    Object.keys(this.structure).forEach((key) => {
      if (objB?.[key]) objA[key] = objB[key];
    });
    return objA;
  }
  intersect(objB) {
    let objA = {};
    Object.keys(this.structure).forEach((key) => {
      if (objB?.[key]) objA[key] = objB[key];
      else {
        objA[key] = undefined;
      }
    });
    return objA;
  }
}

module.exports = { Schema };
