type ObjType = Record<string, any>

export const filterNonNullValues = (obj: ObjType): ObjType => {
    const result: ObjType = {};
  
    for (const key in obj) {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        result[key] = value;
      }
    }
  
    return result;
  }