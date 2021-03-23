export const required = (value:string| undefined)=>value? undefined:"Field is empty"
export const maxLengthCreator =(charNumber:number)=>(value:string| undefined )=>
    value && value?.length >charNumber ? "Field is empty": undefined