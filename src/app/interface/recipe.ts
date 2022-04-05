export interface Recipe {
  id: number;
  title: string;
  image: string;
  type: string;
  readyInMinutes: number;
  servings: number;
  vegetarian?: boolean;
  extendedIngredients: ExtendedIngredient[];
  analyzedInstructions: AnalyzedInstruction[];
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  sourceName: string;
  summary: string;
  cuisines?: string[];
  dishTypes: string[];
  diets?: string[];
  instructions: string;
  ingredientString: string[];
  
}

export interface ExtendedIngredient {
  id: number;
  aisle?: string;
  image: string;
  name: string; 
  nameClean: string; 
  original: string; 
  amount: number;
  unit: string; 
}

export interface AnalyzedInstruction {
  id: number;
  steps: string[];
  number: Number[];
}

export interface Number {
  number: number;
}