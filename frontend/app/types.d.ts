export type TDrink = {
        PK_Drink: number,
        name: string,
        photo:string,
        likes: number,
        dislikes: number,
        category: TCategory
}

export type TCategory = "Cocktail" | "Ordinary Drink" |  "Punch / Party Drink" |   "Shake" |   "Other / Unknown"
| "Cocoa" | "Shot" | "Coffee / Tea" | "Homemade Liqueur" |  "Beer" | "Soft Drink"

export type TDrinkDetails = {
        idDrink: string;
        strDrink: string;
        strDrinkAlternate: string | null;
        strTags: string;
        strVideo: string | null;
        strCategory: string;
        strIBA: string;
        strAlcoholic: string;
        strGlass: string;
        strInstructions: string;
        strInstructionsES: string | null;
        strDrinkThumb: string;
        strIngredient1: string;
        strIngredient2: string;
        strIngredient3: string;
        strIngredient4: string;
        strIngredient5: string;
        strIngredient6: string | null;
        strIngredient7: string | null;
        strIngredient8: string | null;
        strIngredient9: string | null;
        strIngredient10: string | null;
        strIngredient11: string | null;
        strIngredient12: string | null;
        strIngredient13: string | null;
        strIngredient14: string | null;
        strIngredient15: string | null;
        strMeasure1: string;
        strMeasure2: string;
        strMeasure3: string;
        strMeasure4: string;
        strMeasure5: string | null;
        strMeasure6: string | null;
        strMeasure7: string | null;
        strMeasure8: string | null;
        strMeasure9: string | null;
        strMeasure10: string | null;
        strMeasure11: string | null;
        strMeasure12: string | null;
        strMeasure13: string | null;
        strMeasure14: string | null;
        strMeasure15: string | null;
        strImageSource: string;
        strImageAttribution: string;
        strCreativeCommonsConfirmed: string;
        dateModified: string;
    }

export interface IUser{
        username:string
        photo?:string
}
export type TRoom = {
   PK_Rooms: number,
   name:string,
   isPublic:boolean,
   createdAt:Date,
   secret_key:string,
   user:IUser,
   users:IUser[],
   drinks:TDrink[],
}
    