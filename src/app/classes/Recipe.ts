export interface Recipe{
    _id?:string,
    name:String,
    discription:string,
    difficultLevel:Number,
    time:Number,
    ingrediets:String[],
    img:String,
    categories:string[],
    uploadedBy:string
}