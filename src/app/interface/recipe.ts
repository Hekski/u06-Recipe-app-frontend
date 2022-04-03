export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  sourceName: string;
  //extendedIngredients: ExtendedIngredient[];
  summary: string;
  cuisines?: string[];
  dishTypes: string[];
  diets?: string[];
  instructions: string;
  //analyzedInstructions: AnalyzedInstruction[];
  ingredientString: string[];
}
