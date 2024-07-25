import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Drink {
  @PrimaryColumn()
  PK_Drink: string;

  @Column()
  strDrink: string;

  @Column({ nullable: true })
  strDrinkAlternate: string;

  @Column({ nullable: true })
  strTags: string;

  @Column({ nullable: true })
  strVideo: string;

  @Column()
  strCategory: string;

  @Column({ nullable: true })
  strIBA: string;

  @Column()
  strAlcoholic: string;

  @Column()
  strGlass: string;

  @Column()
  strInstructions: string;

  @Column({ nullable: true })
  strInstructionsES: string;

  @Column({ nullable: true })
  strInstructionsDE: string;

  @Column({ nullable: true })
  strInstructionsFR: string;

  @Column({ nullable: true })
  strInstructionsIT: string;

  @Column({ nullable: true })
  strInstructionsZH_HANS: string;

  @Column({ nullable: true })
  strInstructionsZH_HANT: string;

  @Column()
  strDrinkThumb: string;

  @Column({ nullable: true })
  strIngredient1: string;

  @Column({ nullable: true })
  strIngredient2: string;

  @Column({ nullable: true })
  strIngredient3: string;

  @Column({ nullable: true })
  strIngredient4: string;

  @Column({ nullable: true })
  strIngredient5: string;

  @Column({ nullable: true })
  strIngredient6: string;

  @Column({ nullable: true })
  strIngredient7: string;

  @Column({ nullable: true })
  strIngredient8: string;

  @Column({ nullable: true })
  strIngredient9: string;

  @Column({ nullable: true })
  strIngredient10: string;

  @Column({ nullable: true })
  strIngredient11: string;

  @Column({ nullable: true })
  strIngredient12: string;

  @Column({ nullable: true })
  strIngredient13: string;

  @Column({ nullable: true })
  strIngredient14: string;

  @Column({ nullable: true })
  strIngredient15: string;

  @Column({ nullable: true })
  strMeasure1: string;

  @Column({ nullable: true })
  strMeasure2: string;

  @Column({ nullable: true })
  strMeasure3: string;

  @Column({ nullable: true })
  strMeasure4: string;

  @Column({ nullable: true })
  strMeasure5: string;

  @Column({ nullable: true })
  strMeasure6: string;

  @Column({ nullable: true })
  strMeasure7: string;

  @Column({ nullable: true })
  strMeasure8: string;

  @Column({ nullable: true })
  strMeasure9: string;

  @Column({ nullable: true })
  strMeasure10: string;

  @Column({ nullable: true })
  strMeasure11: string;

  @Column({ nullable: true })
  strMeasure12: string;

  @Column({ nullable: true })
  strMeasure13: string;

  @Column({ nullable: true })
  strMeasure14: string;

  @Column({ nullable: true })
  strMeasure15: string;

  @Column({ nullable: true })
  strImageSource: string;

  @Column({ nullable: true })
  strImageAttribution: string;

  @Column({ nullable: true })
  strCreativeCommonsConfirmed: string;

  @Column({ type: 'timestamp', nullable: true })
  dateModified: Date;
}
