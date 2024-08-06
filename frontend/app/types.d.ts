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